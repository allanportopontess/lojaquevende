/**
 * Loja que Vende — recebimento de leads da página de captura
 *
 * O que faz a cada cadastro:
 *   1. Grava o lead na planilha (aba "Leads"), com UTMs e anúncio de origem.
 *   2. Envia por e-mail o link do PDF "Checklist dos 5 Erros de Layout".
 *   3. (Opcional) Envia o evento Lead pela API de Conversões da Meta,
 *      com o mesmo event_id do Pixel, para a Meta deduplicar.
 *
 * Instalação (5 min):
 *   1. Crie uma Planilha Google → Extensões → Apps Script → cole este arquivo.
 *   2. Configurações do projeto → Propriedades do script → adicione:
 *        PDF_URL          link público do PDF (Drive "qualquer pessoa com o link" ou Hotmart/área de membros)
 *        REMETENTE_NOME   ex.: Allan Porto Arquitetura
 *        META_PIXEL_ID    (opcional) ID do Pixel
 *        META_CAPI_TOKEN  (opcional) token da API de Conversões (Gerenciador de Eventos → Configurações)
 *   3. Implantar → Nova implantação → Tipo "App da Web"
 *        Executar como: Eu | Quem pode acessar: Qualquer pessoa
 *   4. Copie a URL /exec e cole em FORM_ENDPOINT no landing/index.html.
 */

const SHEET_NAME = 'Leads';
const HEADERS = [
  'data_hora', 'nome', 'email', 'whatsapp', 'consentimento',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'pagina', 'event_id', 'email_enviado', 'capi_status'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    if (!p.email || !p.nome) return json({ ok: false, error: 'dados incompletos' });

    const sheet = getSheet();
    const emailOk = sendChecklist(p);
    const capi = sendCapiLead(p);

    sheet.appendRow(HEADERS.map(function (h) {
      switch (h) {
        case 'data_hora': return new Date();
        case 'email_enviado': return emailOk ? 'sim' : 'erro';
        case 'capi_status': return capi;
        default: return p[h] || '';
      }
    }));
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function sendChecklist(p) {
  const props = PropertiesService.getScriptProperties();
  const pdfUrl = props.getProperty('PDF_URL');
  if (!pdfUrl) return false;
  const firstName = String(p.nome).trim().split(/\s+/)[0];
  const html =
    '<div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.5;color:#2b211b;max-width:560px">' +
    '<p>Oi, ' + escapeHtml(firstName) + '!</p>' +
    '<p>Aqui está o seu <strong>Checklist dos 5 Erros de Layout que Fazem Sua Loja Perder Venda</strong>:</p>' +
    '<p><a href="' + pdfUrl + '" style="display:inline-block;background:#d9572b;color:#fff;padding:14px 22px;border-radius:10px;text-decoration:none;font-weight:bold">Baixar o checklist (PDF)</a></p>' +
    '<p>Leva 3 minutos. Responda cada pergunta com "sim" ou "não" olhando pra sua loja; cada "não" é venda escapando todo dia.</p>' +
    '<p>Um abraço,<br>Allan Porto<br><span style="color:#6f625a">Arquiteto · CAU-PE A166156-6</span></p>' +
    '</div>';
  try {
    MailApp.sendEmail({
      to: p.email,
      subject: firstName + ', seu checklist dos 5 erros de layout chegou',
      htmlBody: html,
      name: props.getProperty('REMETENTE_NOME') || 'Allan Porto Arquitetura'
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

function sendCapiLead(p) {
  const props = PropertiesService.getScriptProperties();
  const pixelId = props.getProperty('META_PIXEL_ID');
  const token = props.getProperty('META_CAPI_TOKEN');
  if (!pixelId || !token) return 'desativado';

  const userData = {
    em: [sha256(String(p.email).trim().toLowerCase())],
    ph: [sha256(String(p.whatsapp || '').replace(/\D/g, ''))],
    fn: [sha256(String(p.nome).trim().split(/\s+/)[0].toLowerCase())],
    country: [sha256('br')],
    client_user_agent: p.user_agent || undefined,
    fbp: p.fbp || undefined,
    fbc: p.fbc || undefined
  };
  const payload = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: p.event_id,
      action_source: 'website',
      event_source_url: p.pagina,
      user_data: userData,
      custom_data: { content_name: 'Checklist 5 Erros de Layout', currency: 'BRL', value: 0 }
    }]
  };
  try {
    const res = UrlFetchApp.fetch(
      'https://graph.facebook.com/v21.0/' + pixelId + '/events?access_token=' + encodeURIComponent(token),
      { method: 'post', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true }
    );
    return String(res.getResponseCode());
  } catch (err) {
    console.error(err);
    return 'erro';
  }
}

function sha256(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8);
  return bytes.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

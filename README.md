# Loja que Vende: funil de captura + Meta Ads

Infoproduto da Allan Porto Arquitetura (CAU-PE A166156-6) para lojistas de varejo físico.

```
Meta Ads (5 criativos A/B) → landing/index.html (isca: Checklist dos 5 Erros de Layout)
   → redirect para a VSL (com UTMs + primeiro nome) → checkout Hotmart → order bump / upsell
```

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `landing/index.html` | Página de captura (HTML estático, sem build). Formulário nome + e-mail + WhatsApp, consentimento LGPD, Pixel da Meta, captura de UTMs, redirect para a VSL. |
| `landing/privacidade.html` | Política de privacidade (preencher os campos `[ ]`). |
| `integracoes/apps-script-leads.gs` | Backend grátis em Google Apps Script: grava o lead na planilha, envia o PDF por e-mail e (opcional) manda o `Lead` pela API de Conversões. |
| `meta-ads/campanha.md` | Estrutura completa da campanha: público, posicionamentos, orçamento, os 5 anúncios, métricas e regras de decisão. |
| `meta-ads/anuncios.csv` | Os 5 anúncios em tabela (texto, título, descrição, CTA, UTMs) para copiar e colar. |

## Colocar no ar

1. **Backend dos leads:** siga o cabeçalho de `integracoes/apps-script-leads.gs` e copie a URL `/exec`.
2. **Configurar a landing:** no topo de `landing/index.html`, bloco `LQV_CONFIG`:
   - `META_PIXEL_ID`: ID do Pixel
   - `FORM_ENDPOINT`: URL do Apps Script (ou webhook de ActiveCampaign / RD / Make / Zapier que aceite POST form-urlencoded)
   - `VSL_URL`: página da VSL
3. **Publicar a pasta `landing/`** em qualquer hospedagem estática: Netlify, Vercel, Cloudflare Pages ou GitHub Pages. Use domínio próprio (ex.: `lojaquevende.com.br`) e verifique-o no Gerenciador de Negócios.
4. **Teste:** faça um cadastro real e confira a linha na planilha, o e-mail com o PDF, o evento `Lead` em *Testar eventos* e a chegada na VSL com `?utm_...&nome=`.
5. **Campanha:** siga `meta-ads/campanha.md`.

Sem `FORM_ENDPOINT` a página funciona em modo teste: valida, mostra o sucesso e redireciona, mas só loga o lead no console.

## O que a landing envia ao endpoint

`nome, email, whatsapp (55DDDNÚMERO), consentimento, pagina, event_id, fbp, fbc, user_agent, utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid`

O `event_id` é o mesmo do `fbq('track','Lead')` no navegador, então a Meta deduplica o evento do Pixel e o da API de Conversões.

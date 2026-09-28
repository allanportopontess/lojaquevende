# Allan Porto Arquitetura: site + funil Loja que Vende

Site estático (HTML/CSS/JS, sem build), com o visual do Kit Usucapião Pro, publicado de graça no GitHub Pages:
**https://allanportopontess.github.io/lojaquevende/**

```
Meta Ads (5 criativos A/B) → /loja-que-vende/ (captura: Checklist dos 5 Erros de Layout)
   → /loja-que-vende/obrigado/ (download do PDF + vídeo + checkout Hotmart)
```

## Páginas

| Rota | Arquivo | O que é |
|---|---|---|
| `/` | `site/index.html` | Site institucional: hero, formação, método, produtos, projeto Empório Fit, sobre, contato |
| `/links/` | `site/links/index.html` | Página para a bio do Instagram |
| `/loja-que-vende/` | `site/loja-que-vende/index.html` | Captura do checklist (leads vão para o banco) |
| `/loja-que-vende/obrigado/` | `site/loja-que-vende/obrigado/index.html` | Download do PDF, vídeo (VSL) e botão de compra |
| `/privacidade/` | `site/privacidade/index.html` | Política de privacidade (LGPD) |

## Onde editar

- **`site/assets/config.js`**: WhatsApp, Instagram, e-mail, Pixel, link do vídeo, link do checkout Hotmart e a **lista de produtos** (para lançar um produto novo, troque `status` para `"ativo"` e preencha título, texto e link).
- **`site/img/`**: fotos. Nomes e tamanhos em `site/img/LEIA-ME.txt`. Sem a foto, o site mostra um espaço reservado.
- **`isca/checklist.html`**: fonte do PDF do checklist (`site/assets/checklist-5-erros-de-layout.pdf`).

Todo push no branch principal que altere `site/` republica o site automaticamente (`.github/workflows/pages.yml`).

## Leads

Gravados na tabela `leads` do Lovable Cloud (projeto "Allan Porto Arquitetura" no Lovable → Cloud → Database). O site só consegue **inserir**; ninguém de fora consegue ler. Campos: nome, email, whatsapp (55DDDNÚMERO), consentimento, produto, utm_source/medium/campaign/content/term, fbclid, event_id, pagina, data.

## Outros arquivos

| Pasta | Conteúdo |
|---|---|
| `meta-ads/campanha.md` | Estrutura da campanha, público, orçamento, anúncios, métricas e status na conta |
| `meta-ads/anuncios.csv` | Os 5 anúncios em tabela |
| `criativos/` | Roteiros dos 5 vídeos (PDF para imprimir) |
| `integracoes/apps-script-leads.gs` | Alternativa de backend via Google Planilhas (não usada no momento) |

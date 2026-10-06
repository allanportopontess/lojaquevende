/* =====================================================================
   CONFIGURAÇÃO DO SITE — edite só este arquivo
   Campos vazios ("") escondem o botão/recurso correspondente.
   ===================================================================== */
window.SITE = {
  // Contato
  WHATSAPP: "5581991047095", // só números com DDI, ex.: "5581999999999"
  INSTAGRAM: "https://www.instagram.com/allanporto_arquitetura/", // URL completa, ex.: "https://www.instagram.com/allanporto.arq/"
  EMAIL: "allanportopontess@gmail.com", // ex.: "contato@allanporto.com.br"

  // Meta Pixel
  META_PIXEL_ID: "1414869993251554",

  // Banco de leads (Lovable Cloud / Supabase). A chave "publishable" é pública por natureza:
  // ela só permite INSERIR leads, nunca ler.
  SUPABASE_URL: "https://otclelicrhuvnlfncjtj.supabase.co",
  SUPABASE_KEY: "sb_publishable_OgQ0vW3owSYbbgjmvS5XEQ_4wiwjhvg",

  // Página pós-cadastro (Loja que Vende)
  VSL_VIDEO_URL: "",       // YouTube, Vimeo ou Panda (link do vídeo). Vazio = "vídeo em breve"
  CHECKOUT_URL: "https://pay.hotmart.com/A107800232K", // checkout Hotmart do curso Loja que Vende

  // Página de links da bio (/links/): link de venda do Kit Usucapião PRO (Hotmart). Vazio = card escondido
  KIT_USUCAPIAO_URL: "https://pay.hotmart.com/C106999952U",

  // Preço exibido na página de vendas (deixe "" para esconder e mostrar só o botão)
  PRECO_DE: "397",         // preço âncora (aparece riscado)
  PRECO_POR: "97",         // preço promocional de lançamento
  PARCELAS: "",            // ex.: "12x de R$ 9,74" (vazio = esconde)

  // Fim da oferta de lançamento (cronômetro). Formato: "AAAA-MM-DDTHH:MM:SS-03:00"
  // Quando a data passa, o cronômetro some sozinho. Vazio = sem cronômetro.
  OFERTA_ATE: "2026-10-20T23:59:59-03:00",

  // Produtos exibidos na home e na página de links (ordem = ordem na tela)
  PRODUCTS: [
    {
      slug: "loja-que-vende",
      status: "ativo",                         // "ativo" | "em-breve"
      badge: "Curso online",
      title: "Loja que Vende",
      text: "Projeto estratégico de layout para mais vendas: 4 aulas + 4 PDFs de apoio + estudo de caso real.",
      cta: "Conhecer o curso",
      href: "loja-que-vende/curso/",           // relativo à raiz do site
      art: "capa"
    },
    { slug: "produto-2", status: "em-breve", badge: "Em breve", title: "Novo produto", text: "Em preparação. Siga no Instagram para saber primeiro." },
    { slug: "produto-3", status: "em-breve", badge: "Em breve", title: "Novo produto", text: "Em preparação. Siga no Instagram para saber primeiro." }
  ]
};

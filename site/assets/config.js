/* =====================================================================
   CONFIGURAÇÃO DO SITE — edite só este arquivo
   Campos vazios ("") escondem o botão/recurso correspondente.
   ===================================================================== */
window.SITE = {
  // Contato
  WHATSAPP: "",            // só números com DDI, ex.: "5581999999999"
  INSTAGRAM: "",           // URL completa, ex.: "https://www.instagram.com/allanporto.arq/"
  EMAIL: "",               // ex.: "contato@allanporto.com.br"

  // Meta Pixel
  META_PIXEL_ID: "1414869993251554",

  // Banco de leads (Lovable Cloud / Supabase). A chave "publishable" é pública por natureza:
  // ela só permite INSERIR leads, nunca ler.
  SUPABASE_URL: "https://otclelicrhuvnlfncjtj.supabase.co",
  SUPABASE_KEY: "sb_publishable_OgQ0vW3owSYbbgjmvS5XEQ_4wiwjhvg",

  // Página pós-cadastro (Loja que Vende)
  VSL_VIDEO_URL: "",       // YouTube, Vimeo ou Panda (link do vídeo). Vazio = "vídeo em breve"
  CHECKOUT_URL: "",        // link do checkout Hotmart. Vazio = botão de compra escondido

  // Produtos exibidos na home e na página de links (ordem = ordem na tela)
  PRODUCTS: [
    {
      slug: "loja-que-vende",
      status: "ativo",                         // "ativo" | "em-breve"
      badge: "Checklist grátis",
      title: "Loja que Vende",
      text: "Os 5 erros de layout que fazem sua loja perder venda, e como corrigir sem reforma.",
      cta: "Baixar agora",
      href: "loja-que-vende/",                 // relativo à raiz do site
      art: "planta"
    },
    { slug: "produto-2", status: "em-breve", badge: "Em breve", title: "Novo produto", text: "Em preparação. Siga no Instagram para saber primeiro." },
    { slug: "produto-3", status: "em-breve", badge: "Em breve", title: "Novo produto", text: "Em preparação. Siga no Instagram para saber primeiro." }
  ]
};

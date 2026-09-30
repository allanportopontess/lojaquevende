# Campanha Meta Ads: Loja que Vende (fase de teste)

Objetivo desta fase: descobrir qual dos 5 criativos gera **lead mais barato e mais qualificado** para a isca "Checklist dos 5 Erros de Layout". O vencedor vai para a escala; os outros são pausados.

```
Anúncio (Reels/Stories/Feed) → Página de captura (https://allanportopontess.github.io/lojaquevende/loja-que-vende/) → VSL → Checkout Hotmart → order bump / upsell
```

---

## 0. Status na conta de anúncios (Allan Porto · 711536816218119)

Criado via API em 25/09/2026, revisado em 30/09/2026 (curso a R$ 97). **Tudo PAUSADO, sem gasto.**

| Nível | Nome | ID |
|---|---|---|
| Campanha | LQV \| Leads \| Teste Criativos \| ABO | `120252208276050286` |
| Conjunto | LQV \| C1 Trafego sem conversao \| BR Adv+ 25-60 | `120252208286520286` |
| Conjunto | LQV \| C2 Margem zona fria \| BR Adv+ 25-60 | `120252209022210286` |
| Conjunto | LQV \| C3 Sem ponto de decisao \| BR Adv+ 25-60 | `120252209149640286` |
| Conjunto | LQV \| C4 Vitrine lotada \| BR Adv+ 25-60 | `120252209208490286` |
| Conjunto | LQV \| C5 Iluminacao generica \| BR Adv+ 25-60 | `120252209263640286` |
| Campanha | LQV \| Vendas \| Pagina do curso \| ABO | `120252291174380286` |
| Conjunto | LQV \| Vendas \| Criativo vencedor \| BR Adv+ 25-60 | `120252291185320286` |

**Revisão de 30/09 (decidida com o Allan):**
- Estratégia: **Leads + Vendas**. Leads (checklist → página do curso) roda primeiro; a campanha de Vendas (compra, pixel `Purchase`, destino página do curso) recebe o criativo vencedor e a verba migra para a que der venda mais barata.
- Orçamento: **R$ 30/dia por conjunto** (5 × 30 = R$ 150/dia no teste). Conjunto de Vendas também R$ 30/dia, ativado no lugar dos criativos perdedores, mantendo ~R$ 150/dia no total.
- Localização: **Brasil inteiro** (moradores). Cortar estados pelo relatório por região depois de 5–7 dias.
- Público: **Advantage+** (sem interesses). Idade mínima 25 é regra fixa; 25–60 vai como sugestão (a Meta exige teto 65 no Advantage+).
- Posicionamentos manuais mantidos: FB Feed/Stories/Reels + IG Feed/Stories/Reels.
- Com ticket de R$ 97 (líquido ≈ R$ 86), o **CPL de equilíbrio é ≈ R$ 1,70 a 2,60** para conversão lead→venda de 2–3%. As seções 3 e 5 abaixo são o plano original (interesses, 16 estados, R$ 40, ticket R$ 497–997) e ficam como referência.

**Pendente:**
1. **Pagamento da conta:** as campanhas ativas aparecem com "Erro no pagamento". Nada veicula até resolver em Cobrança.
2. **Pixel da Hotmart:** instalar o pixel `1414869993251554` no produto (Hotmart → Ferramentas → Pixel de rastreamento) para o evento `Purchase` chegar. Sem ele a campanha de Vendas não tem sinal para otimizar.
3. **Anúncios:** dependem dos 5 vídeos (link público), da URL publicada da landing e da página do Facebook que assina os anúncios.
4. **Pixel na landing:** usar `1414869993251554` em `META_PIXEL_ID`.

---

## 1. Antes de subir (checklist técnico)

| Item | Onde | Status |
|---|---|---|
| Pixel criado e ID colado em `META_PIXEL_ID` no `site/assets/config.js` | Gerenciador de Eventos → Conectar fonte de dados → Web | ☐ |
| Domínio da landing verificado | Configurações do negócio → Segurança da marca → Domínios | ☐ |
| Evento `Lead` aparecendo no Gerenciador de Eventos (faça 1 cadastro de teste com o "Testar eventos") | Gerenciador de Eventos → Testar eventos | ☐ |
| API de Conversões ligada (opcional, recomendado): `META_PIXEL_ID` + `META_CAPI_TOKEN` no Apps Script. O Lead chega 2× com o mesmo `event_id` e a Meta deduplica | `integracoes/apps-script-leads.gs` | ☐ |
| `FORM_ENDPOINT` e `VSL_URL` preenchidos; cadastro de teste gravou na planilha e o e-mail com o PDF chegou | `site/assets/config.js` | ☐ |
| Pixel também instalado na página da VSL e no checkout Hotmart (Hotmart → Ferramentas → Pixel de rastreamento) para medir `InitiateCheckout` e `Purchase` | Hotmart | ☐ |
| Públicos personalizados criados (seção 4) | Públicos | ☐ |
| Instagram profissional conectado à conta de anúncios | Configurações do negócio → Contas do Instagram | ☐ |

---

## 2. Estrutura

São 5 conjuntos idênticos com orçamento próprio (ABO), um criativo em cada. Para montar como **Teste A/B nativo da Meta**, que divide o público em fatias sem sobreposição e evita que os 5 disputem as mesmas pessoas no leilão:

1. Crie a campanha e o conjunto C1 com o anúncio C1 (configuração abaixo).
2. Na lista de campanhas, selecione o conjunto C1 → **Teste A/B** → *Duplicar este conjunto* → variável **Criativo** → 5 versões (máximo que a Meta aceita, exatamente o que precisamos).
3. Em cada cópia, troque só o anúncio (C2…C5) e o nome do conjunto.
4. Métrica-chave do teste: **Custo por resultado (Lead)**. Duração: 7 dias.

Se o teste A/B nativo não estiver disponível na conta, suba os 5 conjuntos manualmente iguais ao diagrama. Funciona igual, só que os conjuntos podem alcançar as mesmas pessoas.

```
CAMPANHA  LQV | Leads | Teste Criativos | ABO
│  Objetivo: Leads · Local de conversão: Site · Categoria especial: nenhuma
│  Orçamento: no CONJUNTO (ABO), não na campanha
│
├─ CONJUNTO  LQV | C1 Trafego sem conversao | Lojistas RegPrio 25-60     R$ 40/dia
│    └─ AD  C1 | Trafego sem conversao | 9x16
├─ CONJUNTO  LQV | C2 Margem zona fria      | Lojistas RegPrio 25-60     R$ 40/dia
│    └─ AD  C2 | Margem zona fria | 9x16
├─ CONJUNTO  LQV | C3 Sem ponto de decisao  | Lojistas RegPrio 25-60     R$ 40/dia
│    └─ AD  C3 | Sem ponto de decisao | 9x16
├─ CONJUNTO  LQV | C4 Vitrine lotada        | Lojistas RegPrio 25-60     R$ 40/dia
│    └─ AD  C4 | Vitrine lotada | 9x16
└─ CONJUNTO  LQV | C5 Iluminacao generica   | Lojistas RegPrio 25-60     R$ 40/dia
     └─ AD  C5 | Iluminacao generica | 9x16
```

**1 criativo por conjunto.** Se colocar os 5 no mesmo conjunto, a Meta joga quase toda a verba no primeiro que performar e os outros nunca recebem teste justo.

### Configuração de cada conjunto (idêntica nos 5; só muda o anúncio)

| Campo | Valor |
|---|---|
| Local da conversão | Site |
| Meta de desempenho | Maximizar o número de conversões |
| Evento de conversão | Pixel → `Lead` |
| Janela de atribuição | 7 dias após o clique ou 1 dia após visualização (padrão) |
| Orçamento | R$ 40/dia (faixa R$ 30–50; ver seção 5) |
| Estratégia de lance | Volume mais alto (sem limite de custo nesta fase) |
| Programação | Início 00:00 do dia seguinte, sem data de término (pausa manual) |
| Público | Seção 3 |
| Posicionamentos | Seção 6 |

---

## 3. Público

**Avatar:** dono(a) ou gerente de loja de varejo (pequeno, médio e grande porte), física ou física + digital, incluindo lojas que vendem pelo Instagram e querem um espaço "instagramável". Dor imediata: "minha loja não vende o que devia".

> **Varejo digital:** entra quem tem ponto físico **e** vende online/Instagram (o método é sobre o espaço). E-commerce 100% online não tem onde aplicar vitrine, zoneamento e luz: vira lead barato que não compra. Não há como excluí-los por interesse; o filtro é o criativo, que sempre fala de "sua loja" física.
>
> **Grande porte / redes:** entram no público, mas o Loja que Vende é a porta de entrada. Leads que se identificarem como rede vão para os produtos 3 e 5 (mentoria de expansão e consultoria) via WhatsApp, conforme o funil do doc.

### Configuração (a mesma nos 5 conjuntos do teste)

| Campo | Valor |
|---|---|
| Tipo de público | **Opções de público originais** (não Advantage+), para a idade 25–60 e os interesses valerem como regra, não como sugestão |
| Localização | **Regiões prioritárias** (abaixo), "pessoas que moram neste local" |
| Idade | **25–60** |
| Gênero | Todos |
| Idioma | Português (Brasil) |
| Segmentação detalhada | Blocos A + B + C abaixo, combinados com **OU** (qualquer um) |
| Advantage+ segmentação detalhada | **Desligado** na fase de teste |
| Exclusões | `LQV Leads 180d` e `LQV Compradores` (seção 4) |
| Tamanho estimado esperado | 4–12 milhões. Se ficar abaixo de 2 mi, incluir o bloco D |

### Segmentação detalhada

Os nomes abaixo são os que aparecem na busca do Gerenciador em português. A Meta remove e renomeia opções com frequência: digite cada termo e use o equivalente mais próximo se o nome exato não existir.

**A. Quem é dono(a) ou gerente** (Dados demográficos e Comportamentos)
- Comportamentos → Administradores de página de negócios
- Comportamentos → Administradores de páginas do Facebook: Comércio e compras
- Comportamentos → Proprietários de pequenas empresas (se disponível no Brasil)
- Dados demográficos → Trabalho → Cargos: Proprietário de loja, Lojista, Gerente de loja, Gerente comercial, Empresário(a), Comerciante, Visual merchandiser (se disponível)
- Dados demográficos → Trabalho → Setores: Vendas; Gestão

**B. Varejo e gestão de loja** (Interesses)
- Varejo, Comércio varejista, Loja de varejo, Gerenciamento de varejo
- ~~Merchandising visual~~ (descontinuado pela Meta), Vitrinismo, Design de loja / Design de varejo
- Franquia, Pequenas empresas, Empreendedorismo, Sebrae
- Ponto de venda, Atendimento ao cliente

**C. Loja instagramável e varejo físico + digital** (Interesses)
- Instagram for Business / Instagram para empresas, Marketing digital, Marketing de mídia social
- Comércio eletrônico, Loja virtual, Nuvemshop, Shopify
- Design de interiores, Decoração, Arquitetura de interiores
- Segmentos do avatar: Boutique, Moda feminina, Moda fitness, Loja de roupas, Bijuteria, Calçados, Óticas, Farmácia, Cosméticos, Empório, Cafeteria, Confeitaria

**D. Reserva (só se o público ficar pequeno):** Negócios, Vendas, Administração de empresas, Gestão de pequenas empresas.

### Regiões prioritárias

Critério: densidade de lojas físicas, poder de compra para um ticket de R$497–997, polos de moda e confecção (a loja de roupa é o avatar mais forte) e a base do Allan em Pernambuco, onde o caso da loja de moda fitness é prova local.

| Cluster | Estados | Por que entra |
|---|---|---|
| **1. Sudeste** | SP, RJ, MG, ES | Maior concentração de varejo e shoppings do país. CPM mais alto, mas ticket compatível |
| **2. Sul** | PR, SC, RS | Varejo de moda forte (polos de Cianorte, Maringá, Brusque, Blumenau), renda alta |
| **3. Nordeste** | PE, CE, BA, PB, RN | Base do Allan (Caruaru/Agreste, prova local), polos de confecção (Caruaru, Toritama, Santa Cruz do Capibaribe, Fortaleza), CPM mais baixo |
| **4. Centro-Oeste** | GO, DF, MT, MS | Goiânia é polo de moda atacadista (Região da 44), Brasília tem renda alta |

**Fora da fase de teste:** Norte (AM, PA, RO, AC, AP, RR, TO), MA, PI, AL, SE. Motivo: menor densidade de varejo formal e menor volume de lojistas com caixa para o ticket. Entram na escala se o detalhamento por região mostrar lead barato vindo de estados vizinhos.

**Polos de moda e varejo** (cidades para o conjunto de polos da fase 2; já estão cobertas pelos estados na fase 1):

| Polo | Cidade + raio |
|---|---|
| Agreste pernambucano | Caruaru +40 km (pega Toritama e Santa Cruz do Capibaribe) |
| Brás / Bom Retiro / 25 de Março | São Paulo capital |
| Região da 44 | Goiânia +25 km |
| Moda de Fortaleza | Fortaleza +25 km |
| Moda PR | Cianorte +25 km, Maringá +25 km |
| Moda SC | Brusque +25 km, Blumenau +25 km |
| Moda íntima / calçados | Nova Friburgo +15 km (RJ), Franca +15 km (SP), Divinópolis +20 km (MG) |

### Como a região entra no teste

**Fase 1 (teste dos 5 criativos):** os 4 clusters juntos, num público único, igual nos 5 conjuntos. Separar por região agora exigiria 5 criativos × 4 regiões = 20 conjuntos, cerca de R$ 800/dia para cada um sair do aprendizado. Durante o teste, ver o resultado por estado em **Detalhamento → Por entrega → Região**, sem custo extra.

**Fase 2 (com o criativo vencedor fixo):** teste A/B de região com 1 conjunto por cluster (R$ 40/dia cada) + 1 conjunto "Polos de moda" com as cidades acima. Os clusters com CPL ≤ alvo e melhor taxa de compra recebem a verba da escala.

### Públicos para testes futuros (fase 2 em diante)

Com o criativo e a região vencedores fixos: segmentação detalhada acima vs. Advantage+ aberto vs. Semelhante 1% de `LQV Leads 180d` (a partir de ~100 leads) vs. Semelhante 1% de compradores (a partir de ~100 vendas).

---

## 4. Públicos personalizados (criar antes de subir)

| Nome | Origem | Regra | Uso |
|---|---|---|---|
| `LQV Leads 180d` | Pixel | Evento `Lead`, últimos 180 dias | Exclusão no teste; base para Semelhante |
| `LQV Compradores` | Pixel (Hotmart) | Evento `Purchase`, 180 dias | Exclusão em tudo |
| `LQV Visitou captura sem cadastro 7d` | Pixel | URL contém `/loja-que-vende/`, 7 dias, **excluindo** `Lead` | Remarketing (fase 2) |
| `LQV Viu VSL sem comprar 14d` | Pixel | URL contém `/loja-que-vende/obrigado`, 14 dias, excluindo `Purchase` | Remarketing de venda (fase 2) |
| `LQV Engajou vídeo 50% 30d` | Engajamento → Vídeo | Assistiu ≥ 50% de qualquer um dos 5 criativos, 30 dias | Remarketing / Semelhante |

---

## 5. Orçamento do teste

| Cenário | Por criativo | Total/dia | 7 dias |
|---|---|---|---|
| Mínimo | R$ 30 | R$ 150 | R$ 1.050 |
| **Recomendado** | **R$ 40** | **R$ 200** | **R$ 1.400** |
| Acelerado | R$ 50 | R$ 250 | R$ 1.750 |

Recomendo R$ 40: é o que dá chance real de cada conjunto sair da fase de aprendizado (≈ 50 leads/semana) se o CPL ficar perto de R$ 5–6.

### CPL-alvo: de onde vem o número

Isca gratuita para lojista, tráfego frio no Brasil: CPL típico entre R$ 3 e R$ 10. O teto que importa é o que a VSL paga:

| Ticket | Líquido Hotmart (≈ 9,9% + R$ 1) | Conversão lead → venda | **CPL máximo p/ empatar** |
|---|---|---|---|
| R$ 497 | ≈ R$ 447 | 1% | R$ 4,47 |
| R$ 497 | ≈ R$ 447 | 2% | R$ 8,94 |
| R$ 997 | ≈ R$ 897 | 1% | R$ 8,97 |
| R$ 997 | ≈ R$ 897 | 2% | R$ 17,94 |

Order bump e upsell aumentam o teto. **CPL-alvo inicial: R$ 6.** Recalcular com a conversão real da VSL depois dos primeiros 300 leads.

---

## 6. Posicionamentos

**Manual**, só onde o vídeo vertical narrado funciona:

| Liga | Desliga |
|---|---|
| Instagram Reels | Audience Network |
| Instagram Stories | Messenger (todos) |
| Instagram Feed (principal) | Coluna da direita do Facebook |
| Facebook Reels | Resultados de pesquisa |
| Facebook Stories | Vídeos in-stream |
| Facebook Feed | Marketplace, Explorar, Threads |

Audience Network e in-stream geram lead barato de baixa qualidade (clique acidental), o que suja a comparação entre criativos. Na fase de escala, testar Advantage+ posicionamentos contra o manual.

### Especificações do criativo

- **Formato principal:** vídeo 9:16, 1080×1920, 30–45s (Reels/Stories). Exportar também um corte **4:5 (1080×1350)** para o Feed e usar "Personalizar posicionamentos" no anúncio.
- **Legenda embutida** em todas as falas: a maioria assiste sem som.
- **Texto na tela nos 3 primeiros segundos** com a dor do criativo (ex.: "LOJA CHEIA. CAIXA VAZIO?").
- **Zona segura dos Reels:** nada importante nos 14% de cima nem nos 35% de baixo (é onde ficam nome, legenda e botão).
- **Último frame (3s):** capa do checklist + "Baixe grátis ↓".

### Ajuste obrigatório nos roteiros

Os roteiros do doc terminam em **"link na bio"**. Em anúncio pago isso manda o clique para o perfil, e não para a landing: o custo por lead sobe e o Pixel não atribui a conversão. Troque o fechamento falado por:

> "Toca no botão aqui embaixo e baixa grátis o checklist dos 5 erros de layout que fazem sua loja perder venda."

(Mantenha "link na bio" só se for postar o mesmo vídeo organicamente.)

---

## 7. Os 5 anúncios

URL de destino (todos): `https://allanportopontess.github.io/lojaquevende/loja-que-vende/` (a página de captura)
Parâmetros de URL (campo "Parâmetros de URL" do anúncio, igual nos 5):

```
utm_source=meta&utm_medium=paid&utm_campaign={{campaign.name}}&utm_term={{adset.name}}&utm_content={{ad.name}}
```

A landing guarda as UTMs, grava na planilha junto com o lead e repassa para a VSL. Assim dá para saber qual criativo gerou cada venda, não só cada lead.

Botão (CTA) nos 5: **Baixar**. Alternativa se o "Baixar" ficar caro: *Saiba mais*.

### C1: Tráfego sem conversão

- **Vídeo:** planta baixa de loja real na tela → narração do roteiro Criativo 1 (fechamento ajustado)
- **Texto principal:**
  > Sua loja tem movimento, mas não vende o que devia?
  >
  > O problema pode não ser o produto, nem o vendedor, nem o preço. Pode ser o espaço.
  >
  > Sou arquiteto especialista em varejo (CAU-PE) e vejo o mesmo padrão loja após loja: decisões de layout que ninguém percebe, mas que fazem o cliente sair sem comprar.
  >
  > Montei um checklist gratuito com os 5 erros mais comuns. Em 3 minutos você descobre quais estão acontecendo na sua loja.
  >
  > 👇 Toque em "Baixar" e receba grátis.
- **Título:** Checklist grátis: 5 erros que fazem sua loja perder venda
- **Descrição:** PDF de 2 páginas, feito por arquiteto de varejo

### C2: Produto de maior margem escondido na zona fria

- **Vídeo:** planta com zona quente/fria destacada ou foto real das araras da loja de moda fitness (caso real)
- **Texto principal:**
  > Qual produto da sua loja tem a maior margem?
  >
  > Agora olha onde ele está.
  >
  > Na maioria das lojas que eu analiso, o produto que mais dá lucro fica exatamente na pior zona: longe de onde o cliente olha primeiro.
  >
  > Não é acaso, é erro de zoneamento. E se corrige mudando produto de lugar, sem obra.
  >
  > 👇 Baixe grátis o checklist dos 5 erros de layout e descubra se isso está acontecendo na sua loja.
- **Título:** Seu produto mais lucrativo está no lugar errado?
- **Descrição:** Checklist grátis de autoavaliação da loja

### C3: Cliente entra, dá uma volta e sai

- **Vídeo:** diagrama de fluxo / planta com seta de percurso
- **Texto principal:**
  > O cliente entra, dá uma volta… e vai embora sem comprar.
  >
  > Isso não é falta de sorte. É falta de um ponto que faça ele PARAR.
  >
  > Toda loja que converte bem tem pelo menos um ponto de decisão no meio do trajeto: um lugar desenhado de propósito para o cliente parar, olhar e considerar comprar.
  >
  > 👇 Baixe grátis o checklist e veja se sua loja tem o seu.
- **Título:** Por que o cliente dá uma volta e sai sem comprar
- **Descrição:** 5 erros de layout em 1 checklist grátis

### C4: Vitrine lotada sem foco

- **Vídeo:** foto real da vitrine da loja de moda fitness (caso real)
- **Texto principal:**
  > Sua vitrine tem 10 peças tentando vender tudo ao mesmo tempo?
  >
  > Esse é o motivo número 1 de gente passar reto na frente da sua loja.
  >
  > Vitrine que vende tem no máximo 3 peças em destaque, com luz dirigida. Simples de corrigir, mas quase ninguém faz.
  >
  > 👇 Baixe grátis o checklist com esse e outros 4 erros de layout que fazem sua loja perder venda.
- **Título:** Vitrine lotada não para ninguém na calçada
- **Descrição:** Checklist grátis, 3 minutos de leitura

### C5: Iluminação genérica escondendo o melhor produto

- **Vídeo:** exemplo real de luz em camadas, contraste de luz e sombra
- **Texto principal:**
  > Sua loja tem luz. Mas ela não vende nada sozinha.
  >
  > Luz de vitrine devia ser mais forte que a da rua. Luz do produto-foco devia ser dirigida, não genérica.
  >
  > Se sua loja usa a mesma luz em tudo, seu melhor produto está se perdendo no meio dos outros.
  >
  > 👇 Baixe grátis o checklist dos 5 erros de layout, incluindo o de iluminação.
- **Título:** A luz da sua loja está escondendo seu melhor produto
- **Descrição:** Checklist grátis de arquiteto de varejo

> A mesma tabela está em `anuncios.csv` para copiar e colar.

---

## 8. Como ler o teste

### Métricas (coluna personalizada no Gerenciador)

Crie a visualização de colunas **"LQV Teste"** com:

| Métrica | Como calcular | Referência | O que indica |
|---|---|---|---|
| Hook rate | Reproduções de 3s ÷ Impressões | ≥ 25% (bom ≥ 35%) | Os 3 primeiros segundos seguram? |
| Hold rate | ThruPlays ÷ Reproduções de 3s | ≥ 15% | O roteiro segura até o fim? |
| CTR (link) | Cliques no link ÷ Impressões | ≥ 1% | A dor gera ação? |
| CPM | — | R$ 15–40 | Custo do público (igual nos 5 se o teste estiver limpo) |
| Connect rate | Visualizações da página de destino ÷ Cliques no link | ≥ 70% | Landing carrega rápido? |
| Conversão da página | Leads ÷ Visualizações da página de destino | ≥ 30% | A landing converte? |
| **CPL** | Valor gasto ÷ Leads | **≤ R$ 6** | Métrica principal |
| Lead → compra | Compras (Hotmart/UTM) ÷ Leads | ≥ 1% | Qualidade do lead (métrica de desempate) |

### Regras de decisão

| Quando | Regra | Ação |
|---|---|---|
| Dias 1–3 | Nenhuma mudança, nem de orçamento, nem de texto. Editar reinicia o aprendizado. | Só observar |
| Qualquer momento | Gastou **R$ 18 (3× CPL-alvo) com 0 leads** | Pausar o conjunto |
| Qualquer momento | Hook rate < 15% após 2.000 impressões | Pausar e refazer só os 3s iniciais do vídeo |
| Dia 4+ | CPL > R$ 9 (1,5× alvo) com R$ 100+ gastos | Pausar |
| Dia 4+ | CTR bom (≥ 1%) mas conversão da página < 20% | Problema é a landing, não o criativo: revisar a página |
| Dia 7 | Vencedor = menor CPL **com** lead → compra ≥ 1% (se já houver vendas). Empate técnico (< 15% de diferença): vence o de maior taxa de compra | Vencedor vai para a escala |

Um criativo com CPL de R$ 4 que não vende perde para um de R$ 6 que vende. Por isso as UTMs vão até a VSL e o checkout.

---

## 9. Depois do teste (fase 2: escala)

1. **Campanha de escala** `LQV | Leads | Escala | CBO`: orçamento na campanha, começando em 2× o gasto diário do vencedor. Colocar o criativo vencedor + o 2º colocado. Aumentar **20–30% a cada 48–72h** enquanto o CPL ficar ≤ alvo.
2. **Novas variações do vencedor:** mesmo ângulo de dor com gancho diferente nos 3 primeiros segundos (3 versões). Criativo cansa: frequência > 2,5 ou CPL subindo 3 dias seguidos = hora de renovar.
3. **Remarketing** `LQV | Vendas | Remarketing`, R$ 15–20/dia:
   - `Visitou captura sem cadastro 7d` → reforço da isca (C4 ou C5, os mais visuais)
   - `Viu VSL sem comprar 14d` → trecho da VSL (bloco de autoridade + oferta), destino: checkout Hotmart, otimização `Purchase`
   - Excluir `LQV Compradores` sempre.
4. **Teste de região** (4 clusters + polos de moda) e depois **teste de público**, sempre com o criativo vencedor fixo (seção 3).

---

## Convenção de nomes

```
Campanha:  LQV | <Objetivo> | <Fase> | <ABO/CBO>
Conjunto:  LQV | C<n> <dor> | <público> <idade>
Anúncio:   C<n> | <dor> | <formato>[ | v<versão>]
```

Os nomes vão para as UTMs automaticamente via `{{campaign.name}}`, `{{adset.name}}`, `{{ad.name}}`: mantenha curtos e sem acento para não quebrar a planilha.

# Campanha Meta Ads: Loja que Vende (fase de teste)

Objetivo desta fase: descobrir qual dos 5 criativos gera **lead mais barato e mais qualificado** para a isca "Checklist dos 5 Erros de Layout". O vencedor vai para a escala; os outros são pausados.

```
Anúncio (Reels/Stories/Feed) → Página de captura (landing/index.html) → VSL → Checkout Hotmart → order bump / upsell
```

---

## 1. Antes de subir (checklist técnico)

| Item | Onde | Status |
|---|---|---|
| Pixel criado e ID colado em `META_PIXEL_ID` no `landing/index.html` | Gerenciador de Eventos → Conectar fonte de dados → Web | ☐ |
| Domínio da landing verificado | Configurações do negócio → Segurança da marca → Domínios | ☐ |
| Evento `Lead` aparecendo no Gerenciador de Eventos (faça 1 cadastro de teste com o "Testar eventos") | Gerenciador de Eventos → Testar eventos | ☐ |
| API de Conversões ligada (opcional, recomendado): `META_PIXEL_ID` + `META_CAPI_TOKEN` no Apps Script. O Lead chega 2× com o mesmo `event_id` e a Meta deduplica | `integracoes/apps-script-leads.gs` | ☐ |
| `FORM_ENDPOINT` e `VSL_URL` preenchidos; cadastro de teste gravou na planilha e o e-mail com o PDF chegou | `landing/index.html` | ☐ |
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
├─ CONJUNTO  LQV | C1 Trafego sem conversao | Amplo BR 25-60     R$ 40/dia
│    └─ AD  C1 | Trafego sem conversao | 9x16
├─ CONJUNTO  LQV | C2 Margem zona fria      | Amplo BR 25-60     R$ 40/dia
│    └─ AD  C2 | Margem zona fria | 9x16
├─ CONJUNTO  LQV | C3 Sem ponto de decisao  | Amplo BR 25-60     R$ 40/dia
│    └─ AD  C3 | Sem ponto de decisao | 9x16
├─ CONJUNTO  LQV | C4 Vitrine lotada        | Amplo BR 25-60     R$ 40/dia
│    └─ AD  C4 | Vitrine lotada | 9x16
└─ CONJUNTO  LQV | C5 Iluminacao generica   | Amplo BR 25-60     R$ 40/dia
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

**Avatar:** dono(a) de loja física ou showroom pequeno/médio (roupas, acessórios, alimentício, farmácia), sem verba para contratar arquiteto, com a dor imediata "minha loja não vende o que devia".

### Público de teste (o mesmo nos 5 conjuntos)

| Campo | Valor |
|---|---|
| Localização | Brasil (pessoas que moram no local) |
| Idade | 25–60 |
| Gênero | Todos |
| Idioma | Português (Brasil) |
| Público Advantage+ | **Ligado**, com as sugestões abaixo como ponto de partida |
| Exclusões | `LQV Leads 180d` e `LQV Compradores` (seção 4) |

**Sugestões de público (interesses e comportamentos)** para orientar o algoritmo nas primeiras 48h:

- **Negócio:** Varejo, Pequenas empresas, Empreendedorismo, Franquia, Sebrae, Merchandising visual, Vitrinismo, Gestão de varejo
- **Segmentos do avatar:** Loja de roupas, Moda feminina, Boutique, Bijuteria, Loja de calçados, Farmácia, Drogaria, Empório, Loja de conveniência
- **Comportamentos:** Administradores de página de negócios; Proprietários de pequenas empresas (se aparecer na busca da conta)

Por que amplo com Advantage+: com R$ 40/dia por conjunto, público estreito (<1 mi) encarece o CPM e trava a fase de aprendizado. Quem filtra o avatar é o **criativo**: a primeira frase já fala com lojista, e quem não tem loja rola o feed.

### Público para teste futuro (fase 2, não agora)

Depois de escolher o criativo vencedor, testar o público com o criativo fixo: Advantage+ aberto vs. interesses restritos vs. Semelhante 1% de `LQV Leads 180d` (a partir de ~100 leads) vs. Semelhante 1% de compradores (a partir de ~100 vendas).

---

## 4. Públicos personalizados (criar antes de subir)

| Nome | Origem | Regra | Uso |
|---|---|---|---|
| `LQV Leads 180d` | Pixel | Evento `Lead`, últimos 180 dias | Exclusão no teste; base para Semelhante |
| `LQV Compradores` | Pixel (Hotmart) | Evento `Purchase`, 180 dias | Exclusão em tudo |
| `LQV Visitou captura sem cadastro 7d` | Pixel | URL contém `/` da landing, 7 dias, **excluindo** `Lead` | Remarketing (fase 2) |
| `LQV Viu VSL sem comprar 14d` | Pixel | URL contém `/vsl`, 14 dias, excluindo `Purchase` | Remarketing de venda (fase 2) |
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

URL de destino (todos): `https://SEU-DOMINIO.com.br/` (a landing)
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
- **Descrição:** PDF de 3 páginas, feito por arquiteto de varejo

### C2: Produto de maior margem escondido na zona fria

- **Vídeo:** planta com zona quente/fria destacada ou foto real das araras do Empório Fit
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

- **Vídeo:** foto real da vitrine do Empório Fit
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
4. **Teste de público** com o criativo fixo (seção 3, fase 2).

---

## Convenção de nomes

```
Campanha:  LQV | <Objetivo> | <Fase> | <ABO/CBO>
Conjunto:  LQV | C<n> <dor> | <público> <idade>
Anúncio:   C<n> | <dor> | <formato>[ | v<versão>]
```

Os nomes vão para as UTMs automaticamente via `{{campaign.name}}`, `{{adset.name}}`, `{{ad.name}}`: mantenha curtos e sem acento para não quebrar a planilha.

import type { GoldPage } from "./gold";

export const GOLD_PT: GoldPage = {
  metaTitle: "Análise com IA especializada em ouro (XAU/USD) — Scanzivo",
  metaDescription:
    "Envie um print do seu gráfico XAU/USD: a IA lê a tendência, traça os níveis e monta um plano com números, levando em conta o que mexe com o ouro. Primeira leitura grátis.",
  kicker: "Análise especializada em ouro · XAU/USD",
  lede: "Ajustada para o ouro: reconhece os preços redondos onde muitos traders colocam suas ordens, considera os horários de Londres e Nova York e fica cautelosa com os anúncios dos EUA.",
  title: "A análise com IA dos seus gráficos de ouro.",
  titleB: "Do gráfico de 1 hora ao de 5 minutos.",
  intro:
    "Envie um print do seu gráfico XAU/USD. A IA lê a tendência e a estrutura, traça os níveis na sua imagem e propõe um plano com números: entrada, stop, alvos e o nível que invalidaria o cenário.",
  cta: "Analisar meu gráfico de ouro",
  routineTitle: "A rotina 1H, 15m, 5m",
  routineIntro: "É assim que muitos day traders operam o ouro: primeiro a direção, depois a entrada. Um print por tempo gráfico.",
  steps: [
    { tf: "1H", title: "A direção", text: "O print de 1 hora mostra para onde o mercado está indo: tendência, estrutura, zonas onde o ouro já reagiu. Ele define o contexto do pregão." },
    { tf: "15m", title: "O plano", text: "No gráfico de 15 minutos, a análise afina os níveis que importam no dia e o cenário preferido, com o stop e os alvos." },
    { tf: "5m", title: "A entrada", text: "O gráfico de 5 minutos serve para esperar o momento certo: um rompimento confirmado, um reteste ou a conclusão “esperar”, quando o sinal ainda não está lá." },
  ],
  example: {
    label: "Exemplo ilustrativo · números fictícios",
    rows: [
      { tf: "1H", reading: "Tendência de alta, fundos ascendentes", plan: "Resistência 2.450 · suporte 2.400" },
      { tf: "15m", reading: "Cenário de alta preferido, 64%", plan: "Entrada no fechamento acima de 2.432, stop 2.418, alvos 2.450 e depois 2.470" },
      { tf: "5m", reading: "O preço ainda trava abaixo de 2.432", plan: "Esperar o fechamento acima antes de entrar" },
    ],
    note: "Esta tabela mostra o formato de uma leitura, não um resultado real. Cada análise sai do seu próprio print.",
  },
  knowsTitle: "O que a IA leva em conta no ouro",
  knows: [
    { title: "Os números redondos", text: "Preços como US$ 3.000, US$ 3.050 ou US$ 3.100 atraem ordens: muitos traders colocam ali entradas, stops e alvos. A análise usa esses preços para situar seus níveis." },
    { title: "As sessões", text: "O range asiático costuma ser rompido na abertura de Londres, e a abertura americana, às 9h30 de Brasília (10h30 durante o horário de inverno nos EUA), traz os maiores movimentos do dia." },
    { title: "Os dados dos EUA", text: "Inflação (CPI), emprego (payroll), decisões do Fed: perto desses anúncios, os falsos rompimentos são comuns. A análise lembra disso quando faz diferença." },
    { title: "O ruído", text: "O ouro se mexe muito dentro de um mesmo pregão. Os stops sugeridos ficam além dos pavios recentes, não colados em um nível." },
  ],
  macroTitle: "Com o pacote Pro: o contexto que mexe com o ouro",
  macroText:
    "Cada análise de ouro é cruzada com os anúncios dos próximos 7 dias e as notícias recentes: Fed, inflação e emprego nos EUA, dólar, juros reais, compras de ouro pelos bancos centrais, fluxos dos ETFs. Com as fontes, e uma frase sobre como levar isso em conta no seu plano.",
  platformsTitle: "Com as suas ferramentas",
  platformsText:
    "Basta um print do TradingView, do MetaTrader 4 ou 5, do cTrader ou do app da sua corretora, seja qual for o nome exibido: XAU/USD, XAUUSD, GOLD. Só é preciso que o eixo de preços esteja legível.",
  limitsTitle: "O que o Scanzivo não faz",
  limits: [
    "Ele não prevê o preço: ele pesa cenários, e o cenário preferido também erra.",
    "Ele não envia ordens e não mexe no seu dinheiro.",
    "Ele só conhece o seu print: não vê cotações em tempo real.",
    "Não é recomendação de investimento personalizada.",
  ],
  cfd:
    "O XAU/USD é negociado quase sempre como CFD, com alavancagem. São produtos complexos, e a maioria das contas de investidores pessoa física perde dinheiro com eles. Só arrisque o que você pode perder.",
  faqTitle: "Dúvidas sobre a análise de ouro",
  faq: [
    {
      q: "A IA é mesmo especializada em ouro?",
      a: "Quando o print mostra ouro, a análise segue instruções próprias do XAU/USD (números redondos, sessões, dados dos EUA, posição dos stops), e a parte de notícias do pacote Pro procura primeiro o que mexe com o ouro. O modelo de IA em si é o mesmo usado para os outros ativos.",
    },
    { q: "Quais tempos gráficos?", a: "Todos, do 1 minuto ao mensal. Para day trade, a rotina de 1 hora, 15 minutos e 5 minutos é um bom ponto de partida." },
    {
      q: "Posso analisar várias vezes por dia?",
      a: "Sim, com o pacote Pro, sem limite de quantidade. O pacote Starter dá uma análise por dia.",
    },
    { q: "Preciso de conta para testar?", a: "Não. Envie o seu print: a IA mostra a primeira leitura de graça, sem cartão e sem cadastro." },
    { q: "É um serviço de sinais?", a: "Não. O Scanzivo entrega uma leitura fundamentada do seu gráfico e um plano, que você segue ou não. Ele não envia alertas e não abre ordens." },
  ],
  closingTitle: "Seu próximo gráfico de ouro, lido em menos de um minuto.",
  breadcrumb: "Análise de ouro",
  navLabel: "Ouro",
  homeTitle: "Você opera ouro?",
  homeLink: "Conheça a análise especializada em XAU/USD →",
  reportBadge: "Análise especializada em ouro",
};

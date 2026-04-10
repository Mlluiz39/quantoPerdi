// ====================================
// QuantoPerdi — Motor de Cálculos
// ====================================

// --- Formatação ---

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatarMoedaDecimal(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatarPercentual(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }) + '%';
}

// --- Parsers ---

export function parseMoeda(valor: string): number {
  if (!valor) return 0;
  const limpo = valor.replace(/[^\d,.-]/g, '').replace(',', '.');
  const num = parseFloat(limpo);
  return isNaN(num) ? 0 : num;
}

export function parseNumero(valor: string): number {
  if (!valor) return 0;
  const limpo = valor.replace(',', '.');
  const num = parseFloat(limpo);
  return isNaN(num) ? 0 : num;
}

// --- Comparações ---

interface Comparacao {
  emoji: string;
  descricao: string;
}

export function gerarComparacoes(valor: number): Comparacao[] {
  const comparacoes: Comparacao[] = [];

  if (valor >= 500) {
    comparacoes.push({ emoji: '📱', descricao: `${Math.floor(valor / 3500)} smartphones novos` });
  }
  if (valor >= 1000) {
    comparacoes.push({ emoji: '✈️', descricao: `${Math.floor(valor / 5000)} viagens internacionais` });
  }
  if (valor >= 300) {
    comparacoes.push({ emoji: '🛒', descricao: `${Math.floor(valor / 800)} meses de supermercado` });
  }
  if (valor >= 5000) {
    comparacoes.push({ emoji: '🏠', descricao: `${Math.floor(valor / 1500)} meses de aluguel` });
  }
  if (valor >= 20000) {
    comparacoes.push({ emoji: '🚗', descricao: `${Math.floor(valor / 45000)} carros populares` });
  }
  if (valor >= 100) {
    comparacoes.push({ emoji: '🍔', descricao: `${Math.floor(valor / 35)} jantares em restaurante` });
  }

  return comparacoes.slice(0, 3);
}

// --- Calculadoras ---

export interface ResultadoCartao {
  totalPago: number;
  jurosPagos: number;
  mesesParaQuitar: number;
  percentualJuros: number;
  storytelling: string;
  comparacoes: Comparacao[];
}

export function calcularPerdaCartao(
  divida: number,
  taxaMensal: number,
  pagamentoMensal: number
): ResultadoCartao | null {
  if (divida <= 0 || taxaMensal <= 0 || pagamentoMensal <= 0) return null;

  const taxa = taxaMensal / 100;

  // Verifica se o pagamento cobre ao menos os juros
  const jurosPrimeiroMes = divida * taxa;
  if (pagamentoMensal <= jurosPrimeiroMes) {
    return {
      totalPago: Infinity,
      jurosPagos: Infinity,
      mesesParaQuitar: Infinity,
      percentualJuros: Infinity,
      storytelling: `⚠️ Seu pagamento de ${formatarMoeda(pagamentoMensal)} não cobre nem os juros mensais de ${formatarMoeda(jurosPrimeiroMes)}! A dívida só vai crescer.`,
      comparacoes: [],
    };
  }

  let saldo = divida;
  let totalPago = 0;
  let meses = 0;
  const maxMeses = 600; // 50 anos de segurança

  while (saldo > 0.01 && meses < maxMeses) {
    const juros = saldo * taxa;
    saldo += juros;
    const pagamento = Math.min(pagamentoMensal, saldo);
    saldo -= pagamento;
    totalPago += pagamento;
    meses++;
  }

  const jurosPagos = totalPago - divida;
  const percentualJuros = (jurosPagos / divida) * 100;
  const comparacoes = gerarComparacoes(jurosPagos);

  const storytelling = meses >= maxMeses
    ? `😱 Essa dívida levaria mais de 50 anos para quitar! Você pagaria ${formatarMoeda(jurosPagos)} só em juros.`
    : `😱 Se você tivesse quitado no mês 1, teria economizado ${formatarMoeda(jurosPagos)}. Isso é ${formatarPercentual(percentualJuros)} a mais do que a dívida original!`;

  return {
    totalPago,
    jurosPagos,
    mesesParaQuitar: meses,
    percentualJuros,
    storytelling,
    comparacoes,
  };
}

export interface ResultadoInflacao {
  valorFuturo: number;
  perdaAbsoluta: number;
  percentualPerdido: number;
  powerCompra: number;
  storytelling: string;
  comparacoes: Comparacao[];
}

export function calcularPerdaInflacao(
  valor: number,
  anos: number,
  taxaAnual: number
): ResultadoInflacao | null {
  if (valor <= 0 || anos <= 0 || taxaAnual <= 0) return null;

  const taxa = taxaAnual / 100;
  // Poder de compra real após inflação
  const powerCompra = valor / Math.pow(1 + taxa, anos);
  const perdaAbsoluta = valor - powerCompra;
  const percentualPerdido = (perdaAbsoluta / valor) * 100;
  const comparacoes = gerarComparacoes(perdaAbsoluta);

  const storytelling = `💸 Em ${anos} anos, seus ${formatarMoeda(valor)} terão o poder de compra de apenas ${formatarMoeda(powerCompra)}. A inflação comeu ${formatarPercentual(percentualPerdido)} do seu dinheiro — silenciosamente.`;

  return {
    valorFuturo: powerCompra,
    perdaAbsoluta,
    percentualPerdido,
    powerCompra,
    storytelling,
    comparacoes,
  };
}

export type Frequencia = 'diario' | 'semanal' | 'mensal' | 'anual';

export interface ResultadoGastos {
  totalGasto1Ano: number;
  totalGasto5Anos: number;
  totalGasto10Anos: number;
  totalGasto30Anos: number;
  custoOportunidade10Anos: number;
  custoOportunidade30Anos: number;
  storytelling: string;
  comparacoes: Comparacao[];
}

export function calcularGastosInvisiveis(
  valor: number,
  frequencia: Frequencia,
  taxaInvestimentoAnual: number = 10
): ResultadoGastos | null {
  if (valor <= 0) return null;

  // Converter para gasto mensal
  let gastoMensal: number;
  switch (frequencia) {
    case 'diario': gastoMensal = valor * 30; break;
    case 'semanal': gastoMensal = valor * 4.33; break;
    case 'mensal': gastoMensal = valor; break;
    case 'anual': gastoMensal = valor / 12; break;
  }

  const totalGasto1Ano = gastoMensal * 12;
  const totalGasto5Anos = gastoMensal * 60;
  const totalGasto10Anos = gastoMensal * 120;
  const totalGasto30Anos = gastoMensal * 360;

  // Custo de oportunidade: se investisse o gasto mensal
  const taxaMensal = Math.pow(1 + taxaInvestimentoAnual / 100, 1 / 12) - 1;

  const calcularFuturo = (meses: number) => {
    // Fórmula de aportes regulares: FV = PMT × [((1+r)^n - 1) / r]
    return gastoMensal * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal);
  };

  const custoOportunidade10Anos = calcularFuturo(120);
  const custoOportunidade30Anos = calcularFuturo(360);
  const comparacoes = gerarComparacoes(custoOportunidade30Anos);

  const storytelling = `🔥 Esse gasto "insignificante" de ${formatarMoeda(gastoMensal)}/mês, se investido, renderia ${formatarMoeda(custoOportunidade30Anos)} em 30 anos. Você está literalmente queimando uma fortuna.`;

  return {
    totalGasto1Ano,
    totalGasto5Anos,
    totalGasto10Anos,
    totalGasto30Anos,
    custoOportunidade10Anos,
    custoOportunidade30Anos,
    storytelling,
    comparacoes,
  };
}

export interface ResultadoPoupanca {
  totalPoupanca: number;
  totalCDI: number;
  totalRendaFixa: number;
  perdaPoupancaVsCDI: number;
  perdaPoupancaVsRendaFixa: number;
  percentualPerdido: number;
  storytelling: string;
  comparacoes: Comparacao[];
}

export function calcularPerdaPoupanca(
  valor: number,
  aporteMensal: number,
  anos: number,
  taxaPoupancaAnual: number = 7.1,   // ~0.5% ao mês + TR
  taxaCDIAnual: number = 13.25,       // Selic atual
  taxaRendaFixaAnual: number = 14.5   // CDB 110% CDI
): ResultadoPoupanca | null {
  if (valor <= 0 || anos <= 0) return null;

  const meses = anos * 12;

  const calcularMontante = (taxaAnual: number) => {
    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
    // Montante = PV(1+r)^n + PMT × [((1+r)^n - 1) / r]
    const montanteInicial = valor * Math.pow(1 + taxaMensal, meses);
    const montanteAportes = aporteMensal > 0
      ? aporteMensal * ((Math.pow(1 + taxaMensal, meses) - 1) / taxaMensal)
      : 0;
    return montanteInicial + montanteAportes;
  };

  const totalPoupanca = calcularMontante(taxaPoupancaAnual);
  const totalCDI = calcularMontante(taxaCDIAnual);
  const totalRendaFixa = calcularMontante(taxaRendaFixaAnual);

  const perdaPoupancaVsCDI = totalCDI - totalPoupanca;
  const perdaPoupancaVsRendaFixa = totalRendaFixa - totalPoupanca;
  const percentualPerdido = (perdaPoupancaVsRendaFixa / totalPoupanca) * 100;
  const comparacoes = gerarComparacoes(perdaPoupancaVsRendaFixa);

  const storytelling = `📉 Em ${anos} anos, você deixou ${formatarMoeda(perdaPoupancaVsRendaFixa)} na mesa por manter na poupança. Se tivesse investido em renda fixa, teria ${formatarMoeda(totalRendaFixa)} ao invés de ${formatarMoeda(totalPoupanca)}.`;

  return {
    totalPoupanca,
    totalCDI,
    totalRendaFixa,
    perdaPoupancaVsCDI,
    perdaPoupancaVsRendaFixa,
    percentualPerdido,
    storytelling,
    comparacoes,
  };
}

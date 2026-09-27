export default function format() {}

// Função que limpa a data pra o padrão brasileiro
export function cleanDate(newDate) {
  const date = new Date(newDate);
  const cleanDate = date.toLocaleDateString("pt-BR", { timeZone: "UTC" });

  return cleanDate;
}

// Função que formata valores numéricos para Real (BRL)
export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

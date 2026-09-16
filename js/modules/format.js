export default function format() {}

//Função que limpa a data pra o padrão brasileiro
export function cleanDate(newDate) {
  const date = new Date(newDate);
  const cleanDate = date.toLocaleDateString("pt-BR", { timeZone: "UTC" });

  return cleanDate;
}

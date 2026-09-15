export default function format() {}

export function cleanDate(newDate) {
  const date = new Date(newDate);
  const cleanDate = date.toLocaleDateString("pt-BR", { timeZone: "UTC" });

  return cleanDate;
}

import { formatCurrency } from "./format.js";
import { transactions } from "./transactions.js";

export default function overview() {
  updateIncome();
  document.addEventListener("axis:transactionchange", updateIncome);
  function updateIncome() {
    const incomeCard = document.querySelector(".card-incomes");
    let incomeTotal = 0;

    transactions.forEach((i) => {
      if (i.tipo === "income") {
        incomeTotal += i.valor;
      }
    });
    incomeCard.innerHTML = formatCurrency(incomeTotal);
    console.log(incomeTotal);
  }
}

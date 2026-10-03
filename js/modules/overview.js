import { formatCurrency } from "./format.js";
import { transactions } from "./transactions.js";

export function getTransactionsThisMonth() {
  const now = new Date();
  const today = now.toLocaleDateString("en-CA");
  const currentYearMonth = today.slice(0, 7);

  const transactionsThisMonth = transactions.filter((transaction) => {
    return transaction.data?.startsWith(currentYearMonth);
  });

  return transactionsThisMonth;
}

export default function overview() {
  updateOverview();
  document.addEventListener("axis:transactionchange", updateOverview);

  function updateOverview() {
    const incomesCard = document.querySelector(".card-incomes");
    const expensesCard = document.querySelector(".card-expenses");
    const accountTotalCard = document.querySelector(".card-accountTotal");
    const periodResultCard = document.querySelector(".card-periodResult");

    let incomeTotal = 0;
    let expenseTotal = 0;
    let monthExpenses = 0;
    let monthIncomes = 0;

    const transactionsThisMonth = getTransactionsThisMonth();

    transactions.forEach((i) => {
      if (i.tipo === "income") {
        incomeTotal += i.valor;
      } else if (i.tipo === "expense") {
        expenseTotal += i.valor;
      }
    });

    transactionsThisMonth.forEach((i) => {
      if (i.tipo === "income") {
        monthIncomes += i.valor;
      } else if (i.tipo === "expense") {
        monthExpenses += i.valor;
      }
    });

    const periodResult = monthIncomes - monthExpenses;
    const accountTotal = incomeTotal - expenseTotal;

    incomesCard.innerHTML = formatCurrency(monthIncomes);
    expensesCard.innerHTML = formatCurrency(monthExpenses);
    accountTotalCard.innerHTML = formatCurrency(accountTotal);
    periodResultCard.innerHTML = formatCurrency(periodResult);
  }
}

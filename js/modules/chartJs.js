import { getTransactionsThisMonth } from "./overview.js";
import { formatCurrency } from "./format.js";

const categoryMonthTotal = document.getElementById("category-month-total");

export default function chartJs() {
  const superficie = document.getElementById("category-doughnut");

  const categoryExpenseChart = new Chart(superficie, {
    type: "doughnut",
    options: {
      cutout: "60%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
    data: {
      labels: [
        "Investimentos",
        "Conhecimento",
        "Custos Fixos",
        "Conforto",
        "Metas",
        "Prazeres",
      ],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#6d28d9",
            "#c2410c",
            "#b91c1c",
            "#92400e",
            "#334155",
            "#85465c",
          ],
        },
      ],
    },
  });
  document.addEventListener("axis:transactionchange", updateDonut);

  function updateDonut() {
    const transactionsThisMonth = getTransactionsThisMonth();

    const expensesThisMonth = transactionsThisMonth.filter((transactions) => {
      return transactions.tipo === "expense";
    });

    const totalExpenses = expensesThisMonth.reduce((total, transaction) => {
      return total + transaction.valor;
    }, 0);

    categoryMonthTotal.textContent = formatCurrency(totalExpenses);

    const totalsByCategory = {
      investimentos: 0,
      conhecimento: 0,
      custosFixos: 0,
      conforto: 0,
      metas: 0,
      prazeres: 0,
    };

    expensesThisMonth.forEach((i) => {
      const category = i.categoria;

      if (totalsByCategory[category] !== undefined) {
        totalsByCategory[category] += i.valor;
      }
    });

    categoryExpenseChart.data.datasets[0].data = [
      totalsByCategory.investimentos,
      totalsByCategory.conhecimento,
      totalsByCategory.custosFixos,
      totalsByCategory.conforto,
      totalsByCategory.metas,
      totalsByCategory.prazeres,
    ];

    categoryExpenseChart.update();

    console.log(expensesThisMonth);
  }
  updateDonut();
}

import { getTransactionsThisMonth } from "./overview.js";
import { formatCurrency } from "./format.js";

const categoryMonthTotal = document.getElementById("category-month-total");

export default function chartJs() {
  const selector = document.querySelector(".category-type-selector");
  const typeButtons = document.querySelectorAll(".category-type-button");

  typeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      selector.dataset.selected = btn.dataset.type;

      typeButtons.forEach((typeButton) => {
        const isSelected = typeButton === btn;
        typeButton.setAttribute("aria-pressed", String(isSelected));
      });
      updateDonut();
    });
  });

  const superficie = document.getElementById("category-doughnut");

  const categoryChart = new Chart(superficie, {
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
    const selected = selector.dataset.selected;

    const selectedTransactionsThisMonth = transactionsThisMonth.filter(
      (transactions) => {
        return transactions.tipo === selected;
      },
    );

    const selectedTotal = selectedTransactionsThisMonth.reduce(
      (total, transaction) => {
        return total + transaction.valor;
      },
      0,
    );

    categoryMonthTotal.textContent = formatCurrency(selectedTotal);

    let totalsByCategory;

    if (selected === "expense") {
      totalsByCategory = {
        investimentos: 0,
        conhecimento: 0,
        custosFixos: 0,
        conforto: 0,
        metas: 0,
        prazeres: 0,
      };
    } else {
      totalsByCategory = {
        salario: 0,
        rendaExtra: 0,
      };
    }

    selectedTransactionsThisMonth.forEach((i) => {
      const category = i.categoria;

      if (totalsByCategory[category] !== undefined) {
        totalsByCategory[category] += i.valor;
      }
    });

    if (selected === "expense") {
      categoryChart.data.labels = [
        "Investimentos",
        "Conhecimento",
        "Custos Fixos",
        "Conforto",
        "Metas",
        "Prazeres",
      ];

      categoryChart.data.datasets[0].data = [
        totalsByCategory.investimentos,
        totalsByCategory.conhecimento,
        totalsByCategory.custosFixos,
        totalsByCategory.conforto,
        totalsByCategory.metas,
        totalsByCategory.prazeres,
      ];

      categoryChart.data.datasets[0].backgroundColor = [
        "#6d28d9",
        "#c2410c",
        "#b91c1c",
        "#92400e",
        "#334155",
        "#85465c",
      ];
    } else {
      categoryChart.data.labels = ["Salário", "Renda Extra"];

      categoryChart.data.datasets[0].data = [
        totalsByCategory.salario,
        totalsByCategory.rendaExtra,
      ];

      categoryChart.data.datasets[0].backgroundColor = ["#166534", "#1d4ed8"];
    }

    categoryChart.update();
  }
  updateDonut();
}

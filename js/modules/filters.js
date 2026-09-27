import { transactions } from "./transactions.js";

export default function filters(showFunc) {
  const filterBtns = document.querySelectorAll("[data-dropdown] .filter-btn");

  filterBtns.forEach((e) => {
    e.addEventListener("click", activeBtn);
  });

  function activeBtn(event) {
    // Encontra o menu associado ao botão clicado
    const currentDropdown = this.closest("li").querySelector(".dropdown-menu");
    removeActive(currentDropdown);

    //pega o valor do  data-dropdown da categoria de filtro clicado (tipo, categoria ou período)
    const targetId = this.dataset.target;

    //busca a ul (dropdown menu) com ID identico ao targetID
    const dropdown = document.getElementById(targetId);

    dropdown.classList.toggle("active");
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-dropdown]")) {
      removeActive();
    }
  });

  function removeActive(cDropdown = null) {
    // Busca TODOS os dropdowns da página
    const allDropdowns = document.querySelectorAll(".dropdown-menu");
    allDropdowns.forEach((dropdown) => {
      if (dropdown !== cDropdown) {
        dropdown.classList.remove("active");
      }
    });
  }

  const typeCheckboxes = document.querySelectorAll(".typeCheckbox");
  const categoryCheckboxes = document.querySelectorAll(".categoryCheckbox");
  const allCategoryCheckbox = document.querySelector(
    '[data-categoryfilter="all"]'
  );
  const individualCategoryCheckboxes = document.querySelectorAll(
    '.categoryCheckbox:not([data-categoryfilter="all"])'
  );

  const periodRadios = document.querySelectorAll(".periodRadio");

  typeCheckboxes.forEach((checkBox) => {
    checkBox.addEventListener("change", applyFilters);
  });

  categoryCheckboxes.forEach((checkBox) => {
    checkBox.addEventListener("change", handleCategoryChange);
  });

  periodRadios.forEach((radio) => {
    radio.addEventListener("change", applyFilters);
  });

  function handleCategoryChange(event) {
    const changed = event.target;

    // Se clicou no checkbox "Todos"
    if (changed === allCategoryCheckbox) {
      individualCategoryCheckboxes.forEach((cb) => {
        cb.checked = allCategoryCheckbox.checked;
      });
    } else {
      // Se clicou em um individual, sincroniza o "Todos"
      const allChecked = Array.from(individualCategoryCheckboxes).every(
        (cb) => cb.checked
      );

      allCategoryCheckbox.checked = allChecked;
    }

    applyFilters();
  }

  function applyFilters() {
    // 1. Tipos selecionados (Entradas / Saídas)
    const operacoes = [];
    typeCheckboxes.forEach((cb) => {
      if (cb.checked) {
        operacoes.push(cb.dataset.typefilter);
      }
    });

    // 2. Categorias selecionadas
    const categoriasSelecionadas = [];
    individualCategoryCheckboxes.forEach((cb) => {
      if (cb.checked) {
        categoriasSelecionadas.push(cb.dataset.categoryfilter);
      }
    });

    // 3. Período selecionado (Todos / Hoje / Este mês)
    const selectedPeriod =
      document.querySelector(".periodRadio:checked")?.dataset.periodfilter ||
      "all";

    const today = new Date().toLocaleDateString("en-CA");
    const currentYearMonth = today.slice(0, 7);

    // Filtra cruzando tipo, categoria E período
    const filtered = transactions.filter((transaction) => {
      const matchTipo = operacoes.includes(transaction.tipo);
      const matchCategoria = categoriasSelecionadas.includes(
        transaction.categoria
      );

      let matchPeriodo = true;
      if (selectedPeriod === "today") {
        matchPeriodo = transaction.data === today;
      } else if (selectedPeriod === "thisMonth") {
        matchPeriodo =
          transaction.data && transaction.data.startsWith(currentYearMonth);
      }

      return matchTipo && matchCategoria && matchPeriodo;
    });

    showFunc(filtered);
  }
}

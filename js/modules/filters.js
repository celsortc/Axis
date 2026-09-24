import { transactions } from "./transactions.js";

export default function filters() {
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

  typeCheckboxes.forEach((checkBox) => {
    checkBox.addEventListener("change", filterTransactions);
  });

  // filterTypeOptions.forEach((option) => {
  //   option.addEventListener("click", () => {
  //     filterTransactions(option.dataset.typeFilter);
  //     console.log(option.dataset.typeFilter);
  //   });
  // });

  function filterTransactions(event) {
    const typeCheckboxes = document.querySelectorAll(".typeCheckbox");
    const operacoes = [];
    typeCheckboxes.forEach((cb) => {
      if (cb.checked === true) {
        operacoes.push(cb.dataset.typefilter);
      }
    });
    console.log(operacoes);

    const checkbox = event.currentTarget;

    // console.log(checkbox.dataset.typefilter);
    // console.log(checkbox.checked);

    // const filtered = transactions.filter((transaction) => {
    //   return transaction.tipo === type;
    // });
    // console.log("qqisso:", filtered);
  }
}

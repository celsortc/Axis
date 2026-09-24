import { transactions } from "./transactions.js";

export default function filters(showData) {
  const filterBtns = document.querySelectorAll("[data-dropdown] .filter-btn");
  const typeCheckboxes = document.querySelectorAll(".typeCheckbox");

  filterBtns.forEach((e) => {
    e.addEventListener("click", activeBtn);
  });

  typeCheckboxes.forEach((checkBox) => {
    checkBox.addEventListener("change", filterTransactions);
  });

  function activeBtn(event) {
    const currentDropdown = this.closest("li").querySelector(".dropdown-menu");
    removeActive(currentDropdown);

    const targetId = this.dataset.target;
    const dropdown = document.getElementById(targetId);

    dropdown.classList.toggle("active");
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-dropdown]")) {
      removeActive();
    }
  });

  function removeActive(cDropdown = null) {
    const allDropdowns = document.querySelectorAll(".dropdown-menu");

    allDropdowns.forEach((dropdown) => {
      if (dropdown !== cDropdown) {
        dropdown.classList.remove("active");
      }
    });
  }

  function filterTransactions() {
    const selectedTypes = [...typeCheckboxes]
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.dataset.typefilter);

    const filtered = transactions.filter((transaction) =>
      selectedTypes.includes(transaction.tipo),
    );

    showData(filtered);
  }
}

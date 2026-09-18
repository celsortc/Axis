import { transactions } from "./transactions.js";

export default function filters() {
  const filtersLabel = document.querySelectorAll(".filters [data-dropdown]");

  filtersLabel.forEach((e) => {
    console.log(e);

    e.addEventListener("click", activeBtn);
  });

  function activeBtn(event) {
    console.log(event.target.classList.contains("labelDropdown"));

    //Verifica se o click foi na checkbox
    if (event.target.closest(".dropdown-menu")) {
      return;
    }

    const currentFilter = event.currentTarget;

    currentFilter.classList.toggle("active");
  }

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-dropdown")) {
      removeActive();
    }
  });

  function removeActive(cFilter = null) {
    filtersLabel.forEach((btn) => {
      if (btn !== cFilter) {
        btn.classList.remove("active");
      }
    });
  }
}

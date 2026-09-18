export default function filters() {
  const filters = document.querySelectorAll(".filters [data-dropdown]");

  filters.forEach((e) => {
    console.log(e);

    e.addEventListener("click", activeBtn);
  });

  function activeBtn(event) {
    const currentFilterSpan = event.currentTarget;

    filters.forEach((btn) => {
      if (btn !== currentFilterSpan) {
        btn.classList.remove("active");
      }
    });
    event.currentTarget.classList.toggle("active");
  }
}

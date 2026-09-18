export default function filters() {
  const filters = document.querySelectorAll(".filters li");

  console.log(filters);

  filters.forEach((e) => {
    console.log(e);

    e.addEventListener("click", activeBtn);
  });

  function activeBtn(event) {
    event.currentTarget.classList.toggle("active");
  }
}

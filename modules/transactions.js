export default function transactions() {
  const btnLancamento = document.querySelector(".btn-lancamento");
  const btnCadastro = document.querySelector(".btn-cadastro");
  const forms = document.querySelector(".formulario-transactions");

  btnLancamento.addEventListener("click", showForm);

  function showForm() {
    btnLancamento.classList.add("active");
    forms.classList.add("active");
  }
}

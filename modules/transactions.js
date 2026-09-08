export default function transactions() {
  const btnLancamento = document.querySelector(".btn-lancamento");
  const btnCadastro = document.querySelector(".btn-cadastro");
  const forms = document.querySelector(".formulario-transactions");
  const transactionList = document.querySelector(".transactions-list");
  const transactions = [];

  btnLancamento.addEventListener("click", showForm);
  btnCadastro.addEventListener("click", (e) => {
    saveData(e);
  });

  function showForm() {
    btnLancamento.classList.add("active");
    forms.classList.add("active");
  }

  function saveData(e) {
    e.preventDefault();
    const formsDescricao = document.getElementById("descricao-forms").value;
    const formsCategoria = document.getElementById("categorias-forms").value;
    const formsValor = document.getElementById("valor-forms").value;

    const novaTransacao = {
      descricao: formsDescricao,
      categoria: formsCategoria,
      valor: formsValor,
    };

    const li = document.createElement("li");
    const spanDescricao = document.createElement("span");
    spanDescricao.innerText = formsDescricao;
    spanDescricao.classList.add("transaction-title");

    const spanCategoria = document.createElement("span");
    spanCategoria.innerText = formsCategoria;
    spanCategoria.classList.add("transaction-category");

    const spanSymbol = document.createElement("span");
    if (spanCategoria !== "Salário") {
      spanSymbol.innerText = "-";
      spanSymbol.classList.add("expense");
    }

    const spanValor = document.createElement("span");
    spanValor.appendChild(spanSymbol);
    spanValor.innerText += ` R$ ${formsValor},00`;
    spanValor.classList.add("transaction-value");

    const elementos = [spanDescricao, spanCategoria, spanValor];
    elementos.forEach((elemento) => {
      li.appendChild(elemento);
    });

    li.classList.add("transaction-item");
    transactionList.appendChild(li);

    console.log(novaTransacao);
  }
}

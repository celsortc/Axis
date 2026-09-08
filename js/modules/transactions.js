const transactions = [];

export default function transactionsTab() {
  const btnLancamento = document.querySelector(".btn-lancamento");
  const btnSalvar = document.querySelector(".btn-salvar");
  const forms = document.querySelector(".formulario-transactions");
  const transactionList = document.querySelector(".transactions-list");
  let idNow = 0;

  btnLancamento.addEventListener("click", showForm);
  btnSalvar.addEventListener("click", (e) => {
    saveData(e);
  });

  function showForm() {
    updateCategory();
    todayDate();
    btnLancamento.classList.add("active");
    forms.classList.add("active");
    document
      .getElementById("tipo-forms")
      .addEventListener("change", updateCategory);
  }

  function saveData(e) {
    e.preventDefault();
    const formsDescricao = document.getElementById("descricao-forms").value;
    const formsCategoria = document.getElementById("categorias-forms").value;
    const formsValor = document.getElementById("valor-forms").value;
    const formsData = document.getElementById("data-forms").value;
    const formsTipo = document.getElementById("tipo-forms").value;
    let symbol;

    if (formsTipo !== "income") {
      symbol = "-";
    } else symbol = "+";
    idNow += 1;
    const novaTransacao = {
      id: idNow,
      tipo: formsTipo,
      descricao: formsDescricao,
      categoria: formsCategoria,
      valor: +formsValor,
      op: symbol,
      data: formsData,
    };

    transactions.push(novaTransacao);
    showData();
    forms.reset();
    updateCategory();
    todayDate();
  }

  function showData(symbolClass) {
    console.log(transactions);

    transactionList.innerHTML = "";

    transactions.forEach((transaction) => {
      const li = document.createElement("li");
      li.classList.add("transaction-item");

      li.innerHTML = `
      <span class="transaction-title">${transaction.descricao}</span>
      <span class="transaction-category">${transaction.categoria}</span>
      <span class="transaction-value"><span class="${transaction.tipo}">${transaction.op}\t</span>${transaction.valor}</span>
      `;

      transactionList.appendChild(li);
    });
  }

  function updateCategory() {
    const tipo = document.getElementById("tipo-forms").value;
    //Categorys select
    const CategorySelect = document.getElementById("categorias-forms");
    console.log(tipo);
    const options = CategorySelect.querySelectorAll("option[data-type]");

    options.forEach((opt) => {
      if (opt.dataset.type === tipo) {
        opt.hidden = false;
        opt.disabled = false;
      } else {
        opt.hidden = true;
        opt.disabled = true;
      }
    });
  }

  function todayDate() {
    const todayInput = document.querySelector("input[data-today]");

    const today = new Date().toISOString().split("T")[0];

    todayInput.value = today;
  }
}

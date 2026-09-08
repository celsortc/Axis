export default function transactions() {
  const btnLancamento = document.querySelector(".btn-lancamento");
  const btnSalvar = document.querySelector(".btn-salvar");
  const forms = document.querySelector(".formulario-transactions");
  const transactionList = document.querySelector(".transactions-list");
  const transactions = [];

  btnLancamento.addEventListener("click", showForm);
  btnSalvar.addEventListener("click", (e) => {
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
    const formsData = document.getElementById("data-forms").value;
    let symbol;
    let symbolClass;

    if (formsCategoria !== "salario") {
      symbol = "-";
    } else symbol = "+";
    const tipoTransacao = symbol === "-" ? "expense" : "income";

    const novaTransacao = {
      descricao: formsDescricao,
      categoria: formsCategoria,
      valor: formsValor,
      op: symbol,
      tipo: tipoTransacao,
      data: formsData,
    };
    console.log(typeof +(novaTransacao.op + novaTransacao.valor));

    transactions.push(novaTransacao);
    showData();
    forms.reset();
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

    // const li = document.createElement("li");
    // const spanDescricao = document.createElement("span");
    // spanDescricao.innerText = newTransaction.descricao;
    // spanDescricao.classList.add("transaction-title");

    // const spanCategoria = document.createElement("span");
    // spanCategoria.innerText = newTransaction.categoria;
    // spanCategoria.classList.add("transaction-category");

    // const spanValor = document.createElement("span");
    // spanValor.appendChild(spanSymbol);
    // spanValor.innerText += ` R$ ${newTransaction.valor},00`;
    // spanValor.classList.add("transaction-value");

    // const elementos = [spanDescricao, spanCategoria, spanValor];
    // elementos.forEach((elemento) => {
    //   li.appendChild(elemento);
    // });

    // li.classList.add("transaction-item");
    // transactionList.appendChild(li);
  }
}

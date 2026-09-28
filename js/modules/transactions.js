import { cleanDate, formatCurrency } from "./format.js";
import { loadTransactions, saveTransactions } from "./storage.js";

// Inicializa o array com o que estiver salvo no localStorage
const transactions = loadTransactions();

export { transactions };

export default function transactionsTab() {
  const btnLancamento = document.querySelector(".btn-lancamento");
  const btnSalvar = document.querySelector(".btn-salvar");
  const forms = document.querySelector(".formulario-transactions");
  const transactionList = document.querySelector(".transactions-list");

  // Garante que o próximo ID seja maior que qualquer ID já existente
  let idNow = transactions.reduce((max, t) => Math.max(max, t.id ?? 0), 0);

  btnLancamento.addEventListener("click", showForm);
  btnSalvar.addEventListener("click", (e) => {
    saveData(e);
  });

  function showForm() {
    updateCategory();
    const dataInput = document.getElementById("data-forms");
    if (!dataInput.value) {
      todayDate();
    }
    btnLancamento.classList.add("active");
    forms.classList.add("active");
    document
      .getElementById("tipo-forms")
      .addEventListener("change", updateCategory);
  }

  const formsCategoria = document.getElementById("categorias-forms");

  function saveData(e) {
    e.preventDefault();
    const formsDescricao = document.getElementById("descricao-forms").value;
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
      categoria: formsCategoria.value,
      valor: +formsValor,
      op: symbol,
      data: formsData,
    };

    transactions.push(novaTransacao);
    saveTransactions(transactions);
    // Avisa o módulo de filtros para re-renderizar com os filtros ativos
    document.dispatchEvent(new CustomEvent("axis:transactionchange"));
    forms.reset();
    document.getElementById("data-forms").value = formsData;
    updateCategory();
  }

  //Função que agrupa as transações por data
  function organizeTransactionsByDate(data) {
    const groupedByDate = Object.groupBy(data, (item) => item.data);
    return groupedByDate;
  }

  const categoriasFormatadas = {
    salario: "Salário",
    rendaExtra: "Renda Extra",
    custosFixos: "Custos Fixos",
    investimentos: "Investimentos",
    conforto: "Conforto",
    metas: "Metas",
    prazeres: "Prazeres",
    conhecimento: "Conhecimento",
  };

  function showData(data = transactions) {
    transactionList.innerHTML = "";

    //Percorre o a array, define a primeira chave como date e mostra transactions
    //organizados por data
    const groupedByDate = organizeTransactionsByDate(data);

    Object.entries(groupedByDate)
      //destructuring o object.entries
      //organiza as transações pela data (primeiro valor do array)
      .sort(([dateA], [dateB]) => {
        return new Date(dateB) - new Date(dateA);
      })
      .forEach(([date, transactions]) => {
        const datesShow = document.createElement("span");
        datesShow.classList.add("transaction-date");
        datesShow.innerText = cleanDate(date);
        transactionList.appendChild(datesShow);

        transactions.forEach((i) => {
          const nomeCategoria =
            categoriasFormatadas[i.categoria] || i.categoria;

          const li = document.createElement("li");
          li.classList.add("transaction-item");
          li.dataset.id = i.id;

          li.innerHTML = `
            <div class="transaction-info">
              <span class="transaction-title">${i.descricao}</span>
              <span class="transaction-category-badge">${nomeCategoria}</span>
            </div>
            <div class="transaction-actions-container">
              <span class="transaction-value ${i.tipo}">
                <span class="transaction-sign">${i.op}</span> ${formatCurrency(i.valor)}
              </span>
              <div class="transaction-menu-wrapper" data-action-menu>
                <button class="btn-more-options" type="button" aria-label="Opções da transação" title="Mais opções">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="12" cy="19" r="2"></circle>
                  </svg>
                </button>
                <div class="action-dropdown-menu">
                  <button class="action-btn edit-btn" type="button">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <span>Editar</span>
                  </button>
                  <button class="action-btn delete-btn" type="button">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            </div>
          `;

          // Conecta o botão excluir à função de deleção
          li.querySelector(".delete-btn").addEventListener("click", () => {
            deleteTransaction(i.id);
          });

          transactionList.appendChild(li);
        });
      });
  }

  // Gerenciador de clique para abrir/fechar o menu de 3 pontinhos
  document.addEventListener("click", (e) => {
    const btnMore = e.target.closest(".btn-more-options");
    const activeMenu = document.querySelector(".action-dropdown-menu.active");

    if (btnMore) {
      const menuWrapper = btnMore.closest("[data-action-menu]");
      const menu = menuWrapper.querySelector(".action-dropdown-menu");

      //Verifica se outro menu de outra transação está aberto.
      if (activeMenu && activeMenu !== menu) {
        activeMenu.classList.remove("active");
      }
      menu.classList.toggle("active");
      return;
    }

    if (activeMenu && !e.target.closest("[data-action-menu]")) {
      activeMenu.classList.remove("active");
    }
  });

  function updateCategory() {
    const tipo = document.getElementById("tipo-forms").value;
    //Categorys select
    const CategorySelect = document.getElementById("categorias-forms");
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

    CategorySelect.value = "";
  }

  // Função auxiliar para exibir a data atual no placeholder do formulário
  function todayDate() {
    const todayInput = document.querySelector("input[data-today]");

    const today = new Date().toLocaleDateString("en-CA");

    todayInput.value = today;
  }

  /**
   * Remove uma transação pelo ID, persiste e re-renderiza.
   * @param {number} id
   */
  function deleteTransaction(id) {
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) return;
    transactions.splice(index, 1);
    saveTransactions(transactions);
    // Avisa o módulo de filtros para re-renderizar com os filtros ativos
    document.dispatchEvent(new CustomEvent("axis:transactionchange"));
  }

  return showData;
}

const STORAGE_KEY = "axis_transactions";

/**
 * Carrega as transações salvas no localStorage.
 * Retorna um array vazio caso não haja dados.
 */
export function loadTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    console.warn("Axis: falha ao carregar dados do localStorage.");
    return [];
  }
}

/**
 * Persiste o array de transações no localStorage.
 * @param {Array} transactions
 */
export function saveTransactions(transactions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    console.warn("Axis: falha ao salvar dados no localStorage.");
  }
}

/**
 * Remove todas as transações do localStorage.
 */
export function clearTransactions() {
  localStorage.removeItem(STORAGE_KEY);
}

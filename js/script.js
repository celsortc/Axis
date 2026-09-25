import nav from "./modules/nav.js";
import transactionsTab from "./modules/transactions.js";
import filters from "./modules/filters.js";

nav();
const show = transactionsTab();
console.log(show);

filters(show);

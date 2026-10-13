import nav from "./modules/nav.js";
import transactionsTab from "./modules/transactions.js";
import filters from "./modules/filters.js";
import overview from "./modules/overview.js";
import chartJs from "./modules/chartJs.js";

nav();
const show = transactionsTab();

filters(show);
overview();
chartJs();

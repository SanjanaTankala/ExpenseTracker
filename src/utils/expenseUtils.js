// // Get all expenses for a user, year, and month
// export function getExpenses(mobile, year, month) {
//   const all = JSON.parse(localStorage.getItem("expenses") || "{}");
//   return all[mobile]?.[year]?.[month] || [];
// }

// // Add an expense for a user, year, and month
// export function addExpense(mobile, year, month, expense) {
//   const all = JSON.parse(localStorage.getItem("expenses") || "{}");
//   if (!all[mobile]) all[mobile] = {};
//   if (!all[mobile][year]) all[mobile][year] = {};
//   if (!all[mobile][year][month]) all[mobile][year][month] = [];
//   all[mobile][year][month].push(expense);
//   localStorage.setItem("expenses", JSON.stringify(all));
// }

// // Get budget for a user, year, and month
// export function getBudget(mobile, year, month) {
//   const all = JSON.parse(localStorage.getItem("budgets") || "{}");
//   return all[mobile]?.[year]?.[month] ?? "";
// }

// // Set budget for a user, year, and month
// export function setBudget(mobile, year, month, budget) {
//   const all = JSON.parse(localStorage.getItem("budgets") || "{}");
//   if (!all[mobile]) all[mobile] = {};
//   if (!all[mobile][year]) all[mobile][year] = {};
//   all[mobile][year][month] = Number(budget);
//   localStorage.setItem("budgets", JSON.stringify(all));
// }
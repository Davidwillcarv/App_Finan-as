export let expenses = [
  { id: 1, title: 'Aluguel', amount: 1200 },
  { id: 2, title: 'Mercado', amount: 450 }
]

export let incomes = [
  { id: 1, title: 'Salário', amount: 3000 }
]

export function addExpense(expense) {
  expenses.push(expense)
}

export function addIncome(income) {
  incomes.push(income)
}

import { createContext, useContext, useEffect, useState } from 'react'

const FinanceContext = createContext()

const DEFAULT_STATE = {
  expenses: [],
  incomes: [],
  limit: 0,
  categoryLimits: {},
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  currency: 'BRL'
}

export function FinanceProvider({ children }) {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('finance-data')
    return saved ? JSON.parse(saved) : DEFAULT_STATE
  })

  useEffect(() => {
    localStorage.setItem('finance-data', JSON.stringify(data))
  }, [data])

  function addExpense(expense) {
    setData(prev => ({ ...prev, expenses: [...prev.expenses, expense] }))
  }

  function addIncome(income) {
    setData(prev => ({ ...prev, incomes: [...prev.incomes, income] }))
  }

  function setLimit(limit) {
    setData(prev => ({ ...prev, limit }))
  }

  function setCategoryLimit(category, value) {
    setData(prev => ({
      ...prev,
      categoryLimits: {
        ...prev.categoryLimits,
        [category]: value
      }
    }))
  }

  function setPeriod(month, year) {
    setData(prev => ({ ...prev, month, year }))
  }

  function setCurrency(currency) {
    setData(prev => ({ ...prev, currency }))
  }

  return (
    <FinanceContext.Provider
      value={{
        ...data,
        addExpense,
        addIncome,
        setLimit,
        setCategoryLimit,
        setPeriod,
        setCurrency
      }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  return useContext(FinanceContext)
}

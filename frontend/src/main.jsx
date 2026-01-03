import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { FinanceProvider } from './context/FinanceContext'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <UserProvider>
      <FinanceProvider>
        <App />
      </FinanceProvider>
    </UserProvider>
  </ThemeProvider>
)

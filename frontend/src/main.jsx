import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Certifique-se que este arquivo tem o seu CSS global

// Importando os provedores de estilo que você tinha antes
import { FinanceProvider } from './context/FinanceContext'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> 
      <UserProvider>
        <FinanceProvider>
          <App />
        </FinanceProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
)
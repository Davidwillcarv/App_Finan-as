import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  Settings,
  LogOut,
  X
} from 'lucide-react'
import './Sidebar.css'

export default function Sidebar({ open, onClose }) {
  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1>Finance App</h1>
        <button className="close-btn" onClick={onClose}>
          <X />
        </button>
      </div>

      <nav className="menu" onClick={onClose}>
        <NavLink to="/dashboard">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/expenses">
          <Wallet size={18} />
          <span>Despesas</span>
        </NavLink>

        <NavLink to="/income">
          <TrendingUp size={18} />
          <span>Receitas</span>
        </NavLink>

        <NavLink to="/settings">
          <Settings size={18} />
          <span>Configurações</span>
        </NavLink>
      </nav>

      <button className="logout" onClick={logout}>
        <LogOut size={18} />
        <span>Sair</span>
      </button>
    </aside>
  )
}

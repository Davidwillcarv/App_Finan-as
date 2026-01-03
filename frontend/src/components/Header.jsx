import { Menu, LogOut } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useUser } from '../context/UserContext'
import './Header.css'

export default function Header({ onMenuClick }) {
  const { theme, setTheme } = useTheme()
  const { user } = useUser()

  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <header className="header">
      {/* BOTÃO MENU — MOBILE */}
      <button
  className="icon-btn menu-btn strong"
  onClick={onMenuClick}
  aria-label="Abrir menu"
>
  <Menu size={26} />
</button>

      {/* TÍTULO / USUÁRIO */}
      <div className="header-center">
        <span className="username">{user.name}</span>
      </div>

      {/* AÇÕES */}
      <div className="header-right">
       

        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <button className="Logout-btn" onClick={logout} aria-label="Sair">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}

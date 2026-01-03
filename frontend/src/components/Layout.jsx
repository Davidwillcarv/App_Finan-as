import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import './Layout.css'

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app-layout">
      {/* OVERLAY (mobile) */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}

      {/* SIDEBAR */}
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* CONTEÚDO */}
      <div className="content">
        <Header onMenuClick={() => setMenuOpen(true)} />
        <main>{children}</main>
      </div>
    </div>
  )
}

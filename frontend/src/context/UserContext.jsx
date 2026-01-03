import { createContext, useContext } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const user = {
    name: 'Administrador',
    email: 'admin@teste.com'
  }

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

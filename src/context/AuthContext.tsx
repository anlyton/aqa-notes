import { createContext, useContext, useState, useEffect } from 'react'

type User = {
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

// Demo credentials — this is a portfolio app with no real backend.
// In a real app, authentication would be handled server-side.
const VALID_CREDENTIALS = [
  { email: 'admin@aqa.dev', password: 'aqa2024', name: 'Admin' },
  { email: 'qa@aqa.dev',    password: 'test1234', name: 'QA Engineer' },
]

const STORAGE_KEY = 'aqa_user'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = (email: string, password: string): boolean => {
    const match = VALID_CREDENTIALS.find(
      c => c.email === email.trim().toLowerCase() && c.password === password
    )
    if (match) {
      setUser({ email: match.email, name: match.name })
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

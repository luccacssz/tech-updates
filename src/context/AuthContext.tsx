'use client'

import { auth, provider } from '@/lib/fireBaseConfig'
import {
  Auth,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: User | null
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!auth) return // Garante que auth está definido antes de usar

    const unsubscribe = onAuthStateChanged(auth as Auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const loginWithGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' })

      if (!auth) throw new Error('Firebase auth is not initialized')

      const result = await signInWithPopup(auth, provider)
      setUser(result.user)

      if (result.user) {
        router.push('/')
      }
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error)
    }
  }

  const logout = async () => {
    if (!auth) return
    await signOut(auth)
    setUser(null)
    router.push('/signin')
  }

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

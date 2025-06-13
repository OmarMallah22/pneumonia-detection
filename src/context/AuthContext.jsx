import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../api/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('auth_token'))

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('auth_token')
      if (storedToken) {
        try {
          // Verify token and get user info
          const userData = await authAPI.getCurrentUser()
          setUser(userData)
          setToken(storedToken)
        } catch (error) {
          console.error('Token verification failed:', error)
          localStorage.removeItem('auth_token')
          setToken(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password)
      const { token: newToken, user: userData } = response
      
      localStorage.setItem('auth_token', newToken)
      setToken(newToken)
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please try again.' 
      }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await authAPI.register(name, email, password)
      const { token: newToken, user: userData } = response
      
      localStorage.setItem('auth_token', newToken)
      setToken(newToken)
      setUser(userData)
      
      return { success: true }
    } catch (error) {
      console.error('Registration failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed. Please try again.' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
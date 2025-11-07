import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  user: null,
  hydrated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('speedtrust-user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored user', error);
      }
    }
    setHydrated(true);
  }, []);

  const login = (userData) => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('speedtrust-user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('speedtrust-user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, hydrated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

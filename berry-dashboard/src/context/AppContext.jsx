import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
const Ctx = createContext();
export const useApp = () => useContext(Ctx);
// DEMO ONLY: not real authentication.
export const DEMO = { email: 'admin@berry.demo', password: 'demo1234' };
export function AppProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  useEffect(() => localStorage.setItem('mode', mode), [mode]);
  const login = (email, password) => {
    if (email === DEMO.email && password === DEMO.password) {
      const u = { name: 'Alex Morgan', email, role: 'Administrator' };
      setUser(u); localStorage.setItem('user', JSON.stringify(u)); return true;
    }
    return false;
  };
  const logout = () => { setUser(null); localStorage.removeItem('user'); };
  const toggleMode = () => setMode(m => (m === 'light' ? 'dark' : 'light'));
  const theme = useMemo(() => createTheme({
    palette: { mode, primary: { main: '#5e35b1', light: '#ede7f6' }, secondary: { main: '#2196f3' },
      background: mode === 'light' ? { default: '#eef2f6', paper: '#fff' } : { default: '#111936', paper: '#1a223f' } },
    shape: { borderRadius: 12 }, typography: { fontFamily: 'Roboto, sans-serif' },
  }), [mode]);
  return (
    <Ctx.Provider value={{ mode, toggleMode, user, login, logout }}>
      <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>
    </Ctx.Provider>
  );
}

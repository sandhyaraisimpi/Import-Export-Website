import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // restore login session on reload
  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (session) setUser(JSON.parse(session));
  }, []);

  // SIGNUP (create account)
  const signup = (data) => {
    localStorage.setItem("admin_account", JSON.stringify(data));
    localStorage.setItem("admin_session", JSON.stringify(data));
    setUser(data);
  };

  // LOGIN (use existing account)
  const login = (email, password) => {
    const account = JSON.parse(localStorage.getItem("admin_account"));

    if (!account) return "NO_ACCOUNT";

    if (account.email === email && account.password === password) {
      localStorage.setItem("admin_session", JSON.stringify(account));
      setUser(account);
      return "SUCCESS";
    }

    return "INVALID";
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("admin_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

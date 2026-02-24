
import { createContext, useContext, useState, useEffect } from "react";
import { postService, getService } from "../service/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // restore login session on reload
  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    if (session) setUser(JSON.parse(session));
  }, []);


  // SIGNUP (create admin account via backend)
  const signup = async (data) => {
    const res = await postService("/admin/auth/signup", data);
    if (res.ok) {
      setUser(data); // Optionally fetch profile after signup
      return "SUCCESS";
    } else {
      return res.message || "Signup failed";
    }
  };

  // LOGIN (admin login via backend)
  const login = async (email, password) => {
    const res = await postService("/admin/auth/login", { email, password });
    if (res.ok && res.data?.data) {
      setUser(res.data.data);
      return "SUCCESS";
    } else if (res.message === "Admin not found") {
      return "NO_ACCOUNT";
    } else {
      return "INVALID";
    }
  };

  // FORGOT PASSWORD (admin)
  const forgotPassword = async (email) => {
    const res = await postService("/admin/auth/forgot-password", { email });
    return res.ok ? "SUCCESS" : res.message || "Failed";
  };

  // FETCH ADMIN PROFILE
  const fetchProfile = async () => {
    const res = await getService("/admin/auth/profile");
    if (res.ok && res.data?.data) {
      setUser(res.data.data);
      return res.data.data;
    }
    return null;
  };


  // LOGOUT
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, forgotPassword, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

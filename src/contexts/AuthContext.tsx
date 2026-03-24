import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => string | null;
  signup: (name: string, email: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const signup = (name: string, email: string, password: string): string | null => {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    if (users.find((u: any) => u.email === email)) return "Email already registered";
    users.push({ name, email, password });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    const authUser = { name, email };
    localStorage.setItem("currentUser", JSON.stringify(authUser));
    setUser(authUser);
    return null;
  };

  const login = (email: string, password: string): string | null => {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) return "Invalid email or password";
    const authUser = { name: found.name, email: found.email };
    localStorage.setItem("currentUser", JSON.stringify(authUser));
    setUser(authUser);
    return null;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

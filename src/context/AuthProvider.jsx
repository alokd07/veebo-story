import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../../config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setIsAdmin(false);
      return;
    }

    fetch(`${BASE_URL}admin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Admin Check Response:", data);
        if (data.error) {
          setError(data.error);
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      })
      .catch((err) => {
        console.error("Admin Check Failed:", err);
        setError(err.message);
        setIsAdmin(false);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ loading, error, token, isAdmin, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

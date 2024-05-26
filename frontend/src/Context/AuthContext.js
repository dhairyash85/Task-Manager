import React, { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(); // Export AuthContext here

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const accessToken = localStorage.getItem("token");
      if (accessToken) {
        try {
          const response = await axios.post("/verifyToken");
          if (!response.data.success) {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/signin");
          } else {
            setUser(response.data.user);
          }
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
    };
    init().catch((err) => {
      console.log(err);
    });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};

import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useMutation } from "react-query";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const loginMutation = useMutation((data) => axios.post("/auth/login", data));
  const logoutMutation = useMutation(() => axios.post("/auth/logout"));

  const login = async (data) => {
    const response = await loginMutation.mutateAsync(data);
    setCurrentUser(response.data);
  };

  const logout = async (data) => {
    await logoutMutation.mutateAsync(data);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser)); // save the response data to localStorage
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

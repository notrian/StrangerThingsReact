import { createContext, useEffect, useState } from "react";
import { getUser } from "../../api/users";

// Create the context
export const AuthContext = createContext();

// Create our Provider (warpper component)
const AuthProvider = ({ children }) => {
  // Where we want to store our token
  const [token, setToken] = useState(localStorage.getItem("token"));
  // User related data (username, etc)
  const [user, setUser] = useState({});
  // If the users token is set and authenticated
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Get user data everytime token is updated
  useEffect(() => {
    async function getMe() {
      localStorage.setItem("token", token);
      const response = await getUser(token);
      setUser(response.data);
      setIsLoggedIn(true);
    }
    if (token) getMe();
  }, [token]);

  // For storing multiple values
  const contextValue = {
    token,
    setToken,
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
  };
  // Passing child components into wrapper
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// authContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "http://localhost:5000";

  // ✅ Load user from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    // ✅ Fetch user from backend only if not already stored
    if (!currentUser) {
      axios.get(`${serverUrl}/api/auth/current-user`)
        .then(res => {
          setCurrentUser(res.data.user);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        })
        .catch(() => {
          setCurrentUser(null);
          localStorage.removeItem("user");
        });
    }
  }, []);

  // ✅ Sync localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <authDataContext.Provider value={{ serverUrl, currentUser, setCurrentUser }}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;

// AuthContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const fetchCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${serverUrl}/api/auth/current-user`);
      const user = response.data.user;
      if (user) {
        setAuthUser(user);
        localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        setAuthUser(null);
        localStorage.removeItem("authUser");
      }
      return user;
    } catch (err) {
      console.error("Auth fetch error:", err.message);
      setAuthUser(null);
      localStorage.removeItem("authUser");
      setError("Failed to fetch user data. Please check your connection or log in again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [serverUrl]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const logout = useCallback(async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
      setAuthUser(null);
      localStorage.removeItem("authUser");
      setError(null);
    } catch (err) {
      console.error("Logout error:", err.message);
      setError("Failed to log out. Please try again.");
    }
  }, [serverUrl]);

  // ✅ FIX: Create a single function to handle a successful login.
  // This function updates both the React state and localStorage.
  const handleLoginSuccess = (user) => {
    setAuthUser(user);
    localStorage.setItem("authUser", JSON.stringify(user));
  };


  const retryFetchUser = useCallback(() => {
    setError(null);
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <authDataContext.Provider
      value={{
        serverUrl,
        authUser,
        error,
        loading,
        fetchCurrentUser,
        logout,
        retryFetchUser,
        // ✅ FIX: Provide the new login handler instead of the raw `setAuthUser`.
        handleLoginSuccess,
      }}
    >
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
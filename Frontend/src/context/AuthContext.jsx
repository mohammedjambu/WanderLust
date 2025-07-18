import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const authDataContext = createContext();

function AuthProvider({ children }) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse authUser from localStorage", e);
      return null;
    }
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const updateAuthUser = useCallback((user) => {
    if (user) {
      setAuthUser(user);
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      setAuthUser(null);
      localStorage.removeItem("authUser");
    }
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    if (loading) setLoading(true);

    try {
      const response = await axios.get(`${serverUrl}/api/auth/current-user`);
      updateAuthUser(response.data.user);
    } catch (err) {
      console.error("Auth fetch error:", err.message);
      updateAuthUser(null);
      setError(
        "Failed to fetch user data. Please check your connection or log in again."
      );
    } finally {
      setLoading(false);
    }
  }, [serverUrl, updateAuthUser]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const logout = useCallback(async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`);
    } catch (err) {
      console.error("Logout API call failed:", err.message);
    } finally {
      updateAuthUser(null);
    }
  }, [serverUrl, updateAuthUser]);

  const handleLoginSuccess = useCallback(
    (loginResponseUser) => {
      updateAuthUser(loginResponseUser);
    },
    [updateAuthUser]
  );

  return (
    <authDataContext.Provider
      value={{
        serverUrl,
        authUser,
        error,
        loading,
        fetchCurrentUser,
        logout,
        handleLoginSuccess,
        updateAuthUser,
      }}
    >
      {children}
    </authDataContext.Provider>
  );
}

export default AuthProvider;

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import axios from "axios";

export const authDataContext = createContext();

export const useAuth = () => {
  return useContext(authDataContext);
};

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

  const updateAuthUser = useCallback((updatedUser) => {
    setAuthUser(updatedUser);
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
  }, []);

  const fetchCurrentUser = useCallback(async () => {
    if (loading) setLoading(true);

    try {
      const response = await axios.get(`${serverUrl}/api/auth/current-user`);
      const user = response.data.user;

      if (user) {
        setAuthUser(user);
        localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        setAuthUser(null);
        localStorage.removeItem("authUser");
      }
    } catch (err) {
      console.error("Auth fetch error:", err.message);
      setAuthUser(null);
      localStorage.removeItem("authUser");
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
      setAuthUser(null);
      localStorage.removeItem("authUser");
      setError(null);
    }
  }, [serverUrl]);

  const handleLoginSuccess = useCallback((loginResponseUser) => {
    updateAuthUser(loginResponseUser);
  }, [updateAuthUser]);

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
        handleLoginSuccess,
        updateAuthUser,
      }}
    >
      {children}
    </authDataContext.Provider>
  );
}

export default AuthProvider;

import React, { useState, useContext } from "react";
import "./Login.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");

  const [validationErrors, setValidationErrors] = useState({});

  const { serverUrl, handleLoginSuccess } = useContext(authDataContext);
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!username.trim()) errors.username = "Username is required.";
    if (!password) errors.password = "Password is required.";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );

      handleLoginSuccess(res.data.user);

      console.log("Login successful");
      toast.success("Login Successfully");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setApiError(
        err.response?.data?.error ||
          "Login failed. User does not exist or password is incorrect."
      );
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container animate">
        <h1 className="login-title">Login</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                name="username"
                id="username"
                type="text"
                className={`form-input ${
                  validationErrors.username ? "is-invalid" : ""
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* Display validation error */}
              {validationErrors.username && (
                <p className="form-error-validation">
                  {validationErrors.username}
                </p>
              )}
            </div>

            <div className="form-group password">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                name="password"
                id="password"
                type={show ? "text" : "password"}
                className={`form-input ${
                  validationErrors.password ? "is-invalid" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!show ? (
                <IoMdEye className="eye" onClick={() => setShow(true)} />
              ) : (
                <IoMdEyeOff className="eyeoff" onClick={() => setShow(false)} />
              )}
              {/* Display validation error */}
              {validationErrors.password && (
                <p className="form-error-validation">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {apiError && <p className="form-error-api">{apiError}</p>}

            <button type="submit" className="submit-button">
              Login
            </button>

            <p className="signup-prompt">
              Don't have an account?{" "}
              <span className="signup-link" onClick={() => navigate("/signup")}>
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

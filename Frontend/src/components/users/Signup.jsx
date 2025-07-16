import React, { useContext, useState } from "react";
import "../../utils css/SignUp.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { serverUrl, handleLoginSuccess } = useContext(authDataContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) errors.username = "Username is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

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
      const res = await axios.post(`${serverUrl}/api/auth/signup`, formData, {
        withCredentials: true,
      });

      handleLoginSuccess(res.data.user);

      toast.success("Signup Successful");
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setApiError(
        err.response?.data?.message ||
          "Signup failed. The username or email may already be taken."
      );
    }
  };

  return (
    <div className="signup-page-wrapper">
      <div className="signup-container animate">
        <h1 className="signup-title">Create an Account</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="signup-form" noValidate>
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
                onChange={handleOnChange}
                value={formData.username}
              />
              {validationErrors.username && (
                <p className="form-error-validation">
                  {validationErrors.username}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className={`form-input ${
                  validationErrors.email ? "is-invalid" : ""
                }`}
                onChange={handleOnChange}
                value={formData.email}
              />
              {validationErrors.email && (
                <p className="form-error-validation">
                  {validationErrors.email}
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
                onChange={handleOnChange}
                value={formData.password}
              />
              {show ? (
                <IoMdEyeOff className="eyeoff" onClick={() => setShow(false)} />
              ) : (
                <IoMdEye className="eye" onClick={() => setShow(true)} />
              )}
              {validationErrors.password && (
                <p className="form-error-validation">
                  {validationErrors.password}
                </p>
              )}
            </div>

            {apiError && <p className="form-error-api">{apiError}</p>}

            <button type="submit" className="submit-button">
              Sign Up
            </button>

            <p className="login-prompt">
              Already have an account?{" "}
              <span className="login-link" onClick={() => navigate("/login")}>
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

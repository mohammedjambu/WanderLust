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
  const [error, setError] = useState("");

  const { serverUrl, handleLoginSuccess } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
      setError(
        err.response?.data?.error ||
          "Login failed. User does not exist or password is incorrect."
      );
    }
  };

  return (
    // --- FIX IS HERE: Added style prop ---
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,_#fdfcfb,_#e2d1c3)]">
    
    <div className="login-container" style={{ flexGrow: 1,  }}>
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
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group password">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              id="password"
              type={show ? "text" : "password"}
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!show ? (
              <IoMdEye className="eye" onClick={() => setShow(true)} />
            ) : (
              <IoMdEyeOff className="eyeoff" onClick={() => setShow(false)} />
            )}
          </div>

          {error && <p className="error-text text-red-500">{error}</p>}

          <button type="submit" className="submit-button">
            Login
          </button>

          <p className="text-[18px]">
            Don't have an account?{" "}
            <span
              className="text-[19px] text-[red] cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </span>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./Login.css";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="form-container">
        <form action="/login" method="POST" className="login-form" noValidate>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              name="username"
              id="username"
              type="text"
              className="form-input"
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
              required
            />
            {!show && (
              <IoMdEye
                className="eye"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <IoMdEyeOff
                className="eyeoff"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <button type="submit" className="submit-button" onClick={() => navigate("/")}>
            Login
          </button>
          
          <p className="text-[18px]">
            Already have an account?{" "}
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
  );
};

export default Login;

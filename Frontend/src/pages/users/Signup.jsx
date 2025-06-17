import React, { useContext, useState } from 'react';
import './Signup.css';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../../context/AuthContext';
import axios from 'axios';

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      // Navigate to login page on successful signup
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">SignUp on Wanderlust</h1>
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
              className="form-input"
              onChange={handleOnChange}
              value={username}
              required
            />
            <div className="form-feedback hidden">Looks good!</div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              className="form-input"
              onChange={handleOnChange}
              value={email}
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
              onChange={handleOnChange}
              value={password}
              required
            />
            {!show && <IoMdEye className="eye" onClick={() => setShow(prev => !prev)} />}
            {show && <IoMdEyeOff className="eyeoff" onClick={() => setShow(prev => !prev)} />}
          </div>

          <button type="submit" className="submit-button">
            SignUp
          </button>
          <p className="text-[18px]">
            Already have an account?{' '}
            <span
              className="text-[19px] text-[red] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
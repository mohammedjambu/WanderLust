import React, { useContext, useState } from 'react';
import './Signup.css';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from "react-toastify";

function SignUp() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { serverUrl, setCurrentUser } = useContext(authDataContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      setCurrentUser && setCurrentUser(res.data.user); // optional
      toast.success("Signup Successful");
      navigate('/'); // redirect to home page
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Signup failed");
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
            <label htmlFor="username" className="form-label">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              className="form-input"
              onChange={handleOnChange}
              value={username}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
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
            <label htmlFor="password" className="form-label">Password</label>
            <input
              name="password"
              id="password"
              type={show ? "text" : "password"}
              className="form-input"
              onChange={handleOnChange}
              value={password}
              required
            />
            {show ? (
              <IoMdEyeOff className="eyeoff" onClick={() => setShow(false)} />
            ) : (
              <IoMdEye className="eye" onClick={() => setShow(true)} />
            )}
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="submit-button">SignUp</button>

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

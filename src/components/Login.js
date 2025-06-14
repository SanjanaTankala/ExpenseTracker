import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Password regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.mobile === mobile && u.password === password
    );
    if (user) {
      localStorage.setItem("currentUserMobile", mobile);
      localStorage.setItem("currentUserName", user.name);
      navigate("/dashboard");
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container animate-fade-in">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="User"
        className="auth-logo"
      />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          pattern="^[6-9]\d{9}$"
          title="Enter a valid 10-digit Indian mobile number starting with 6-9."
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          title="Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
        />
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
      <button className="link-button" onClick={() => navigate("/register")}>
        New User? Register
      </button>
    </div>
  );
};

export default Login;
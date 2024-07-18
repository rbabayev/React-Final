import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const admin = {
  username: "admin",
  password: "admin123",
};

function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === admin.username && password === admin.password) {
      navigate("/");
    } else {
      alert("Incorrect username or password!");
    }
  };

  return (
    <div className="loginPage">
      <img className="loginLogo" src={logo} alt="" />
      <h1 className="log-in">Log in</h1>
      <ul className="login-inputs">
        <input
          className="name-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submitBtn" onClick={handleLogin}>
          Submit
        </button>
      </ul>
    </div>
  );
}

export default Profile;

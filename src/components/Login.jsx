import React, { useState } from "react";
import ImageProfile from "../assets/profile_picture.png";
import LoginBg from "../assets/fondo_login.jpg";
import app from "../credenciales.js";
import { getDatabase, ref, set, push, onValue, query } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleLogin = async (email, password) => {
    const db = getDatabase(app);
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      for (const user in users) {
        if (users[user].userEmail === email && users[user].userPassword === password) {
          alert("Login succesful!");
          navigate('/home', { state: { userId: users[user].userId } });
          return;
        }
      }
      // Login failed, display error message
      alert("Invalid email or password");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(emailInput, passwordInput);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow">
              <h2 className="text-center">Log In</h2>
              <img src={ImageProfile} alt="" className="estilo-profile" />
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  className="cajatexto"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  className="cajatexto"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button type="submit" className="btn-form">
                  Log In
                </button>
              </form>
              <div>
                <h3>
                  Don't have an account? <Link to="/">Sign In</Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <img src={LoginBg} alt="" className="tamaño-imagen" />
        </div>
      </div>
    </div>
  );
};

export default Login;

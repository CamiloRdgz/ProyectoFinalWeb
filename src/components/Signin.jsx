import React, { useState } from "react";
import ImageProfile from "../assets/profile_picture.png";
import LoginBg from "../assets/fondo_login.jpg";
import app from "../credenciales.js";

import { getDatabase, ref, set, push, get } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(nameInput, emailInput, passwordInput);
  };

  const saveUser = async (name, email, password) => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "users"));
    const usersRef = ref(db, "users/");
    const newUserKey = newDocRef.key;

    const snapshot = await get(usersRef);
    const users = snapshot.val();

    let isDuplicateEmail = false;
    for (const user in users) {
      if (users[user].userEmail === email) {
        alert("There's already an account with this email!");
        isDuplicateEmail = true;
        break;
      }
    }

    if (isDuplicateEmail) return;

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Fill in all the fields!");
      return;
    }

    set(newDocRef, {
      userName: name,
      userEmail: email,
      userPassword: password,
      userBalance: 100000,
      userId: newUserKey
    })
      .then(() => {
        alert("Account created successfully");
        navigate("/login");
      })
      .catch((error) => {
        alert("error: ", error.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow">
              <h2 className="text-center">Sign In</h2>
              <img src={ImageProfile} alt="" className="estilo-profile" />
              <form>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Full Name"
                  className="cajatexto"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
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
                <button onClick={handleSubmit} className="btn-form">
                  Sign In
                </button>
              </form>
              <div>
                <h3>
                  Already have an account? <Link to="/login">Log In</Link>
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

export default Signin;

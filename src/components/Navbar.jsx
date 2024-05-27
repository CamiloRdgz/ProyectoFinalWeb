import React from "react";
import { Link, useNavigate } from "react-router-dom";
import getUserData from "./getUserData";
import Home from "./Home";
import CreateProduct from "./CreateProduct";
import MyProducts from "./MyProducts";
import { useEffect, useState } from "react";
import app from "../credenciales";
import { getDatabase, update, ref } from "firebase/database";

const Navbar = ({ userId }) => {
  const navigate = useNavigate();
  const db = getDatabase(app)
  const userRef = ref(db, "users/"+userId);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then((data) => {
          setUserData(data.userData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId]);

  const handleHomeClick = () => {
    navigate("/home", { state: { userId: userData.userId } });
  };

  const handleCreateProductClick = () => {
    navigate("/createproduct", { state: { userId: userData.userId } });
  }

  const handleMyProductsClick = () => {
    navigate("/myproducts", { state: { userId: userData.userId } });
  }

  const handleBoughtProductsClick = () => {
    navigate("/boughtproducts", { state: { userId: userData.userId } });
  }

  const handleAddMoney = () => {
    update(userRef, {
      userBalance: (userData.userBalance + 100000)
    })
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-brand" onClick={handleHomeClick}>
          e-Commerce
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto" style={{fontSize: "25px"}}>
            <li className="nav-item">
              <button className="nav-link" onClick={handleHomeClick}>
                |  Home  |
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleCreateProductClick}>
                Create Product  |
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleMyProductsClick}>
                My Products  |
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleBoughtProductsClick}>
                Bought Products  |
              </button>
            </li>
          </ul>
        </div>
        {userData && (
          <p style={{ marginRight: "15px" }}>
            Welcome, {userData.userName} <br /> Balance: ${userData.userBalance} <br /> <button className="btn btn-primary" onClick={() => handleAddMoney(userData.userId)}>Add Money</button>
          </p>
        )}
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

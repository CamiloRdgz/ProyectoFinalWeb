import React from "react";
import Navbar from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import app from "../credenciales.js";
import {
  getDatabase,
  ref,
  get,
  remove
} from "firebase/database";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getUserData from "./getUserData.jsx";

const MyProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;


  const [myProducts, setMyProducts] = useState([]);
  const [userData, setUserData] = useState({});

  
  const db = getDatabase(app);

  const showMyProducts = async () => {
    const productsRef = ref(db, "products/");
    const snapshot = await get(productsRef);
    if (snapshot.exists()) {
      setMyProducts(Object.values(snapshot.val()));
    }
  };

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
    showMyProducts();
  }, [userId]);


  const filterMyProducts = [];
  for (const product of myProducts) {
    if (product.productSeller === userData.userEmail) {
      filterMyProducts.push(product);
    }
  }

  const deleteProduct = (productId) => {
    const deleteRef = ref(db, `products/${productId}`);
    remove(deleteRef);
    window.location.reload();
    return
  };

  const handleGoEditProduct = (productId) => {
    navigate("/updateproduct", { state: { userId: userData.userId, productId: productId } });
  }

  return (
    <div>
      <Navbar userId={userId}/>
      <br />
      <h1 style={{ color: "#FFF", textAlign: "center" }}>My Products</h1>
      <div className="row" style={{ padding: "0px 100px 0 100px" }}>
        {filterMyProducts.map((item, index) => (
          <div className="col-md-4 tarjeta" key={index}>
            <div className="card" style={{ width: "267.75px" }} key={index}>
              <div className="card-body">
                <h5 className="card-title">{item.productName}</h5>
                <p className="card-text">{item.productDesc}</p>
                <p className="card-text">
                  <b>Price:</b> ${item.productPrice}
                </p>
                <p className="card-text">
                  <b>Seller:</b> You sell this product
                </p>
                <p className="card-text">
                  <b>ID:</b> {item.productId} 
                </p>
                {item.productBuyer === "" ? (
                <div>
                  <button className="btn btn-primary" onClick={() => handleGoEditProduct(item.productId)}>Edit Product</button>
                  <button className="btn btn-outline-danger" onClick={() => deleteProduct(item.productId)} style={{marginTop: "10px", backgroundColor: "red", color: "white"}}>Delete Product</button>
                </div>
                  ) : (
                    <button className="btn btn-primary" disabled={true}>This product has been bought</button>
                  )
                }
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProducts;

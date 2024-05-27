import { React, useState} from "react";
import Navbar from "./Navbar";
import app from "../credenciales.js";
import { getDatabase, ref, update } from "firebase/database";

import { useNavigate, useLocation } from "react-router-dom";
import getProductData from "./getProductData.jsx";
import getUserData from "./getUserData.jsx";
import { useEffect } from "react";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const productId = location.state?.productId;

  let [productNameInput, setProductNameInput] = useState("");
  let [productPriceInput, setProductPriceInput] = useState("");
  let [productDescInput, setProductDescInput] = useState("");

  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState({});

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

    if (productId) {
      getProductData(productId)
        .then((data) => {
          setProductData(data.productData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId, productId]);

  const handleGoMyProducts = () => {
    navigate("/myproducts", { state: { userId: userData.userId } });
  }

  const updateProduct = () => {
    const db = getDatabase(app);
    const productRef = ref(db, "products/" + productId);
    productPriceInput = parseInt(productPriceInput);
    if (
      productNameInput === "" ||
      productDescInput === "" ||
      productPriceInput === 0
    ) {
      alert("The fields have invalid values");
    } else {
      const updates = {
        productName: productNameInput,
        productDesc: productDescInput,
        productPrice: productPriceInput,
      };
      update(productRef, updates);
      alert("Product updated succesfully!");
      handleGoMyProducts();
    }
  };
  return (
    <div>
      <Navbar userId={userId} />
      <br />
      <h1 style={{ color: "#FFF", textAlign: "center" }}>Update Product</h1>
      <br />
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{color: "#000", width: "100vw" }}
      >
        <div className="row">
          <div className="col-md-8 card card-body shadow">
            <h2>Update Product</h2>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productName" className="form-label">
                    Name: {productData.productName}
                  </label>
                  <input
                    type="text"
                    className="form-control cajatexto"
                    id="productName"
                    placeholder="Enter product name"
                    maxLength="30"
                    value={productNameInput}
                    onChange={(e) => setProductNameInput(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="productPrice" className="form-label">
                    Price: ${productData.productPrice}
                  </label>
                  <input
                    type="number"
                    className="form-control cajatexto"
                    id="productPrice"
                    placeholder="Enter product price"
                    min="0"
                    max="100000000"
                    value={productPriceInput}
                    onChange={(e) => setProductPriceInput(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productDescription" className="form-label">
                    Description: {productData.productDesc}
                  </label>
                  <textarea
                    className="form-control cajatexto"
                    id="productDescription"
                    placeholder="Enter product description"
                    maxLength="30"
                    value={productDescInput}
                    onChange={(e) => setProductDescInput(e.target.value)}
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label htmlFor="productSeller" className="form-label">
                    Seller
                  </label>
                  {userData.userEmail ? (
                    <input
                      type="text"
                      className="form-control cajatexto"
                      id="productOwner"
                      value={userData.userEmail}
                      disabled={true}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control cajatexto"
                      id="productOwner"
                      placeholder="Loading..."
                      disabled={true}
                    />
                  )}
                </div>
              </div>
              <button
                className="btn btn-primary btn-form"
                onClick={() => updateProduct()}
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;

import { React, useState, useEffect } from "react";
import app from "../credenciales.js";
import { getDatabase, ref, set, push } from "firebase/database";
import getUserData from "./getUserData.jsx";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

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

  const [productNameInput, setProductNameInput] = useState("");
  const [productPriceInput, setProductPriceInput] = useState("");
  const [productDescInput, setProductDescInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProduct(
      productNameInput,
      productPriceInput,
      productDescInput,
      userData.userEmail
    );
  };

  const handleGoHome = () => {
    navigate("/home", { state: { userId: userData.userId } });
  };

  const saveProduct = async (
    productName,
    productPrice,
    productDesc,
    userEmail
  ) => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "products"));
    const newProductKey = newDocRef.key;

    productPrice = parseInt(productPrice);
    if (
      productName.trim() === "" ||
      productPrice === 0 ||
      productDesc.trim() === ""
    ) {
      alert("Fill in all the fields man!");
      return;
    }

    set(newDocRef, {
      productName: productName,
      productPrice: productPrice,
      productDesc: productDesc,
      productSeller: userEmail,
      productBuyer: "",
      productId: newProductKey,
    }).then(() => {
      alert("Product created successfully");
      handleGoHome();
    });
  };

  return (
    <div>
      <Navbar userId={userId}/>
      <br />
      <h1 style={{ color: "#FFF", textAlign: "center" }}>Create Product</h1>
      <br />
      <div
        className="container d-flex justify-content-center"
        style={{ color: "#000", width: "100vw" }}
      >
        <div className="row">
          <div className="col-md-8 card card-body shadow">
            <h2>Create Product</h2>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="productName" className="form-label">
                    Product Name
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
                    Product Price
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
                    Product Description
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
                  <label htmlFor="productOwner" className="form-label">
                    Product Owner
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
                onClick={handleSubmit}
                className="btn btn-primary btn-form"
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

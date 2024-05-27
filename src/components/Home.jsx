import { React, useState, useEffect } from "react";
import Navbar from "./Navbar";
import app from "../credenciales.js";
import { getDatabase, ref, get, update } from "firebase/database";
import getUserData from "./getUserData.jsx";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [allProducts, setAllProducts] = useState([]);
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

    const db = getDatabase(app);
    const showAllProducts = async () => {
      const productsRef = ref(db, "products/");
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        setAllProducts(Object.values(snapshot.val()));
      }
    };
    showAllProducts();
  }, [userId]);

  const buyProduct = async (productId, userId) => {
    const db = getDatabase(app);
    const selectedProductRef = ref(db, "products/" + productId);
    const buyerRef = ref(db, "users/" + userId);

    const selectedProductSnapshot = await get(selectedProductRef);
    const buyerSnapshot = await get(buyerRef);

    if (
      selectedProductSnapshot.exists() &&
      buyerSnapshot.exists() &&
      buyerSnapshot.val().userBalance >=
        selectedProductSnapshot.val().productPrice
    ) {
      alert("Buying product...");
      // Update the product object with the userEmail
      update(selectedProductRef, {
        productBuyer: buyerSnapshot.val().userEmail,
      });
      // Optionally, you can also update the user balance
      update(buyerRef, {
        userBalance:
          buyerSnapshot.val().userBalance -
          selectedProductSnapshot.val().productPrice,
      });

      window.location.reload();
    } else if (
      buyerSnapshot.exists() &&
      buyerSnapshot.val().userBalance <
        selectedProductSnapshot.val().productPrice
    ) {
      alert("Your balance is too low!");
    } else {
      console.log(
        "Error:",
        "selectedProductSnapshot.exists()",
        selectedProductSnapshot.exists(),
        "buyerSnapshot.exists()",
        buyerSnapshot.exists(),
        "buyerSnapshot.val().userBalance",
        buyerSnapshot.val().userBalance,
        "selectedProductSnapshot.val().productPrice",
        selectedProductSnapshot.val().productPrice
      );
    }
  };
  return (
    <div>
      <Navbar userId={userId} />
      <br />
      <h1 style={{ color: "#FFF", textAlign: "center" }}>All Products</h1>
      <div className="row" style={{ padding: "0px 100px 0 100px" }}>
        {allProducts.map((item, index) => {
          if (item.productBuyer === "") {
            return (
              <div className="col-md-4 tarjeta" key={index}>
                <div
                  className="card"
                  style={{ width: "267.75px" }}
                  key={item.productId}
                >
                  <div className="card-body">
                    <h5 className="card-title">{item.productName}</h5>
                    <p className="card-text">{item.productDesc}</p>
                    <p className="card-text">
                      <b>Price:</b> ${item.productPrice}
                    </p>
                    {item.productSeller === userData.userEmail ? (
                      <p className="card-text">
                        <b>Seller:</b> This product is yours
                      </p>
                    ) : (
                      <p className="card-text">
                        <b>Seller:</b> {item.productSeller}
                      </p>
                    )}
                    {item.productSeller === userData.userEmail ? (
                      <button className="btn btn-primary" disabled="true">
                        Can't buy this item
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => buyProduct(item.productId, userId)}
                      >
                        Buy Product
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
export default Home;

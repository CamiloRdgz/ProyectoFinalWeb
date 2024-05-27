import {React, useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import app from '../credenciales';
import getUserData from './getUserData';
import Navbar from './Navbar';

const BoughtProducts = () => {
    const location = useLocation();
    const userId = location.state?.userId;
  
  
    const [myBoughtProducts, setMyBoughtProducts] = useState([]);
    const [userData, setUserData] = useState({});
  
    
    const db = getDatabase(app);
  
    const showMyProducts = async () => {
      const productsRef = ref(db, "products/");
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        setMyBoughtProducts(Object.values(snapshot.val()));
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
    for (const product of myBoughtProducts) {
      if (product.productBuyer === userData.userEmail) {
        filterMyProducts.push(product);
      }
    }
  
    return (
      <div>
        <Navbar userId={userId}/>
        <br />
        <h1 style={{ color: "#FFF", textAlign: "center" }}>Bought Products</h1>
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
                    <b>Seller:</b> ${item.productSeller}
                  </p>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default BoughtProducts
import React from 'react'
import app from '../credenciales';
import { get, ref, getDatabase } from 'firebase/database';

const getProductData = async (productId) => {
    const db = getDatabase(app);
    const productRef = ref(db, "products/" + productId);
    const productSnapshot = await get(productRef);
  
    if (productSnapshot.exists()) {
      const productData = productSnapshot.val();
      return { productData };
    } else {
      throw new Error("Product not found");
    }
}

export default getProductData
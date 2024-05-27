import React from "react";
import { get, getDatabase, ref } from "firebase/database";
import app from "../credenciales";

const getUserData = async (userId) => {
  const db = getDatabase(app);
  const userRef = ref(db, "users/" + userId);
  const userSnapshot = await get(userRef);

  if (userSnapshot.exists()) {
    const userData = userSnapshot.val();
    return { userData };
  } else {
    throw new Error("User not found");
  }
};

export default getUserData;

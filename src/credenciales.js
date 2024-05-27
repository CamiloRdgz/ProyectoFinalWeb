// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg34k2QSYqTXo5JerlxVIuBomPmQCea24",
  authDomain: "webfinal-5e060.firebaseapp.com",
  projectId: "webfinal-5e060",
  storageBucket: "webfinal-5e060.appspot.com",
  messagingSenderId: "621306096600",
  appId: "1:621306096600:web:55d2ee2d89a65b718d60ad",
  measurementId: "G-VRH32L7HEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
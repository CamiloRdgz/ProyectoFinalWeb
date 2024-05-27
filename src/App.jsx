import './App.css'
import app from './credenciales.js'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Signin from './components/Signin.jsx'
import Navbar from './components/Navbar.jsx'
import CreateProduct from './components/CreateProduct.jsx'
import MyProducts from './components/MyProducts.jsx'
import UpdateProduct from './components/UpdateProduct.jsx'
import BoughtProducts from './components/BoughtProducts.jsx'
import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes path="/">
          <Route index element={<Signin/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/home' element= {<Home/>} />
          <Route path='/navbar' element={<Navbar/>}/>
          <Route path='/createproduct' element={<CreateProduct/>}/>
          <Route path='/myproducts' element={<MyProducts/>}/>
          <Route path='/updateproduct' element={<UpdateProduct/>}/>
          <Route path='/boughtproducts' element={<BoughtProducts/>}/>
        </Routes>
      </Router>
    </div>
  )
  
}

export default App

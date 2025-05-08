import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/all-books' element={<AllBooks/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
        </Routes>

        <Footer/>
      </Router>
    </div>
  )
}

export default App
import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";  // Import useLocation
import Hero from '../UI/Hero';
import Testimonials from '../UI/Testimonials';
import Pricing from '../UI/Pricing';
import Track from '../UI/Track';  
import Exercise from '../UI/Exercise';
import Home from '../UI/Home';
// import Login from '../UI/Login.jsx/Login.jsx';
import Checkout from './Checkout/Checkout';
import Footer from '../UI/Footer'; // Assuming you have a Footer component'
import Gallery from '../UI/Gallery';
import About from '../UI/AboutPage';
import Dietplan from '../UI/DietPlan.jsx';
import Bpi from '../UI/Bpi.jsx'
import Contact from './contact/Contact';
import Login from '../UI/Login.jsx/Login.jsx';
import Signup from '../UI/Signin/Signup.jsx';
// import { useAuth0 } from "@auth0/auth0-react";

const AllRoutes = () => {
  // const { isAuthenticated } = useAuth0();
//   const location = useLocation(); // Get the current location
// if (location.pathname === '/checkout') {

// }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Testimonials />} />
        <Route path="/membership" element={<Pricing />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/about" element={<About />} />
        <Route path="/diet-plan" element={<Dietplan />} />
        <Route path="/bmiCalulate" element={<Bpi />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />

        
        {/* <Route path="/track" element={isAuthenticated ? <Track /> : <Login />} /> */}
      </Routes>

  
      {/* {location.pathname === '/checkout' ? null:<Footer />} */}
    </>
  );
};

export default AllRoutes;

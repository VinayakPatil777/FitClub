import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContextProvider"; 
import Home from "../UI/Home";
import Testimonials from "../UI/Testimonials";
import Pricing from "../UI/Pricing";
import Gallery from "../UI/Gallery";
import Contact from "./contact/Contact";
import Exercise from "../UI/Exercise";
import About from "../UI/AboutPage";
import Dietplan from "../UI/DietPlan.jsx";
import Bpi from "../UI/Bpi.jsx";
import Login from "../UI/Login.jsx/Login.jsx";
import Signup from "../UI/Signin/Signup.jsx";
import ForgotPassword from "../UI/ForgotPassword.jsx";
import Checkout from "./Checkout/Checkout";
import PrivateRoute from "./PrivateRoute"; 

const AllRoutes = () => {
  const { user } = useAuth(); 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/programs" element={<Testimonials />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/exercise" element={<Exercise />} />
      <Route path="/about" element={<About />} />       
      <Route path="/diet-plan" element={<Dietplan />} />
      <Route path="/bmiCalulate" element={<Bpi />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/membership" element={<Pricing />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Route: User must be logged in to access Checkout */}
      <Route
        path="/checkout"
        element={user ? <Checkout /> : <Navigate to="/login" />}
      />

      {/* Private Routes Based on Membership Plan */}
      <Route path="/premium-content" element={<PrivateRoute element={<Testimonials />} requiredPlan="standard" />} />
      <Route path="/gold-exclusive" element={<PrivateRoute element={<Pricing />} requiredPlan="gold" />} />
    </Routes>
  );
};

export default AllRoutes;

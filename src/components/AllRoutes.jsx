import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
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

const AllRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session ? session.user : null);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

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

      {/* Restrict checkout route */}
      <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AllRoutes;

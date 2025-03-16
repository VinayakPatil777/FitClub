import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useEffect, useContext } from "react";
import Footer from "./UI/Footer";
import Header from "./components/Header.jsx";
import AllRoutes from "./components/AllRoutes";
import Login from "./UI/Login.jsx/Login";
import { BrowserRouter as Router } from "react-router-dom";
// import { ChakraProvider } from '@chakra-ui/react'
// import "remixicon/fonts/remixicon.css";
// import "aos/dist/aos.css"
// import Aos from ""
const App = () => {
  // useEffect(() => {
  //   // Aos.init();
  // }, [])
  return (
    <>
      <Header />
      <AllRoutes />
      <Footer />
    </>
  );
};

export default App;

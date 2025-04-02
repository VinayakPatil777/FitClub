import React from "react";
import "./App.css";
import Footer from "./UI/Footer";
import Header from "./components/Header.jsx";
import AllRoutes from "./components/AllRoutes";
import "remixicon/fonts/remixicon.css";
import { useLocation } from "react-router-dom";
import TawkTo from "./TawkTo.js";
// import { AuthProvider } from "./components/AuthContextProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation(); // Get the current route path

  return (
    <>
      <Header />
      <AllRoutes />
      <ToastContainer />
      <TawkTo />
      {!["/checkout", "/login", "/signup"].includes(location.pathname) && (
        <Footer />
      )}
    </>
  );
};

export default App;

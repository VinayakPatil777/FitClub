import React from "react";
import "./App.css";
import Footer from "./UI/Footer";
import Header from "./components/Header.jsx";
import AllRoutes from "./components/AllRoutes";
import "remixicon/fonts/remixicon.css";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation(); // Get the current route path

  return (
    <>
      <Header />
      <AllRoutes />
      {!["/checkout", "/login", "/signup"].includes(location.pathname) && (
        <Footer />
      )}
    </>
  );
};

export default App;

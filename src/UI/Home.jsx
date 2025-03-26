import React from "react";
import Hero from "./Hero";
import Exercise from "./Exercise";
import Start from "./Start";
import SecGallery from "./SecGallery.jsx";
import AIAssistant from "./AIAssistant.jsx";
const Home = () => {
  return (
    <>
      <Hero />
      <Exercise />
      <Start />
      <SecGallery />
      
      <AIAssistant/>
    </>
  );
};

export default Home;

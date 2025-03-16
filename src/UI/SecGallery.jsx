import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/SecGallery.css'

const videos = [
  { src: "video1.mp4", thumbnail: "thumbnail1.jpg" },
  { src: "video2.mp4", thumbnail: "thumbnail2.jpg" },
  { src: "video3.mp4", thumbnail: "thumbnail3.jpg" },
];

const SecGallery = () => {
  return (
    <div className="container">
      <div style={{ display: "flex", gap: "10px", marginBottom: "50px" }}>
        {/* BMI Info Section */}
        <section className="bmi-info-section">
          <div className="bmi-info-content">
            <h1>Know Your BMI</h1>
            <p>
              Body Mass Index (BMI) is a simple calculation using a person's
              height and weight. It can help you understand your health better.
            </p>
            <NavLink to="/bmiCalulate">
              <button className="calculate-button">Calculate Now</button>
            </NavLink>
          </div>
        </section>

        {/* Video Gallery Section */}
        <section className="video-gallery-section">
          <div className="video-gallery-content">
            <h1>Explore Our Video Gallery</h1>
            <p>
              Discover a wide range of videos on health, fitness, and wellness
              to help you stay informed and motivated.
            </p>
            <NavLink to="/gallery">
              <button className="more-button">More</button>
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SecGallery;

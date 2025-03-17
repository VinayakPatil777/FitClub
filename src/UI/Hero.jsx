import React from "react";
import heroImg from "../assets/img/hero-banner.png";
import "../styles/hero.css";
import Video from "../components/video/VideoComponent.jsx";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate(); // Initialize the navigate function
  
    // Function to handle button click and navigate to checkout page
    const GotoPrising = () => {
      navigate("/membership"); // Navigate to the checkout page
    };
    return (
      <section id="#">
        <div className="container">
          <div className="hero__wrapper">
            <div className="hero__content">
              <h2
                className="section__title"
                data-aos-duration="1000"
                data-aos="fade-up"
              >
                Exercise is the key to a{" "}
                <span className="highlights">Healthy</span> Lifestyle
              </h2>
              <p data-aos-duration="1100" data-aos="fade-up" data-aos-delay="100">
                Regular exercise is a crucial component of a healthy lifestyle.
                <br />
                It has numerous benefits for physical and mental health, including
                reducing the risk of chronic diseases,improving cardiovascular
                function,
                <br /> enhancing mood, reducing stress, and promoting better
                sleep.
              </p>
  
              <div
                className="hero__btns"
                data-aos-duration="1200"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <button className="register__btn" onClick={GotoPrising}>
                  Get Started
                </button>
                {/* <button className='watch_btn'><span><i className="ri-play-fill"></i></span>Watch Video</button> */}
                <Video />
              </div>
            </div>
  
            <div className="hero__img">
              <div className="hero__img-wrapper">
                <div className="box-01">
                  <div className="box-02">
                    <div className="box-03">
                      <div className="box__img">
                        <img src={heroImg} alt="err" />
                      </div>
                    </div>
                  </div>
                </div>
  
                <div
                  className="heart__rate"
                  data-aos-duration="1100"
                  data-aos="fade-right"
                >
                  <h5>Heart Rate</h5>
                  <span>
                    <i className="ri-heart-pulse-fill"></i>
                  </span>
                  <h6>100 BPM</h6>
                </div>
  
                <div
                  className="gym__location"
                  data-aos-duration="1100"
                  data-aos="fade-up"
                >
                  <span>
                    <i className="ri-map-pin-2-fill"></i>
                  </span>
                  <h5>Find our gym centers near you</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  
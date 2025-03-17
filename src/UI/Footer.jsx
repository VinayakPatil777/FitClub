import React from "react";
import "../styles/footer.css";
import logo from "../assets/img/vsLogo.jpg";
import Exercise from "./Exercise";
import { NavLink } from "react-router-dom";

const Footer = () => {
    const year=new Date().getFullYear();
  return (
    <footer className="footer" data-aos-duration="1100" data-aos="fade-up">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__box">
            <NavLink to={"/"} className="logo">
              <div className="logo__img">
                <img src={logo} alt="" />
              </div>
              <h2>Fitness Club</h2>
            </NavLink>
            <p>
            Achieve your health goals with expert training, personalized plans, and a supportive community. Join us and elevate your fitness journey today!
            </p>
          </div>
          <div className="footer__box">
            <h4 className="footer__title">Company</h4>

            <ul className="footer__links">
            {/* <li>
                <a href="/">Home</a>
              </li> */}
              <li>
                <a href="/programs">Our Programs</a>
              </li>
              <li>
                <a href="/diet-plan">Diet Plans</a>
              </li>
              <li>
                <a href="/membership">Become a member</a>
              </li>
            </ul>
          </div>

          <div className="footer__box">
            <h4 className="footer__title">Healthy Living</h4>

            <ul className="footer__links">
              <li>
                <a href="/gallery">Gallery</a>
              </li>
              <li>
                <a href="/bmiCalulate">BMI Calculate</a>
              </li>
              <li>
                <a href="/diet-plan">AI Health Assistant</a>
              </li>
            </ul>
          </div>
          <div className="footer__box">
            <h4 className="footer__title">Quick Links</h4>

            <ul className="footer__links">
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/membership">Membership</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="copyright">Copyright - {year} developed by Vinayak. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./Contact.css"; // Import the CSS file

import { useNavigate } from "react-router-dom";
import socialLinks from "../../assets/icons/socialLinks.jsx";
const ContactUs = () => {
  const [state, handleSubmit] = useForm("xovqvqgn"); // Replace "YOUR_FORM_ID" with your Formspree form ID
  const [timer, setTimer] = useState(10); // Countdown timer state
  const navigate = useNavigate(); // Hook for navigation

  // Countdown logic triggered when form submission succeeds
  useEffect(() => {
    if (state.succeeded) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown); // Stop countdown
            navigate("/"); // Redirect to home page after 10 seconds
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown); // Cleanup countdown on component unmount
    }
  }, [state.succeeded, navigate]);

  // Display success message with countdown after successful form submission
  if (state.succeeded) {
    return (
      <div>
        <p className="response_contact">
          Thanks for getting in touch! We will respond soon.
          <p style={{ marginTop: "15px " }}>
            Redirecting in {timer} seconds...
          </p>
        </p>
        {/* <p>Redirecting in {timer} seconds...</p> */}
      </div>
    );
  }

  return (
    <div className="contact_us_6">
      <div className="responsive-container-block parent container">
        <form onSubmit={handleSubmit} className="left">
          <div className="container-block form-wrapper">
            <div className="mob-text">
              <p className="text-blk contactus-head">Get in Touch</p>
              {/* <p className="text-blk contactus-subhead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis diam lectus sapien.
              </p> */}
            </div>
            <div className="responsive-container-block" id="i2cbk">
              <div className="responsive-cell-block" id="i10mt-3">
                <p className="text-blk input-title">NAME</p>
                <input
                  className="input"
                  id="ijowk-3"
                  type="text"
                  name="name"
                  placeholder="Please enter first name and Last ..."
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                />
              </div>
              <div className="responsive-cell-block" id="ip1yp">
                <p className="text-blk input-title">EMAIL</p>
                <input
                  className="input"
                  id="ipmgh-3"
                  type="email"
                  name="email"
                  placeholder="Please enter email..."
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div className="responsive-cell-block" id="ih9wi">
                <p className="text-blk input-title">PHONE NUMBER</p>
                <input
                  className="input"
                  id="imgis-3"
                  type="tel"
                  name="phone"
                  placeholder="Please enter phone number..."
                />
                <ValidationError
                  prefix="Phone"
                  field="phone"
                  errors={state.errors}
                />
              </div>
              <div className="responsive-cell-block" id="i634i-3">
                <p className="text-blk input-title">
                  WHAT DO YOU HAVE IN MIND?
                </p>
                <textarea
                  className="textinput"
                  id="i5vyy-3"
                  name="message"
                  placeholder="Please enter query..."
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </div>
            </div>
            <button
              className="submit-btn"
              id="w-c-s-bgc_p-1-dm-id-2"
              type="submit"
              disabled={state.submitting}
            >
              Submit
            </button>
          </div>
        </form>
        <div className="right" id="i772w">
          <div className="map-part">
            <p className="text-blk map-contactus-head" id="w-c-s-fc_p-1-dm-id">
              Reach us at
            </p>
            <p className="text-blk sub-heading">
              "Have questions or need assistance? We’re here to help!"
            </p>

            <div className="social-icons">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.6439908412926!2d73.2994115749763!3d19.035402982160907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7f69555555555%3A0x3e6411716f3a62f4!2sDilkap%20Research%20Institute%20of%20Engineering%20and%20Management%20Studies%20-%20%5BDRIEMS%5D%2C%20Karjat!5e0!3m2!1sen!2sin!4v1729416471836!5m2!1sen!2sin"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

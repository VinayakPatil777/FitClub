import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cleave from "cleave.js/react";

import "./Checkout.css";
import checkoutImage from "../../assets/img/vsLogo.jpg";

const Checkout = () => {
  const navigate = useNavigate();
  // const { name = "Regular", price = 350 } = location.state || {}; // Default values
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const price = searchParams.get("price") || "N/A"; 
  const name = searchParams.get("plan") || "N/A"; 

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [timer, setTimer] = useState(10);

  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear || !cvc) {
      setPaymentStatus("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    setPaymentStatus("");

    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate

      setLoading(false);
      if (isSuccess) {
        setPaymentStatus("Payment successful! Thank you for your purchase.");
        startCountdown();
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    }, 5000);
  };

  const startCountdown = () => {
    setTimer(10);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div>
      <div id="wrapper">
        <div id="container">
          <div id="info">
            <div className="Checkout_image">
              <img id="product" src={checkoutImage} alt="Activity Bracelet Surge" />
            </div>
            <h2 className="section__title customText">Fitness Club</h2>
            <p>Plan: {name}</p>
            <div id="price">
              <h2>Rs {price}</h2>
            </div>
          </div>

          <div id="payment">
            <form id="checkout" onSubmit={handleSubmit}>
              <label htmlFor="cardnumber">Credit Card Number</label>
              <Cleave
                id="cardnumber"
                options={{ creditCard: true }}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.rawValue)}
                required
                placeholder="0123-4567-8901-2345"
              />

              <label htmlFor="cardholder">Card Holder</label>
              <input
                id="cardholder"
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                maxLength={50}
                required
                placeholder="Cardholder Name"
              />

              <label>Expiration Date</label>
              <div id="left">
                <select
                  name="month"
                  id="month"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  required
                >
                  <option value="">MM</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
                      {(i + 1).toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <p>/</p>
                <select
                  name="year"
                  id="year"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  required
                >
                  <option value="">YY</option>
                  {[...Array(10)].map((_, i) => {
                    const year = currentYear + i;
                    return (
                      <option key={year} value={year.toString().slice(-2)}>
                        {year.toString().slice(-2)}
                      </option>
                    );
                  })}
                </select>
              </div>

              <label id="cvc-label">CVC/CVV</label>
              <input
                id="cvc"
                type="text"
                value={cvc}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 4) setCvc(value);
                }}
                maxLength={4}
                required
                placeholder="CVC/CVV"
              />

              <button className="btn register__btn" type="submit" disabled={loading}>
                {loading ? "Processing..." : "Purchase"}
              </button>
            </form>

            {paymentStatus && (
              <div className={`payment-status ${paymentStatus.includes("successful") ? "success" : "failure"}`}>
                {paymentStatus}
              </div>
            )}
            {paymentStatus.includes("successful") && timer > 0 && (
              <div style={{ paddingTop: "4px" }}>
                <p>Redirecting in {timer} seconds...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

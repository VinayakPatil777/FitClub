import React, { useState } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import checkoutImage from "../../assets/img/vsLogo.jpg";
const Checkout = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [timer, setTimer] = useState(10); // Countdown timer
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate payment processing
    setLoading(true);
    setPaymentStatus(""); // Clear previous status

    setTimeout(() => {
      // Simulate payment success or failure randomly
      const isSuccess = Math.random() > 0.3; // 70% chance of success

      setLoading(false);
      if (isSuccess) {
        setPaymentStatus("Payment successful! Thank you for your purchase.");
        startCountdown(); // Start countdown after successful payment
      } else {
        setPaymentStatus("Payment failed. Please try again.");
      }
    }, 5000); // Simulating a 5-second delay for payment processing
  };
  const startCountdown = () => {
    setTimer(10); // Reset timer to 10 seconds

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          navigate("/"); // Navigate to home after countdown ends
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
              <img
                id="product"
                src={checkoutImage}
                alt="Activity Bracelet Surge"
              />
            </div>
            <h2 className="section__title aos-init aos-animate customText">
              Fitness Club
            </h2>
            <p className="aos-init aos-animate">Plan : Regular</p>
            <div id="price">
              <h2>Rs 350 </h2>
            </div>
          </div>
          <div id="payment">
            <form id="checkout" onSubmit={handleSubmit}>
              <br /><br />
              <label htmlFor="cardnumber">Credit Card Number</label>
              <input
                id="cardnumber"
                type="number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                // pattern="[0-9]{13,16}"
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
                placeholder="Cardholder"
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
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
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
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                </select>
              </div>
              <div>
                {" "}
                <label id="cvc-label">CVC/CVV</label>
                <input
                  id="cvc"
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  maxLength={3}
                  required
                  placeholder="Cvc/Cvv"
                />{" "}
              </div>

              <button
                className="btn register__btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Processing..." : "Purchase"}
              </button>
            </form>

            {/* Display payment status */}
            {paymentStatus && (
              <div
                className={`payment-status ${
                  paymentStatus.includes("successful") ? "success" : "failure"
                }`}
              >
                {paymentStatus}
              </div>
            )}
            {/* Display countdown timer after successful payment */}
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

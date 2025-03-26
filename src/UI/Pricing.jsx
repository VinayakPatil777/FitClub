import React, { useEffect, useState } from "react";
import "../styles/pricing.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContextProvider";
import { getUserSubscription } from "../firebase";

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userPlan, setUserPlan] = useState(localStorage.getItem("userPlan") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserSubscription(user.uid)
        .then((plan) => {
          setUserPlan(plan);
          localStorage.setItem("userPlan", plan); // Store in localStorage
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching subscription:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleBuyNowClick = async (plan, price, duration) => {
    if (price === "Free") {
      if (user) {
        setUserPlan("Regular Member"); 
        localStorage.setItem("userPlan", "Regular Member"); // Update localStorage
        navigate("/");
      } else {
        navigate("/login");
      }
      return;
    }

    if (userPlan === plan) return; // Prevent re-purchase

    // Navigate to checkout
    navigate(
      `/checkout?plan=${encodeURIComponent(plan)}&price=${price}&duration=${duration}`
    );
  };

  return (
    <section id="membership">
      <div className="container">
        <div className="pricing__top">
          <h2 className="section__title">
            Premium <span className="highlights">Subscription</span> plan
          </h2>
          <p>Choose a plan that fits your fitness goals.</p>
          {userPlan && (
            <p className="current-plan">🔹 Current Plan: <strong>{userPlan}</strong></p>
          )}
        </div>

        <div className="pricing__wrapper">
          {/* Free Member */}
          <div className="pricing__item" data-aos="fade-up">
            <div className="pricing__card-top">
              <h2>Free Plan</h2>
              <h2 className="pricing">Rs 0 <span>/month</span></h2>
            </div>
            <div className="services">
              <ul>
                <li>✅ Access to free workouts</li>
                <li>✅ BMI Calculator</li>
                <li>✅ Limited articles & guides</li>
                <li>❌ AI Health Assistant</li>
                <li>❌ Program Page</li>
                <li>❌ Live Chat Support (Tawk.to)</li>
              </ul>
              <button className="register__btn" onClick={() => handleBuyNowClick("Regular Member", "Free", "Lifetime")}>
                {user ? "Get Started" : "Login"}
              </button>
            </div>
          </div>

          {/* Gold Member */}
          <div className="pricing__item pricing__item-02" data-aos="fade-up">
            <div className="pricing__card-top">
              <h2>Gold Member</h2>
              <h2 className="pricing">Rs 6999 <span>/year</span></h2>
            </div>
            <div className="services">
              <ul>
                <li>✅ Access to free workouts</li>
                <li>✅ BMI Calculator</li>
                <li>✅ Limited articles & guides</li>
                <li>✅ Unlimited AI Health Assistant Access</li>
                <li>✅ Program Page</li>
                <li>✅ Live Chat Support (Tawk.to)</li>
              </ul>
              <button className="register__btn"
                onClick={() => handleBuyNowClick("Gold Member", "6999", "1 year")}
                disabled={loading || userPlan === "Gold Member"}>
                {loading ? "Checking..." : userPlan === "Gold Member" ? "Purchased" : "Buy Now"}
              </button>
            </div>
          </div>

          {/* Standard Member */}
          <div className="pricing__item" data-aos="fade-up">
            <div className="pricing__card-top">
              <h2>Standard Member</h2>
              <h2 className="pricing">Rs 4999 <span>/year</span></h2>
            </div>
            <div className="services">
              <ul>
                <li>✅ Access to free workouts</li>
                <li>✅ BMI Calculator</li>
                <li>✅ Limited articles & guides</li>
                <li>✅ 3 AI Health Assistant Searches/Week</li>
                <li>✅ Program Page</li>
                <li>❌ Live Chat Support (Tawk.to)</li>
              </ul>
              <button className="register__btn"
                onClick={() => handleBuyNowClick("Standard Member", "4999", "1 year")}
                disabled={loading || userPlan === "Standard Member"}>
                {loading ? "Checking..." : userPlan === "Standard Member" ? "Purchased" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

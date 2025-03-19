import React, { useEffect, useState } from "react";
import "../styles/pricing.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContextProvider";

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [userPlan, setUserPlan] = useState(null);

  // Fetch user plan on component mount
  useEffect(() => {
    if (user) {
      getUserSubscription(user.uid).then((plan) => {
        setUserPlan(plan);
      });
    }
  }, [user]);

  const handleBuyNowClick = (plan, price, duration) => {
    if (price === "Free") {
      if (user) {
        navigate("/home");
      } else {
        navigate("/login");
      }
      return;
    }

    if (userPlan === plan) {
      return; // Do nothing if already purchased
    }

    navigate(`/checkout?plan=${encodeURIComponent(plan)}&price=${price}&duration=${duration}`);
  };

  

  return (
    <section id="membership">
      <div className="container">
        <div className="pricing__top">
          <h2 className="section__title">
            Premium <span className="highlights">Subscription</span> plan
          </h2>
          <p>
            Health & Fitness is a popular nutrition and exercise tracking app
            that offers a premium subscription service.
            <br />
            The premium version includes advanced nutrient tracking, customized
            goals and advice, and exclusive content.
          </p>
        </div>

        <div className="pricing__wrapper">
          {/* Regular Member */}
          <div
            className="pricing__item"
            data-aos-duration="1500"
            data-aos="fade-up"
          >
            <div className="pricing__card-top">
              <h2>Regular Member </h2>
              <h2 className="pricing">
                <span>Free</span>
              </h2>
            </div>
            <div className="services">
              <ul>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Unlimited
                  access to the App
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Customer
                  support
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Personal
                  trainer
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Personal
                  Nutritionist
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Demo online
                  classes
                </li>
              </ul>
              <button
                className="register__btn"
                onClick={() =>
                  handleBuyNowClick("Regular Member", "Free", "Lifetime")
                }
              >
                  {user ? "Get Started" : "Login"}
              </button>
            </div>
          </div>

          {/* Gold Member */}
          <div
            className="pricing__item pricing__item-02"
            data-aos-duration="1500"
            data-aos="fade-up"
          >
            <div className="pricing__card-top">
              <h2>Gold Member</h2>
              <h2 className="pricing">
                Rs 6999 <span>/year</span>
              </h2>
            </div>
            <div className="services">
              <ul>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Unlimited
                  access to the App
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Customer
                  support
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Personal
                  trainer
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Personal
                  Nutritionist
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Free online
                  classes
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Free access
                  to our gym centers
                </li>
              </ul>
              <button className="register__btn" 
                onClick={() => handleBuyNowClick("Gold Member", "6999", "1 year")}
                disabled={userPlan === "Gold Member"}
              >
                {userPlan === "Gold Member" ? "Purchased" : "Buy Now"}
              </button>
            </div>
          </div>

          {/* Standard Member */}
          <div
            className="pricing__item"
            data-aos-duration="1500"
            data-aos="fade-up"
          >
            <div className="pricing__card-top">
              <h2>Standard Member</h2>
              <h2 className="pricing">
                Rs 4999 <span>/year</span>
              </h2>
            </div>
            <div className="services">
              <ul>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Unlimited
                  access to the App
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Customer
                  support
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Personal
                  trainer
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Personal
                  Nutritionist
                </li>
                <li>
                  <i className="ri-checkbox-blank-circle-fill"></i> Free online
                  classes
                </li>
              </ul>
              <button className="register__btn"
                onClick={() => handleBuyNowClick("Standard Member", "4999", "1 year")}
                disabled={userPlan === "Standard Member"}
              >
                {userPlan === "Standard Member" ? "Purchased" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

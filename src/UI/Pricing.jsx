import React, { useState } from 'react';
import "../styles/pricing.css";
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const navigate = useNavigate(); 
    const [selectedPlan, setSelectedPlan] = useState({ name: "Regular", price: 350 });

    
    // Function to handle navigation to the checkout page with plan details
    const handleBuyNowClick = (plan, price, duration) => {
      navigate(`/checkout?plan=${encodeURIComponent(plan)}&price=${price}&duration=${duration}`);
    };
    const handleSelectPlan = (plan) => {
        setSelectedPlan(plan);
      };
    
      const handleProceedToCheckout = () => {
        navigate("/checkout", { state: selectedPlan });
      };

  return (
    <section id='membership'>
      <div className="container">
        <div className="pricing__top">
          <h2 className="section__title">Premium <span className="highlights">Subscription</span> plan</h2>
          <p>Health & Fitness is a popular nutrition and exercise tracking app that offers a premium subscription service.<br/>
          The premium version includes advanced nutrient tracking, customized goals and advice, and exclusive content.</p>
        </div>

        <div className="pricing__wrapper">
          {/* Regular Member */}
          <div className="pricing__item" data-aos-duration="1500" data-aos="fade-up">
            <div className="pricing__card-top">
              <h2>Regular Member (Free 1 month)</h2>    
              <h2 className="pricing">Rs 350 <span>/month</span></h2>
            </div>
            <div className="services">
              <ul>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Unlimited access to the App</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Customer support</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Personal trainer</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Personal Nutritionist</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Demo online classes</li>
              </ul>
              <button className='register__btn' 
                onClick={() => handleBuyNowClick('Regular Member', 350, '1 month')}>
                Buy Now
              </button>
            </div>
          </div>

          {/* Gold Member */}
          <div className="pricing__item pricing__item-02" data-aos-duration="1500" data-aos="fade-up">
            <div className="pricing__card-top">
              <h2>Gold Member</h2>
              <h2 className="pricing">Rs 6999 <span>/year</span></h2>
            </div>
            <div className="services">
              <ul>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Unlimited access to the App</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Customer support</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Personal trainer</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Personal Nutritionist</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Free online classes</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Free access to our gym centers</li>
              </ul>
              <button className='register__btn' 
                onClick={() => handleBuyNowClick('Gold Member', 6999, '1 year')}>
                Buy Now
              </button>
            </div>
          </div>

          {/* Standard Member */}
          <div className="pricing__item" data-aos-duration="1500" data-aos="fade-up">
            <div className="pricing__card-top">
              <h2>Standard Member</h2>
              <h2 className="pricing">Rs 4999 <span>/year</span></h2>
            </div>
            <div className="services">
              <ul>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Unlimited access to the App</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Customer support</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Personal trainer</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Personal Nutritionist</li>
                <li><i className="ri-checkbox-blank-circle-fill"></i> Free online classes</li>
              </ul>
              <button className='register__btn' 
                onClick={() => handleBuyNowClick('Standard Member', 4999, '1 year')}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

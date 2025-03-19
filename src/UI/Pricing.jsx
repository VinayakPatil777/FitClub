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
          {/* Free Member */}
          <div className="pricing__item" data-aos-duration="1500" data-aos="fade-up">
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
                <li>✅ Access to free workouts</li>
                <li>✅ BMI Calculator</li>
                <li>✅ Limited articles & guides</li>
                <li>✅ Unlimited AI Health Assistant Access</li>
                <li>✅ Program Page</li>
                <li>✅ Live Chat Support (Tawk.to)</li>
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
                <li>✅ Access to free workouts</li>
                <li>✅ BMI Calculator</li>
                <li>✅ Limited articles & guides</li>
                <li>✅ 3 AI Health Assistant Searches/Week </li>
                <li>✅ Program Page</li>
                <li>❌ Live Chat Support (Tawk.to)</li>
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

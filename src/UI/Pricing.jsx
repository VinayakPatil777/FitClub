import React, { useEffect, useState } from "react";
import "../styles/pricing.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Pricing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.session) {
        const { data: userData, error } = await supabase
          .from("users")
          .select("plan")
          .eq("id", session.session.user.id)
          .single();

        if (!error) setUserPlan(userData?.plan || "Free");
      }
      setUser(session?.session?.user || null);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleBuyNowClick = async (plan) => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (userPlan === plan) return;

    const { error } = await supabase
      .from("users")
      .update({ plan })
      .eq("id", user.id);

    if (!error) {
      setUserPlan(plan);
    } else {
      console.error("Subscription update error:", error.message);
    }
  };

  return (
    <section id="membership">
      <div className="container">
        <div className="pricing__top">
          <h2 className="section__title">
            Premium <span className="highlights">Subscription</span> Plan
          </h2>
          <p>Choose a plan that fits your fitness goals.</p>
          {userPlan && (
            <p className="current-plan">
              🔹 Current Plan: <strong>{userPlan}</strong>
            </p>
          )}
        </div>

        <div className="pricing__wrapper">
          <div className="pricing__item" data-aos="fade-up">
            <div className="pricing__card-top">
              <h2>Free Plan</h2>
              <h2 className="pricing">
                Rs 0 <span>/month</span>
              </h2>
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
              <button
                className="register__btn"
                onClick={() => handleBuyNowClick("Free")}
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="pricing__item pricing__item-02" data-aos="fade-up">
            <div className="pricing__card-top">
              <h2>Gold Member</h2>
              <h2 className="pricing">
                Rs 6999 <span>/year</span>
              </h2>
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
              <button
                className="register__btn"
                onClick={() => handleBuyNowClick("Gold")}
                disabled={loading || userPlan === "Gold"}
              >
                {loading
                  ? "Checking..."
                  : userPlan === "Gold"
                  ? "Purchased"
                  : "Buy Now"}
              </button>
            </div>
          </div>

          <div className="pricing__item" data-aos="fade-up">
            <div className="pricing__card-top">
              <h2>Standard Member</h2>
              <h2 className="pricing">
                Rs 4999 <span>/year</span>
              </h2>
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
              <button
                className="register__btn"
                onClick={() => handleBuyNowClick("Standard")}
                disabled={loading || userPlan === "Standard"}
              >
                {loading
                  ? "Checking..."
                  : userPlan === "Standard"
                  ? "Purchased"
                  : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

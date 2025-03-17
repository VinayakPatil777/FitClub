import React from 'react';
import '../styles/AIAssistant.css';

const AIAssistant = () => {
  return (
    <div className="ai-assistant-container container">
      <div className="ai-header">
        <h1>Your AI Health Assistant</h1>
        <p className="subtitle">Empowering you to achieve your health and wellness goals with AI-driven insights.</p>
      </div>

      <div className="features-section">
        <h2>What Can I Do For You?</h2>
        <div className="feature-cards">
          <div className="card">
            <span role="img" aria-label="diet">🍎</span>
            <h3>Personalized Diet Plans</h3>
            <p>Get custom meal plans tailored to your dietary preferences and health goals.</p>
          </div>
          <div className="card">
            <span role="img" aria-label="workout">💪</span>
            <h3>Workout Recommendations</h3>
            <p>Receive exercise routines designed for your fitness level and objectives.</p>
          </div>
          <div className="card">
            <span role="img" aria-label="tracking">📊</span>
            <h3>Progress Tracking</h3>
            <p>Monitor your daily calorie intake, weight, and fitness progress effortlessly.</p>
          </div>
        </div>
      </div>

      <div className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Click the button below to get started.</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Answer a few quick questions about your health and goals.</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>Receive your personalized plan in seconds!</p>
          </div>
        </div>
      </div>

      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"The AI Assistant helped me lose 10 pounds in just 2 months! It's like having a personal nutritionist in my pocket."</p>
            <cite>- Sarah T.</cite>
          </div>
          <div className="testimonial">
            <p>"I love how easy it is to use. The diet plans are delicious and fit perfectly into my busy lifestyle."</p>
            <cite>- John D.</cite>
          </div>
        </div>
      </div>

      <button className="cta-button" onClick={() => window.location.href = '/diet-plan'}>
        Get Your Diet Plan Now
      </button>
    </div>
  );
};

export default AIAssistant;
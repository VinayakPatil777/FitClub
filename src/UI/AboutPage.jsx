// AboutPage.jsx
import React from 'react';
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      {/* Navigation
      <nav className="nav">
        <div className="nav-brand">FITNESS<span className="brand-accent">ZONE</span></div>
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link active">About</a>
          <a href="#programs" className="nav-link">Programs</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav> */}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Transform Your Life</h1>
            <p className="hero-subtitle">Where Fitness Meets Passion</p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <main className="about-content">
        <div className="about-card">
          <h2 className="section-title">Our Story</h2>
          <p className="about-text">
            Since 2010, we've been revolutionizing fitness with science-backed programs 
            and transformative experiences. Our 500,000+ success stories speak volumes 
            about our commitment to excellence.
          </p>
          
          <div className="highlights-container">
            <div className="highlight-box">
              <div className="highlight-number">15+</div>
              <div className="highlight-text">Years Experience</div>
            </div>
            <div className="highlight-box">
              <div className="highlight-number">500K+</div>
              <div className="highlight-text">Transformations</div>
            </div>
            <div className="highlight-box">
              <div className="highlight-number">50+</div>
              <div className="highlight-text">Expert Trainers</div>
            </div>
          </div>
        </div>

        <div className="mission-section">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <h3>🏋️ Personalized Plans</h3>
              <p>AI-driven custom workouts tailored to your goals</p>
            </div>
            <div className="mission-card">
              <h3>🍎 Nutrition First</h3>
              <p>Meal plans crafted by certified dietitians</p>
            </div>
            <div className="mission-card">
              <h3>🏆 Proven Results</h3>
              <p>98% satisfaction rate with visible results in 6 weeks</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="footer">
        <div className="footer-content">
          <p>© 2023 FitnessZone. All rights reserved</p>
          <div className="social-links">
            <a href="#instagram">Instagram</a>
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default AboutPage;
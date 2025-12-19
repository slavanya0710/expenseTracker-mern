import React from "react";

function About() {
  return (
    <div className="page">
      {/* HERO */}
      <div className="card about-hero">
        <h2>About Expense Tracker </h2>
        <p className="about-tagline">
          A simple yet powerful way to take control of your money.
        </p>
      </div>

      {/* STORY */}
      <div className="card">
        <h3> Why this app?</h3>
        <p className="about-text">
          Expense Tracker was built to help users understand where their money
          goes, develop better spending habits, and make smarter financial
          decisions — without complexity or stress.
        </p>
      </div>

      {/* FEATURES */}
      <div className="about-grid">
        <div className="about-card">
          <h4> Visual Insights</h4>
          <p>
            Understand your finances through interactive charts and reports.
          </p>
        </div>

        <div className="about-card">
          <h4> Smart Tracking</h4>
          <p>
            Categorize income and expenses to clearly see spending patterns.
          </p>
        </div>

        <div className="about-card"> 
          
          <h4> Monthly Analysis</h4>
          <p>
            Track your monthly income, expenses, and savings with ease.
          </p>
        </div>

      
      </div>

      {/* TECH STACK */}
      <div className="card">
        <h3> Technology Stack</h3>
        <div className="tech-stack">
          <span> React</span>
          <span> CSS</span>
          <span> Recharts</span>
          <span> LocalStorage</span>
          <span> Node.js</span>
        </div>
      </div>

      {/* MOTIVATION */}
      <div className="card motivation">
        <p>
          “Don’t save what is left after spending, spend what is left after
          saving.”
        </p>
        <span>— Warren Buffett</span>
      </div>

      {/* FOOTER NOTE */}
      <div className="about-footer">
        Built with love to promote smarter financial habits.
      </div>
    </div>
  );
}

export default About;

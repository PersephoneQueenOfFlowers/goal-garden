import React from 'react';
import Nav from '../nav/nav';

function Hero(props){

  return (
    <section className="hero">
      <Nav />
      <div className="hero-inner-container">
        <h1><span className="beauty">G</span>oal<span className="beauty">G</span>arden</h1>
        <p>Curated Space for Personal Goal Setting<br />  and Tracking</p>
      </div>
    </section>
  );

}

export default Hero;


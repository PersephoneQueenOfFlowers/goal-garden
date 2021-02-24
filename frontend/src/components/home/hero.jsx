import React from 'react';
import Nav from '../nav/nav';

function Hero(props){

  return (
    <section className="hero">
      <Nav />
      <div className="hero-inner-container">
        <h1><span className="bodoni">G</span><span className="beauty">G</span>oal<span className="beauty">G</span>arden<span className="bodoni">F</span></h1>
      </div>
    </section>
  );

}

export default Hero;


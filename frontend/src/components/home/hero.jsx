import React from 'react';
import Nav from '../nav/nav';

function Hero(props){
  let header = ""
  if(props.header === undefined){
    header = <p>Curated Space for Personal Goal Setting<br />  and Tracking"</p>
  }else{
    header = props.header
  }
  return (
    <section className="hero">
      {/* <Nav /> */}
      <div className={`hero-inner-container ${props.pageClass}`}>
        <h1><span className="beauty">G</span>oal<span className="beauty">G</span>arden</h1>
        <p>{props.header}</p>
      </div>
    </section>
  );

}

export default Hero;


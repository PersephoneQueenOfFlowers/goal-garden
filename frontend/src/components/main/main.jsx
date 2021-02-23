
import React from 'react';
import Hero from './hero';
import HomeContainer from '../home/home_container'

class Main extends React.Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div className="main-container">
        <Hero />
        <div>
        <div>hi from main</div>
        </div>
      </div>
    );
  }
}

export default Main;
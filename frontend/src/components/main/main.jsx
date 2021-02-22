
import React from 'react';
import Hero from './hero';
import HomeContainer from '../home/home_container'

class Main extends React.Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div>
        <Hero />
        <Home />
        <footer>
          <p>content for footer</p>
        </footer>
      </div>
    );
  }
}

export default Main;
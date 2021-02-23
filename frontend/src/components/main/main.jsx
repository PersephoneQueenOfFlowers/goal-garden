
import React from 'react';
import HomeContainer from '../home/home_container'
import Nav from '../nav/nav';

class Main extends React.Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div className="main-container">
        <Nav />
        <HomeContainer />
      </div>
    );
  }
}

export default Main;
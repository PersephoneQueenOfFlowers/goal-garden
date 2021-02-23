import React, { Component } from 'react'
import Hero from './hero';

export default class home extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div className="body home">
          
          <Hero />

        <section className="middle taskList">
          <img src='./css/images/grass-illust.png' alt=""/>
          <div className="left">
            <div className="background-container">
              <p>
                GoalGarden is a curated space for help with personal goal accountability and tracking.
                Here you can:
            </p>
              <ul>
                <li>Create goals and track your progress</li>
                <li>keep a journal of your progress attached to each goal</li>
                <li>receive reminder notifications when attention is needed</li>
                <li>mark and celebrate your progress and success!</li>
              </ul>
            </div>
          </div>
          <div className="right">
            <h1>Current Goals</h1>
            <ul>
              <li className="goalTitle">clean out the garage</li>
              <li className="goalTitle">build a new dog house</li>
              <li className="goalTitle">go shopping</li>
              <li className="goalTitle">start on the novel</li>
              <li className="goalTitle">paint the kitchen</li>
            </ul>
          </div>
        </section>
        <section className="background description">
          
        </section>
      </div>
    )
  }
}

import React, { Component } from 'react'

export default class home extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      <div className="body">
        <section className="middle taskList">
          <div className="left">
            <h1>Current Goals</h1>
          </div>
          <div className="right">
            <ul>
              <li class="goalTitle">clean out the garage</li>
              <li class="goalTitle">build a new dog house</li>
              <li class="goalTitle">go shopping</li>
              <li class="goalTitle">start on the novel</li>
              <li class="goalTitle">paint the kitchen</li>
            </ul>
          </div>
        </section>
        <section className="background description">
          <div className="background-container">
            <p>
              GoalGarden is a curated space for help with personal goal accountability and tracking.
              Here you can:
                  <ul>
                <li>Create goals and track your progress</li>
                <li>keep a journal of your progress attached to each goal</li>
                <li>receive reminder notifications when attention is needed</li>
                <li>mark and celebrate your progress and success!</li>
              </ul>
            </p>
          </div>
        </section>
      </div>
    )
  }
}

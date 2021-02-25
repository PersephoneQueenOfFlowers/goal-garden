import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Hero from '../home/hero';

class GoalShow extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.props.fetchGoal(this.props.match.params.goalId);
        this.props.fetchJournals(this.props.match.params.goalId)
    }
   
    render(){
        const { goal, journals } = this.props;
        if (!goal) return null;
        let journalsArr = []
        if(journals !== undefined){
            journalsArr = Object.values(journals)
        }
        return(
          <div>
          <Hero />
            <section className="middle taskList">
              <img src='./css/images/grass-border.png' alt=""/>
              <div className="left">
                <div className="background-container">
                  <h3>
                    <h2>{goal.title}</h2>
                </h3>
                  <p>{goal.body}</p>
                </div>
              </div>
              <div className="right">
                <div className="goals-container">
                  <h3>Journals</h3>
                  <ul className="goal-list">
                    {
                      journalsArr.map(journal => {
                        return (<li>{journal.body}</li>)
                      })}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )
    }
}
export default withRouter(GoalShow);

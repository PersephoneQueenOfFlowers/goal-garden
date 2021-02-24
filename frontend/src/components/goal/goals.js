import React from 'react';
import { withRouter } from 'react-router-dom';
import GoalBox from './goal_box';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  componentDidMount() {
    this.props.fetchGoals();
  }

  createGoal(){
    
  }

  render() {
    const { goals } = this.props;
    if(goals.length === 0){
      return (<div>You have no Goals</div>)
    } else {
      return (
        <div>
          <h2>All Your Goals</h2>
          {goals.map(goal => (
            <GoalBox key={goal._id} goal={goal} />
          ))}

          <button type="button">Add New Goal</button>
        </div>
      );
    }
  }
}

export default withRouter(Goal);
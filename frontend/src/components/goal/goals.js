import React from 'react';
import { withRouter } from 'react-router-dom';
import GoalBox from './goal_box';

class Goal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goals: []
    }
  }

  componentWillMount() {
    // this.props.fetchGoals();
  }

  // componentWillReceiveProps(newState) {
  //   this.setState({ goals: newState.goals });
  // }

  render() {
    if (this.state.goals.length === 0) {
      return (<div>There are no Goals</div>)
    } else {
      return (
        <div>
          <h2>All Your Goals</h2>
          {this.state.goals.map(goal => (
            <GoalBox key={goal._id} title={goal.title} />
          ))}
        </div>
      );
    }
  }
}

export default withRouter(Goal);
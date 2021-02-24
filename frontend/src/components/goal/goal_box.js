import React from 'react';
import { Link } from 'react-router-dom';

class GoalBox extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.removeGoal(this.props.goal._id);
  }

  render() {
    const { goal } = this.props;
    if (!goal) return null;
    return (
        <div>
            <Link to={`/goals/${goal._id}`}>{goal.title}</Link>
            <button type="button" onClick={this.handleClick}>Delete Goal</button>
        </div>
    );
  }
}

export default GoalBox;


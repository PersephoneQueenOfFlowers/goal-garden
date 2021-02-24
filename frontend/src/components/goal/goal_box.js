import React from 'react';
import { Link } from 'react-router-dom';

class GoalBox extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    const { goal } = this.props;
    if (!goal) return null;
    return (
        <div>
            <Link to={`/goals/${goal._id}`}>{goal.title}</Link>
        </div>
    );
  }
}

export default GoalBox;


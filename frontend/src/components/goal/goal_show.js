import React from 'react';
import { withRouter } from 'react-router-dom';

class GoalShow extends React.Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        this.props.fetchGoal(this.props.match.params.goalId);
    }
   
    render(){
        const { goal } = this.props;
        if (!goal) return null;
        return(
           <div>
               <h2>{goal.title}</h2>
               <p>{goal.body}</p>
           </div>
        )
    }
}
export default withRouter(GoalShow);
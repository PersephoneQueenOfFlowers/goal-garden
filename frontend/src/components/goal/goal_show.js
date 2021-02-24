// import React from 'react';
// import { withRouter } from 'react-router-dom';

// class GoalShow extends React.Component{
//     constructor(props){
//         super(props);

//     }
//     componentDidMount(){
//         const goalId = this.props.goal.id;
//         this.props.fetchGoal(goalId);
//     }
   
//     render(){
//         const { goal } = this.props;
//         if (goal === undefined) return null;
//         return(
//            <div>
//                <h2>{goal.title}</h2>
//                <p>{goal.body}</p>
//            </div>
//         )
//     }
// }
// export default withRouter(GoalShow);
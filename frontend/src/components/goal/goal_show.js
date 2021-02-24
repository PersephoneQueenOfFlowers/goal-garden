import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
            debugger
        }
        return(
           <div>
               <h2>{goal.title}</h2>
               <p>{goal.body}</p>
               <div>Journals
                    {journalsArr.map(journal => {
                        return(<Link>{journal.body}</Link>)
                    })}
               </div>
           </div>
        )
    }
}
export default withRouter(GoalShow);
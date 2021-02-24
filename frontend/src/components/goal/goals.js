import React from 'react';
import { withRouter } from 'react-router-dom';
import GoalBox from './goal_box';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", body: "", date: new Date().toISOString().slice(0, 10), formClass: "add_goal_hidden"}
    this.createGoal = this.createGoal.bind(this);
  }

  componentDidMount() {
    this.props.fetchGoals();
  }

  handleChange(type){
    return(e => {
      this.setState({[type]: e.currentTarget.value})
    })
  }

  createGoal(e){
    e.preventDefault();
    this.props.composeGoal({body: this.state.body,
                            title: this.state.title,
                            expirationDate: this.state.date})
    this.setState({ title: "", body: "", 
      date: new Date().toISOString().slice(0, 10), formClass: "add_goal_hidden"})
    this.props.fetchGoals();
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
          <form onSubmit={this.createGoal}>
            <label>Goal Title:
              <input type="text" value={this.state.title} onChange={this.handleChange("title")}/>
            </label>
            <label>Goal Description:
              <textarea value={this.state.body} onChange={this.handleChange("body")}/>
            </label>
            <label>How Long do you want to keep this goal going for?
              <input type="date" value={this.state.date} onChange={this.handleChange("date")}/>
            </label>
            <button type="submit">Add New Goal!</button>
          </form>
          <button type="button">Add New Goal</button>
        </div>
      );
    }
  }
}

export default withRouter(Goal);
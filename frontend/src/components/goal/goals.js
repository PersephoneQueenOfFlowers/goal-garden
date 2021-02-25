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
                            expirationDate: this.state.date,
                            checkInterval: "1"})
    this.setState({ title: "", body: "", 
      date: new Date().toISOString().slice(0, 10), formClass: "add_goal_hidden"})
    setTimeout(() => {
      this.props.fetchGoals();
    }, 300)
  }

  render() {
    const goals = this.props.goals.map(goal => {
            return (
                <GoalBox goal={goal} key={goal._id} removeGoal={this.props.removeGoal}/>
            )
        });
 
    if(goals.length === 0){
      return (<div>You have no Goals <button onClick={() => this.state.formClass === "add_goal_hidden" ? this.setState({ formClass: "add_goal_show" }) : this.setState({ formClass: "add_goal_hidden" })}>Create New Goal</button>
        <form onSubmit={this.createGoal} className={this.state.formClass}>
          <label>Goal Title:
              <input type="text" value={this.state.title} onChange={this.handleChange("title")} />
          </label>
          <label>Goal Description:
              <textarea value={this.state.body} onChange={this.handleChange("body")} />
          </label>
          <label>How Long do you want to keep this goal going for?
              <input type="date" value={this.state.date} onChange={this.handleChange("date")} />
          </label>
          <button type="submit">Create New Goal!</button>
        </form>
      </div>)
    } else {
      return (
        <div>
          <h2>All Your Goals</h2>
          {goals}
          <form onSubmit={this.createGoal} className={this.state.formClass}>
            <label>Goal Title:
              <input type="text" value={this.state.title} onChange={this.handleChange("title")}/>
            </label>
            <label>Goal Description:
              <textarea value={this.state.body} onChange={this.handleChange("body")}/>
            </label>
            <label>How Long do you want to keep this goal going for?
              <input type="date" value={this.state.date} onChange={this.handleChange("date")}/>
            </label>
            <button type="submit">Create New Goal!</button>
          </form>
          <button onClick={() => this.state.formClass === "add_goal_hidden" ? this.setState({ formClass: "add_goal_show" }) : this.setState({ formClass: "add_goal_hidden"})}>Add a New Goal</button>
          {this.props.errors.map(error => {
            return (<div>{error}</div>)
          })}
        </div>
      );
    }
  }
}

export default withRouter(Goal);
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
      return (<div>You have no Goals <button>Create New Goal</button></div>)
    } else {
      return (
        <div>
          <h2>All Your Goals</h2>
          {goals}
          <div className="goal-form-container">
              <form onSubmit={this.createGoal} className={this.state.formClass}>
                <div className="goal-form">
                  <div>
                      <h2>Create a goal</h2>
                  </div>
                  <div>
                      <label>Title
                        <div>
                          <input type="text" value={this.state.title} onChange={this.handleChange("title")}/>
                        </div>
                      </label>
                  </div>
                  <div>
                      <label>Description
                        <div>
                          <textarea value={this.state.body} onChange={this.handleChange("body")}/>
                        </div>
                      </label>
                  </div>
                  <div>
                      <label>How Long do you want to keep this goal going for?
                        <div>
                          <input type="date" value={this.state.date} onChange={this.handleChange("date")}/>
                        </div>
                      </label>
                  </div>
                  <div>
                      <label>How often?
                            <select value={this.state.interval} onChange={this.handleChange}>
                              <option value="grapefruit">Grapefruit</option>
                              <option value="lime">Lime</option>
                              <option value="coconut">Coconut</option>
                              <option value="mango">Mango</option>
                            </select>
                      </label>
                  </div>
                  <button type="submit">Create New Goal!</button>
                </div>
              </form>
              <button onClick={() => this.state.formClass === "add_goal_hidden" ? this.setState({ formClass: "add_goal_show" }) : this.setState({ formClass: "add_goal_hidden"})}>Add a New Goal</button>
              {this.props.errors.map(error => {
                return (<div>{error}</div>)
              })}
                
          </div>

        </div>
      );
    }
  }
}

export default withRouter(Goal);
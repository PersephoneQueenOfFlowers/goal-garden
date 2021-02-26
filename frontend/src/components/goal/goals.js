import React from 'react';
import { withRouter } from 'react-router-dom';
import GoalBox from './goal_box';
import Hero from '../home/hero';

class Goal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { title: "", body: "", date: new Date().toISOString().slice(0, 10), interval: "", formClass: "add_goal_show", addGoalButton: "add new goal"}

    this.createGoal = this.createGoal.bind(this);
    this.showGoalForm = this.showGoalForm.bind(this);
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
                            checkInterval: this.state.interval})
    this.setState({ title: "", body: "", 
      date: new Date().toISOString().slice(0, 10), interval: "", formClass: "add_goal_hidden"})
    setTimeout(() => {
      this.props.fetchGoals();
    }, 300)
  }

  showGoalForm(e){ 
    e.preventDefault();
    this.state.formClass === "add_goal_hidden" ? (
      this.setState({ formClass: "add_goal_show",
                      addGoalButton: "..or maybe not"})
      ) : (
        this.setState({ 
                    formClass: "add_goal_hidden",
                    addGoalButton: "add new goal"
                  })
      )
  }

  render() {
    const goals = this.props.goals.map(goal => {
            return (
              <div className="outer-goalbox-container">
                <GoalBox goal={goal} key={goal._id} removeGoal={this.props.removeGoal}/>
              </div>
            )
        });
    const headerMsg = goals.length === 0 ? "You have no goals." : "All Goals";
      return (
          <div className="body home goal">
            <Hero />
            <section className="middle taskList">
              <img src='./css/images/grass-border.png' alt="" />
              <div className="left">
                <div className="background-container">
                    <div className="present-goals-container">
                     
                      <h4>{headerMsg}</h4>
                     
                        {goals}
                  <button className={this.state.addGoalButton} onClick={(e) => this.showGoalForm(e)}>{this.state.addGoalButton}</button>
                    </div>
                    <div className="new-goal-container">
                      <div className="form-outer-container">
                      <div className="goals-container form-container">
                        <form onSubmit={this.createGoal} className={this.state.formClass}>
                          <div className="form">
                            <div>
                                <h2>Make a new goal</h2>
                            </div>
                            <div>
                                <label>Title
                                  <div>
                                    <input type="text" value={this.state.title} onChange={this.handleChange("title")} />
                                  </div>
                                </label>
                            </div>
                            <div>
                                <label>Description
                                  <div>
                                    <textarea value={this.state.body} onChange={this.handleChange("body")} />
                                  </div>
                                </label>
                            </div>
                            <div>
                                <label>How Long do you want to keep this goal going for?
                                  <div>
                                    <input type="date" value={this.state.date} onChange={this.handleChange("date")} />
                                  </div>
                                </label>
                            </div>
                            <div>
                                <label>How often does this goal occur?(in days)
                                  <div>
                                    <input type="number" value={this.state.interval} onChange={this.handleChange("interval")} min="1" max="365" />
                                  </div>
                                </label>
                            </div>
                                <button type="submit" className="button">Create New Goal!</button>
                          </div>
                        </form>
                        {
                          this.props.errors.map(error => {
                            return (<div>{error}</div>)
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>         
        </div>
      );
  }
}

export default withRouter(Goal);

{/* <h2>All Your Goals</h2>
{ goals }
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
{
  this.props.errors.map(error => {
    return (<div>{error}</div>)
  })
} */}

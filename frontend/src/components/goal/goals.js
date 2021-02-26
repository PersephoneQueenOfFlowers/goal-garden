import React from 'react';
import { withRouter } from 'react-router-dom';
import GoalBox from './goal_box';
import Hero from '../home/hero';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", body: "", date: new Date().toISOString().slice(0, 10), interval: "",formClass: "add_goal_hidden"}
    this.createGoal = this.createGoal.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchGoals();
  }

  handleChange(type){
    return(e => {
      this.setState({[type]: e.currentTarget.value})
    })
  }
  toggleButton(){
    this.state.formClass === "add_goal_hidden" ? this.setState({ formClass: "add_goal_show" }) : this.setState({ formClass: "add_goal_hidden" })
    
  }

  createGoal(e){
    e.preventDefault();
    this.props.composeGoal({body: this.state.body,
                            title: this.state.title,
                            expirationDate: this.state.date,
                            checkInterval: this.state.interval})

    setTimeout(() => {
      if(this.props.errors.length === 0){
        this.setState({ title: "", body: "", 
          date: new Date().toISOString().slice(0, 10), interval: "", formClass: "add_goal_hidden"})
      }
    }, 300)      
                     
    // setTimeout(() => {
    //   this.props.fetchGoals();
    // }, 300)
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
    const buttonClss = this.state.formClass === "add_goal_hidden" ? "show-button" : "hide-button";
      return (
          <div className="body home goal">
            <Hero />
            <section className="middle taskList">
              <img src='./css/images/grass-border.png' alt="" />
              <div className="left">
                <div className="background-container">
                  <h3>
                  <h2>{headerMsg}</h2>
                  </h3>
                    {goals}
                    <button onClick={this.toggleButton} className={buttonClss}>Add a New Goal</button>
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
                            <div className="errors">{this.props.errors[0]}</div>
                            <div>
                                <label>Description
                                  <div>
                                    <textarea value={this.state.body} onChange={this.handleChange("body")} />
                                  </div>
                                </label>
                            </div>
                            <div className="errors">{this.props.errors[1]}</div>
                            <div>
                                <label>How Long do you want to keep this goal going for?
                                  <div>
                                    <input type="date" value={this.state.date} onChange={this.handleChange("date")} />
                                  </div>
                                </label>
                            </div>
                            <div className="errors">{this.props.errors[2]}</div>
                            <div>
                                <label>How often does this goal occur?(in days)
                                  <div>
                                    <input type="number" className="num-input" value={this.state.interval} onChange={this.handleChange("interval")} min="1" max="365" />
                                  </div>
                                </label>
                            </div>
                            <div className="errors">{this.props.errors[3]}</div>
                                <button type="submit" className="button">Create New Goal!</button>
                          </div>
                        </form>
                        {/* {
                          this.props.errors.map(error => {
                            return (<div>{error}</div>)
                          })
                        } */}
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

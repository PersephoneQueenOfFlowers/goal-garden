import React from 'react';
import { withRouter } from 'react-router-dom';
import GoalBox from './goal_box';
import Hero from '../home/hero';

class Goal extends React.Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 1);
    this.date = this.date.toLocaleDateString().split("/");
    if (parseInt(this.date[0]) < 10) {
      this.date[0] = "0" + this.date[0];
    }
    this.realDate = this.date[2] + "-" + this.date[0] + "-" + this.date[1];
    this.state = { title: "", body: "", date: this.realDate, interval: "", formClass: "add_goal_hidden", addGoalButton: "add new goal", errors: []};
    this.createGoal = this.createGoal.bind(this);
    this.showGoalForm = this.showGoalForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchGoals();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {

    this.setState({errors: nextProps.errors})
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
  }

  componentDidUpdate(prevProps){
    if(this.props.goals.length > prevProps.goals.length){
      this.setState({
        title: "", body: "",
        date: this.realDate, interval: "1", formClass: "add_goal_hidden", addGoalButton: "add new goal", errors: []
      });
    }
  }

  showGoalForm(e){ 
    e.preventDefault();
    this.state.formClass === "add_goal_hidden" ? (
      this.setState({ formClass: "add_goal_show",
                      addGoalButton: "..or maybe not today"})
      ) : (
        this.setState({ 
                    formClass: "add_goal_hidden",
                    addGoalButton: "add new goal"
                  })
      )
    this.setState({errors: []});
  }

  render() {
    const goals = this.props.goals.map(goal => {
            return (
              <div className="outer-goalbox-container" key={goal._id}>
                <GoalBox goal={goal} key={goal._id} removeGoal={this.props.removeGoal}/>
              </div>
            )
        });
    const headerMsg = goals.length === 0 ? "You have no goals." : "All Goals";
    
      return (
          <div className="body home goal" id="main-window">
            <Hero />
            <section className="middle taskList">
              <img src='./css/images/grass-border.png' alt="" />
              <div className="left">
                <div className="background-container">
                    <div className="present-goals-container">
                      <h4>{headerMsg}</h4>
                        {goals}
                      <button className='goal-show' onClick={(e) => this.showGoalForm(e)}>{this.state.addGoalButton}</button>
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
                            <div className="errors">{this.state.errors.find(err => err.includes('Title'))}</div>
                            <div>
                                <label>Description
                                  <div>
                                    <textarea value={this.state.body} onChange={this.handleChange("body")} />
                                  </div>
                                </label>
                            </div>
                            <div className="errors">{this.state.errors.find(err => err.includes('Body'))}</div>
                            <div>
                                <label>How Long do you want to keep this goal going for?
                                  <div>
                                    <input type="date" value={this.state.date} onChange={this.handleChange("date")} />
                                  </div>
                                </label>
                            </div>
                            <div className="errors">{this.state.errors.find(err => err.includes('Date'))}</div>
                            <div>
                                <label>How often do you want to check in on this goal?(in days)
                                  <div>
                                    <input type="number" value={this.state.interval} onChange={this.handleChange("interval")} min="1" max="365" />
                                  </div>
                                </label>
                            </div>
                            <div className="errors">{this.state.errors.find(err => err.includes('Interval'))}</div>
                                <button type="submit" className="button">Create New Goal!</button>
                          </div>
                        </form>
              
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



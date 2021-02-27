import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import JournalShowContainer from '../journals/journal_show_container';
import Hero from '../home/hero';
import { getMotivationalMsg } from '../../reducers/selectors';

class GoalShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {journalForm: "journal_form_hidden",
                        success: true,
                        body: "",
                        highlights: "",
                        cues: "",
                        rewards: "",
                        journal: {createdAt: "", body: "", highlights: "", cues: [], rewards: []},
                        journalShow: "journal_goal_hidden",
                        errors: "journal_errors_hidden",
                        motivationalMsg: "motivational_msg_hidden"}
        this.addOrLater = "Add New Journal"
        this.addJournal = this.addJournal.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    componentDidMount(){
        this.props.fetchGoal(this.props.match.params.goalId);
        this.props.fetchJournals(this.props.match.params.goalId)
    }

    addJournal(){
        this.props.createJournal({body: this.state.body,
                                highlights: this.state.highlights,
                                success: this.state.success,
                                cues: this.state.cues,
                                rewards: this.state.rewards,
                                goal: this.props.match.params.goalId}
                            )
        setTimeout(() => {
          if(this.props.errors.length === 0){
            this.setState({ success: true, body: "", highlights: "", cues: "", rewards: "", journalForm: "journal_form_hidden", errors: "journal_errors_hidden"})
            this.props.fetchJournals(this.props.match.params.goalId)
            this.props.fetchGoal(this.props.match.params.goalId);
            this.setState({motivationalMsg: "motivational_msg_show"});
            this.addOrLater = "Add New Journal"
          }else{
            this.setState({errors: "journal_errors_show"})
          }
          
        }, 300)

    }

    handlechange(type){
        return(e => {
            this.setState({[type]: e.currentTarget.value})
        })
    }

    handleButton(type){
      if (type === "create"){
        if (this.state.journalForm === "journal_form_hidden"){
          this.setState({ journalForm: "journal_form_show", journalShow: "journal_goal_hidden", motivationalMsg: "motivational_msg_hidden"})
          this.addOrLater = "Write one Later"
        }else{
          this.setState({ journalForm: "journal_form_hidden", journalShow: "journal_goal_hidden", motivationalMsg: "motivational_msg_hidden" })
          this.addOrLater = "Add New Journal"
        }
      }else{
        this.setState({ journalForm: "journal_form_hidden", journalShow: "journal_goal_show", journal: type, motivationalMsg: "motivational_msg_hidden"})
        this.addOrLater = "Add New Journal"
      }
    }

    render(){
        const { goal, journals } = this.props;
        if (!goal) return null;
        let journalsArr = []
        if(journals !== undefined){
            journalsArr = Object.values(journals)
        }
        return(
          <div>
            <Hero pageClass={"show"} header={goal.title}/>
            <section className="middle taskList">
              <img src='./css/images/grass-border.png' alt=""/>
            <div className="flower_picture_box">
                <div id={`growth${this.props.goal.growthNumber}`} className="flower_picture"></div>
            </div>
              <div className="left" id="goal_show_left">
                <div className="background-container">
                  <Link to="/goals"className="back_link">Back to All Goals</Link>
                <h3>
                    <h2>Goal Details </h2>
                </h3>
                  <p className="goal_description">{goal.body}</p>
                </div>
              </div>
              <div id={this.state.motivationalMsg}>
                <div className={this.state.motivationalMsg}>
                  <div className="msg_box">{getMotivationalMsg()}</div>
                </div>
              </div>
              <div  id={this.state.journalShow}>
                <div className={this.state.journalShow}>
                  <div className="journal_button_div"><button id="journal_button" onClick={() => this.setState({ journalShow: "journal_goal_hidden" })}> X </button></div>
                  {<JournalShowContainer journal={this.state.journal} />}
                </div>
              </div>
              <div id={this.state.journalForm}>
                <form onSubmit={() => this.addJournal()} className={this.state.journalForm}>
                  <div className="journal_radio">
                    <label>Did achieve your goal step?</label>
                    <div className="journal_radio_buttons">
                      <p>Yes I did!
                                      <input type="radio" name="success" value="true" checked={this.state.success} onClick={() => this.setState({ success: true })} />
                      </p>
                      <p>No, but I will next time!
                                      <input type="radio" name="success" value="false" onClick={() => this.setState({ success: false })} />
                      </p>
                    </div>
                  </div>
                  <div className="journal_text_area">
                    <label className="">Journal about your Goal!
                              </label>
                    <textarea className="journal_text_area_input" id="journal_input" value={this.state.body} onChange={this.handlechange("body")} />
                    <div className={this.state.errors}>{this.props.errors[0]}</div>
                  </div>
                  <div className="journal_text_area">
                    <label>Add any highlights:
                              </label>
                    <input type="text" id="journal_input" value={this.state.highlights} onChange={this.handlechange("highlights")} />
                  </div>
                  <div className="journal_text_area">
                    <label>Add any Cues or distractions:</label>
                    <input type="text" id="journal_input" value={this.state.cues} onChange={this.handlechange("cues")} />
                  </div>
                  <div className="journal_text_area">
                    <label>Add any rewards you gave yourself:</label>
                    <input type="text" id="journal_input" value={this.state.rewards} onChange={this.handlechange("rewards")} />
                    <div className="form_journal_button_div">
                      <button className="add_journal_button" type="submit">Create New Journal</button>
                    </div>
                  </div>
                </form>
                <div className="spacer"></div>
              </div>
              <div className="right" id="goal_show_right">
                <div className="goals-container">
                  <div className="journal_right">
                  <h3>Journals</h3>
                  <ul className="goal-list">
                         {journalsArr.map(journal => {
                             return (
                             <div key={journal._id}>
                                 <div onClick={() => this.handleButton(journal)} className="journal_list_item">
                                     {journal.createdAt.slice(0, 10)}{" "}
                                     {journal.success === true ? "Step Success" : "Step Missed"}
                                 </div>
                             </div>)
                        })}
                  </ul>
                  <button className="add_journal_button" onClick={() => this.handleButton("create")}>{this.addOrLater}</button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
    }
}
export default withRouter(GoalShow);

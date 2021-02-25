import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class GoalShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {journalForm: "journal_form_hidden",
                        success: false,
                        body: "",
                        highlights: "",
                        cues: "",
                        rewards: ""}
        this.growth = 0;
        this.addJournal = this.addJournal.bind(this)
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

        this.setState({success: false, body: "", highlights: "", cues: "", rewards: ""})
        setTimeout(() => {
            this.props.fetchJournals(this.props.match.params.goalId)
        }, 300)
    }

    handlechange(type){
        return(e => {
            this.setState({[type]: e.currentTarget.value})
        })
    }

    render(){
        const { goal, journals } = this.props;
        if (!goal) return null;
        let journalsArr = []
        if(journals !== undefined){
            journalsArr = Object.values(journals)
        }
        return(
           <div className="goal_show_component" >
                <div id={`growth${this.growth}`} className="flower_picture"></div>
               <div className="goal_show_info">
                    <h2>{goal.title}</h2>
                    <p>{goal.body}</p>
                    <div>Journals
                            {journalsArr.map(journal => {
                                return (<div>{journal.body}</div>)
                            })}
                    </div>
                    <form onSubmit={() => this.addJournal()} className={this.state.journalForm}>
                        <div className="journal_radio">
                            <label>Did achieve your goal step?
                            <div>
                                 <label>Yes I did!
                                    <input type="radio" name="success" value="true" onClick={() => this.setState({success: true})}/>
                                 </label>
                                <label>No, but I will next time!
                                    <input type="radio" name="success" value="false" onClick={() => this.setState({ success: false })}/>
                                </label>
                            </div>
                            </label>
                        </div>
                        <div className="journal_text_area">
                            <label>Journal about your Goal!
                            </label>
                                <textarea id="journal_input" value={this.state.body} onChange={this.handlechange("body")}/>
                        </div>
                        <div>
                            <label>Add any highlights:
                                <input type="text" id="journal_input" value={this.state.highlights} onChange={this.handlechange("highlights")}/>
                            </label>
                        </div>
                        <div>
                            <label>Add any Cues or distraction seprated by a comma:
                                <input type="text" id="journal_input" value={this.state.cues} onChange={this.handlechange("cues")}/>
                            </label>
                        </div>
                        <label>Add any rewards you gave yourself:
                                <input type="text" id="journal_input" value={this.state.rewards} onChange={this.handlechange("rewards")}/>
                        </label>
                        <button type="submit">Create New Journal</button>
                    </form>
                    <button className="add_journal_button" onClick={() => this.state.journalForm === "journal_form_hidden" ? this.setState({ journalForm: "journal_form_show" }) : this.setState({ journalForm: "journal_form_hidden" })}>Add New Journal</button>
                </div>
           </div>
        )
    }
}
export default withRouter(GoalShow);
import React from 'react'

class JournalShowComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {body: this.props.journal.body, 
                      reflection: this.props.journal.reflection, 
                      errors: "journal_errors_hidden"};
        this.handleDelete = this.handleDelete.bind(this);
        this.editJournal = this.editJournal.bind(this);
    }

    handleDelete(){
        this.props.deleteJournal(this.props.journal._id)
    }

    handleChange(field){
        return(e => {
            this.setState({[field]: e.currentTarget.value})
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.journal._id !== prevProps.journal._id){
            this.setState({ body: this.props.journal.body,
                            reflection: this.props.journal.reflection, 
                            errors:"journal_errors_hidden" });
        }
        else if(this.props.journal.reflection !== prevProps.journal.reflection){
            this.setState({ reflection: this.props.journal.reflection });
        }
    }

    editJournal(){
        this.props.updateJournal({_id: this.props.journal._id, reflection: this.state.reflection });
        this.props.close();
        setTimeout(() => {
            if(this.props.errors.length !== 0){
                this.setState({errors: "journal_errors_show"})
            }
        }, 2000)
    }

    render(){
        if (this.props.journal === undefined) return null
        let success = ""
        let influence = ""
        let rewards = ""
        let body = ""
        let edit= ""
        let reflection = ""
        const  { journal } = this.props 
        // if(this.state.body === undefined && journal.body){
        //     this.setState({ body: journal.body, reflection: journal.reflection });
        // }
        // if(this.state.reflection === undefined && journal.reflection){
        //     this.setState({reflection: journal.reflection});
        // }
        if(journal.success === true){
            success = "Step Achieved!"
            influence = "Cues:"
            rewards = "rewards_true"
            body = (<div>{journal.body}</div>)
            reflection = (<textarea onChange={this.handleChange("reflection")} value={this.state.reflection}/>);
            edit = "journal_edit_show"
            // edit = "journal_edit_hidden"
        }else{
            success = "Step missed"
            influence = "Distractions:"
            rewards = "rewards_false"
            //body = (<textarea onChange={this.handleChange()} value={this.state.body}/>)
            body = (<div>{journal.body}</div>)
            reflection = (<textarea onChange={this.handleChange("reflection")} value={this.state.reflection}/>);
            edit = "journal_edit_show"
        }
        
        return(
            <div>
                <div className="journal_show_component">
                    <div className="journal_header">Journal For {journal.createdAt.slice(0, 10)}
                        <div>{success}</div>
                    </div>
                    <div>
                        <div className="journal_header">Journal Entry:
                            <div>{body}</div>
                        </div>
                        <div className={this.state.errors}>{this.props.errors[0]}</div>
                    </div>
                    <div>
                        <div className="journal_header">Reflection:
                            <div>{reflection}</div>
                        </div>
                    </div>
                    <div>
                        <div className="journal_header">Highlights:
                            <div>{journal.highlights}</div>
                        </div>
                    </div>
                    <div>
                        <div className="journal_header">{influence}
                        <div>{journal.cues.map((cue,i) => {
                            return (<div key={i}>{cue}</div>)
                        })}</div>
                        </div>
                    </div>
                    <div>
                        <div className="journal_header" id={rewards}>Rewards:
                        {/* TODO add conditonal logic to make it appear only on success */}
                        <div>{journal.rewards.map((reward,i) => {
                            return(<div key={i}>{reward}</div>)
                        })}</div>
                        </div>
                    </div>
                    <div id={edit}>
                        <button id="edit_journal_button" onClick={() => this.editJournal()} className={edit}>Update Reflection</button>
                    </div>
                    {/* <button onClick={() => this.handleDelete()}>Delete Journal</button> */}
                </div>
            </div>
        )
    }
}

export default JournalShowComponent;
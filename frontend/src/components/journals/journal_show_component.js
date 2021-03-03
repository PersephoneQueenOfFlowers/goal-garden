import React from 'react'

class JournalShowComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {body: this.props.journal.body}
        this.handleDelete = this.handleDelete.bind(this);
        this.editJournal = this.editJournal.bind(this);
    }

    handleDelete(){
        this.props.deleteJournal(this.props.journal._id)
    }

    handleChange(){
        return(e => {
            let value = e.currentTarget.value
            this.setState({body: e.currentTarget.value})
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.journal._id !== prevProps.journal._id){
            this.setState({body: this.props.journal.body})
        }
    }

    editJournal(){
        this.props.updateJournal({_id: this.props.journal._id, body: this.state.body})
    }

    render(){
        if (this.props.journal === undefined) return null
        let success = ""
        let influence = ""
        let rewards = ""
        let body = ""
        let edit= ""
        const  { journal } = this.props 
        if(this.state.body === undefined && journal.body){
            this.setState({body: journal.body})
        }
        if(journal.success === true){
            success = "Step Achieved!"
            influence = "Cues:"
            rewards = "rewards_true"
            body = (<div>{journal.body}</div>)
            edit = "journal_edit_hidden"
        }else{
            success = "Step missed"
            influence = "Distractions:"
            rewards = "rewards_false"
            body = (<textarea onChange={this.handleChange()} value={this.state.body}/>)
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
                        <div className="journal_header">Rewards:
                        {/* TODO add conditonal logic to make it appear only on success */}
                        <div>{journal.rewards.map((reward,i) => {
                            return(<div key={i}>{reward}</div>)
                        })}</div>
                        </div>
                    </div>
                    <button onClick={() => this.editJournal()} className={edit}>Edit Journal</button>
                    {/* <button onClick={() => this.handleDelete()}>Delete Journal</button> */}
                </div>
            </div>
        )
    }
}

export default JournalShowComponent;
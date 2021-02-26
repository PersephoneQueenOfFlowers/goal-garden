import React from 'react'

class JournalShowComponent extends React.Component {
    constructor(props){
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        // this.props.fetchJournal(this.props.match.params.journalId)
    }

    handleDelete(){
        this.props.deleteJournal(this.props.journal._id)
    }

    render(){
        if (this.props.journal === undefined) return null
        let success = ""
        let influence = ""
        let rewards = ""
        const  { journal } = this.props 
        if(journal.success === true){
            success = "Step Achieved!"
            influence = "Cues:"
            rewards = "rewards_true"
        }else{
            success = "Step missed"
            influence = "Distractions:"
            rewards = "rewards_false"
        }
        
        return(
            <div>
                <div className="journal_show_component">
                    <div className="journal_header">Journal For {journal.createdAt.slice(0, 10)}
                        <div>{success}</div>
                    </div>
                    <div>
                        <div className="journal_header">Journal Entry:
                            <div>{journal.body}</div>
                        </div>
                    </div>
                    <div>
                        <div className="journal_header">Highlights:
                            <div>{journal.highlights}</div>
                        </div>
                    </div>
                    <div>
                        <div className="journal_header">{influence}
                        <div>{journal.cues.map(cue => {
                            return (<div>{cue}</div>)
                        })}</div>
                        </div>
                    </div>
                    <div>
                        <div className="journal_header">Rewards:
                        {/* TODO add conditonal logic to make it appear only on success */}
                        <div>{journal.rewards.map(reward => {
                            return(<div>{reward}</div>)
                        })}</div>
                        </div>
                    </div>
                    {/* <button onClick={() => this.handleDelete()}>Delete Journal</button> */}
                </div>
            </div>
        )
    }
}

export default JournalShowComponent;
import { connect } from "react-redux"
import { fetchJournal, deleteJournal, updateJournal } from "../../actions/journal_actions"
import JournalShowComponent from "./journal_show_component"


const mapStateToProps = (state, ownProps) => {
    let journal = undefined;
    if(state.journal[ownProps.journalId]){
        journal = state.journal[ownProps.journalId];
    }
    else if (state.journal[ownProps.goalId]){
        journal = state.journal[ownProps.goalId][ownProps.journalId];
    }
    return{
        errors: state.errors.journal,
        journal: journal || {createdAt: "", body: "", reflections:"", highlights: "", cues: [], rewards: []}
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // deleteJournal: journalId => dispatch(deleteJournal(journalId))
        updateJournal: journal => dispatch(updateJournal(journal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalShowComponent)
import { connect } from "react-redux"
import { fetchJournal, deleteJournal, updateJournal } from "../../actions/journal_actions"
import JournalShowComponent from "./journal_show_component"


const mapStateToProps = (state, ownProps) => {
    return{
        
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // deleteJournal: journalId => dispatch(deleteJournal(journalId))
        updateJournal: journal => dispatch(updateJournal(journal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalShowComponent)
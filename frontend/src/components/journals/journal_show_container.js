import { connect } from "react-redux"
import { fetchJournal, deleteJournal } from "../../actions/journal_actions"
import JournalShowComponent from "./journal_show_component"


const mapStateToProps = (state, ownProps) => {
    return{
        
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // deleteJournal: journalId => dispatch(deleteJournal(journalId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalShowComponent)
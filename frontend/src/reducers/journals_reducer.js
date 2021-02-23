import { RECEIVE_GOALS_JOURNALS, RECEIVE_JOURNAL, REMOVE_JOURNAL } from "../actions/journal_actions";


const JournalsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_GOALS_JOURNALS:
            return action.journals
        case RECEIVE_JOURNAL:
            newState[action.journal.id] = action.journal
            return newState;
        case REMOVE_JOURNAL:
            delete newState[action.journalId]
            return newState
        default:
            return oldState;
    }
}

export default JournalsReducer;
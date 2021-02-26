import { RECEIVE_GOALS_JOURNALS, RECEIVE_JOURNAL, RECEIVE_JOURNAL_ERRROS } from "../actions/journal_actions";

const _nullErrors = [];

const JournalErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_JOURNAL_ERRROS:
            return Object.values(action.errors);
        case RECEIVE_JOURNAL:
            return _nullErrors;
        case RECEIVE_GOALS_JOURNALS:
            return _nullErrors;
        default:
            return state;
    }
};

export default JournalErrorsReducer;
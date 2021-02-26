import { combineReducers } from 'redux';
import GoalErrorsReducer from './goal_errors_reducer';
import JournalErrorsReducer from './journals_errors_reducer';

import SessionErrorsReducer from './session_errors_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    goal: GoalErrorsReducer,
    journal: JournalErrorsReducer
})
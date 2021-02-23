import { combineReducers } from 'redux';
import session from './session_api_reducer.js';
import errors from './errors_reducer'
import journal from './journals_reducer'

const RootReducer = combineReducers({
    session,
    errors,
    journal,
});

export default RootReducer;
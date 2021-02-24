import { combineReducers } from 'redux';
import session from './session_api_reducer.js';
import errors from './errors_reducer';
import goals from './goals_reducer';

const RootReducer = combineReducers({
    session,
    errors,
    goals
});

export default RootReducer;
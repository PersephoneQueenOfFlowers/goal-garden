import { combineReducers } from 'redux';
import session from './session_api_reducer.js';
<<<<<<< HEAD
import errors from './errors_reducer';
import goals from './goals_reducer';
=======
import errors from './errors_reducer'
import journal from './journals_reducer'
>>>>>>> master

const RootReducer = combineReducers({
    session,
    errors,
<<<<<<< HEAD
    goals
=======
    journal,
>>>>>>> master
});

export default RootReducer;
import { RECEIVE_GOALS, RECEIVE_GOAL } from '../actions/goal_actions';
  
  const GoalsReducer = (state = {all: {}, user: {}, new: undefined}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_GOALS:
        newState.all = action.goals.data; 
        return newState;
      // case RECEIVE_GOAL:
      //   newState = action.goal.data; 
      //   return newState;
      default:
        return state;
    }
  };
  
  export default GoalsReducer;
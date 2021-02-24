import { RECEIVE_GOALS, RECEIVE_GOAL, REMOVE_GOAL } from '../actions/goal_actions';
  
  // const GoalsReducer = (state = {all: {}, user: undefined, new: undefined}, action) => {
  const GoalsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
      case RECEIVE_GOALS:
        // newState.all = action.goals.data; 
        let goal;
        for(let i=0; i< action.goals.data.length;i++){
          goal = action.goals.data[i];
          newState[goal._id] = goal; 
        }
        return newState;
      case RECEIVE_GOAL:
        // newState.user = action.goal.data; 
        newState[action.goal.data._id] = action.goal.data; 
        return newState;
      case REMOVE_GOAL:
        // newState.use = undefined;
        delete newState[action.goalId];
        return newState;
      default:
        return state;
    }
  };
  
  export default GoalsReducer;
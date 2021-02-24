
import { getGoals, writeGoal, getGoal } from '../util/goal_api_util';


export const RECEIVE_GOALS = "RECEIVE_GOALS";
export const RECEIVE_GOAL = "RECEIVE_GOAL";



export const receiveGoals = goals => ({
  type: RECEIVE_GOALS,
  goals
});

export const receiveGoal = goal => ({
  type: RECEIVE_GOAL,
  goal
});


export const fetchGoals = () => dispatch => (
  getGoals()
    .then(goals => dispatch(receiveGoals(goals)))
    .catch(err => console.log(err))
);

export const fetchGoal = id => dispatch => (
  getGoal(id)
    .then(goal => dispatch(receiveGoal(goal)))
    .catch(err => console.log(err))
);

export const composeGoal = data => dispatch => (
  writeGoal(data)
    .then(goal => dispatch(receiveGoal(goal)))
    .catch(err => console.log(err))
);

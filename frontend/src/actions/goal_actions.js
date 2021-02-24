
import { getGoals, writeGoal, getGoal } from '../util/goal_api_util';


export const RECEIVE_GOALS = "RECEIVE_GOALS";
export const RECEIVE_GOAL = "RECEIVE_GOAL";
export const RECEIVE_GOAL_ERRORS = "RECEIVE_GOAL_ERRORS"



export const receiveGoals = goals => ({
  type: RECEIVE_GOALS,
  goals
});

export const receiveGoal = goal => ({
  type: RECEIVE_GOAL,
  goal
});

export const receiveGoalErrors = errors => ({
  type: RECEIVE_GOAL_ERRORS,
  errors
})



export const fetchGoals = () => dispatch => (
  getGoals()
    .then(goals => dispatch(receiveGoals(goals)))
    .catch(err => console.log(err))
);

export const fetchGoal = id => dispatch => (
  getGoal(id)
    .then(goal => dispatch(receiveGoal(goal)))
    .catch(err => console.log(err.response.data))
);

export const composeGoal = data => dispatch => (
  writeGoal(data)
    .then(goal => dispatch(receiveGoal(goal)))
    .catch(err => dispatch(receiveGoalErrors(err.response.data)))
);

import { RECEIVE_GOAL, RECEIVE_GOALS, RECEIVE_GOAL_ERRORS } from "../actions/goal_actions";

const _nullErrors = [];

const GoalErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_GOAL_ERRORS:
            return Object.values(action.errors);
        case RECEIVE_GOAL:
            return _nullErrors;
        case RECEIVE_GOALS:
            return _nullErrors;
        default:
            return state;
    }
};

export default GoalErrorsReducer;
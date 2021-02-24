import { RECEIVE_GOAL, RECEIVE_GOAL_ERRORS } from "../actions/goal_actions";

const _nullErrors = [];

const GoalErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_GOAL_ERRORS:
            return action.errors;
        case RECEIVE_GOAL:
            return _nullErrors;
        default:
            return state;
    }
};

export default GoalErrorsReducer;
import { connect } from 'react-redux';

import { fetchGoal } from '../../actions/goal_actions';
import GoalShow from './goal_show';

const mapStateToProps = (state, { match }) => {
  const goal = state.goals[match.params.goalId];
  return {
    goal
  };
};

const mapDispatchToProps = dispatch => ({
  fetchGoal: id => dispatch(fetchGoal(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalShow);
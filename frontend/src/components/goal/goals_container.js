import { connect } from 'react-redux';
import { composeGoal, fetchGoals } from '../../actions/goal_actions';
import Goals from './goals';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    goals: Object.values(state.goals.all),
    errors: state.errors.goal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGoals: () => dispatch(fetchGoals()),
    composeGoal: goal => dispatch(composeGoal(goal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);







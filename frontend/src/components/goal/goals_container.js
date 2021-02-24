import { connect } from 'react-redux';
import { fetchGoals } from '../../actions/goal_actions';
import Goals from './goals';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user,
    goals: Object.values(state.goals.all)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGoals: () => dispatch(fetchGoals())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Goals);







import { connect } from 'react-redux';

import { fetchGoal } from '../../actions/goal_actions';
import { createJournal, fetchJournals } from '../../actions/journal_actions';
import GoalShow from './goal_show';

const mapStateToProps = (state, ownProps) => {
  return {
    goal: state.goals[ownProps.match.params.goalId],
    journals: state.journal[ownProps.match.params.goalId],
  };
};

const mapDispatchToProps = dispatch => ({
  fetchGoal: id => dispatch(fetchGoal(id)),
  fetchJournals: goalId => dispatch(fetchJournals(goalId)),
  createJournal: journal => dispatch(createJournal(journal))

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalShow);
import { connect } from 'react-redux';
import { removeUsersGoals } from '../../actions/goal_actions';
import { logout, login } from '../../actions/session_actions';
import Nav from './nav';

const mSTP = state => {
    return {
        currentUser: state.session.user
    }
}
const mDTP = dispatch => {
    return {
        logout: () => dispatch(logout()),
        login: (user) => dispatch(login(user)),
        removeGoals: () => dispatch(removeUsersGoals())
    }
}

export default connect(mSTP, mDTP)(Nav);
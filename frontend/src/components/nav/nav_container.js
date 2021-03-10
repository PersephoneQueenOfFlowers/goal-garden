import { connect } from 'react-redux';
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
        login: (user) => dispatch(login(user))
    }
}

export default connect(mSTP, mDTP)(Nav);
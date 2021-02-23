import { connect } from "react-redux";
import Home from './home';

const mSTP = (state, ownProps) => {
  return {
    item: state.entities.items[ownProps.match.params.itemId]
  }
}

export default connect(mSTP,null)(Home)
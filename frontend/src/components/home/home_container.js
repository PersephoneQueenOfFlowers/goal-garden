import { connect } from "react-redux";
import Home from './home';

const mSTP = (state, ownProps) => {
  return {
    modal: ownProps.modal,
    setModalShow: ownProps.setModalShow,
    modalShow: ownProps.modalShow
  }
}

export default connect(mSTP,null)(Home)
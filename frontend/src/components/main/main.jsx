
import React from 'react';
import HomeContainer from '../home/home_container'
import Nav from '../nav/nav';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}
function Main(props) {

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="main-container">
      <Nav />
      <HomeContainer modalShow={modalShow} setModalShow={setModalShow} modal={MyVerticallyCenteredModal}/>
    </div>
  );
}

export default Main;
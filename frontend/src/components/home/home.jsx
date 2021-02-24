import React, { Component } from 'react'
import Hero from './hero';
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

const Home = (props) => {

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="body home">
        
        <Hero />

      <section className="middle taskList">
        <img src='./css/images/grass-illust.png' alt=""/>
        <div className="left">
          <div className="background-container">
            <h3>
              Here you can:
          </h3>
            <ul>
              <li>Create goals and track your progress</li>
              <li>keep a journal attached to each goal</li>
              <li>receive reminder notifications</li>
              <li>celebrate your progress and success!</li>
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="goals-container">
            <h3>Current Goals</h3>
            <ul className="goal-list">
              <li className="goalTitle"><button onClick={() => setModalShow(true)}>clean out the garage</button></li>
              <li className="goalTitle"><button onClick={() => setModalShow(true)}>build a new dog house</button></li>
              <li className="goalTitle"><button onClick={() => setModalShow(true)}>go shopping</button></li>
              <li className="goalTitle"><button onClick={() => setModalShow(true)}>start on the novel</button></li>
              <li className="goalTitle"><button onClick={() => setModalShow(true)}>paint the kitchen</button></li>
            </ul>
          </div>
        </div>
      </section>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default Home;



import React, { Component } from 'react'
import Hero from './hero';
import Modal from 'react-bootstrap/Modal';

const goals = {
  clean: {
    body: "clean out the garage",
    journals: [
      "First, I'll get all the old rags and clothes, recycle and donate them.",
      "then I have to either fix the old truck sitting there, or get rid of it",
      "rearrange the tool area",
      "hang up storage",
      "redo the floor"
    ]
  },
  build: {
    body: "build a new dog house",
    journals: [
      "First, I'll need to go on youtube and find the tutorial that makes the most sense, watch that and take some next steps notes.",
      "Make a materials, list, then get out to the lumber store and buy all the materials",
      "Plan for a day when it's dry out and get the thing built"
    ]
  },
  go: {
    body: "go shopping",
    journals: [
      "Get some food"
    ]
  },
  start: {
    body: "start on the novel",
    journals: ["decide on a topic",
      "make an outline",
      "write a two-page version and see if I want to do more"
    ]
  },
  paint: {
    body: "paint the kitchen",
    journals: [
      "Decide on a color, get a consultation if I can't make up my mind",
      "Make a materials list, then get out to the paint store and buy all the materials",
      "Plan for a day when it's dry so the paint dries and get the thing painted"
    ]
  }
};

class MyVerticallyCenteredModal extends React.Component {
  constructor(props){
    super(props)
    this.props = props
    this.state = {};
    this.state.goals = goals;
    this.state.key = this.props.modalkey;
    this.state.goal = this.state.goals[this.props.modalkey];
    this.state.journal_entry = "";
  }

  componentDidUpdate(){
    if(this.state.key !== this.props.modalkey){
      this.setState({
        key: this.props.modalkey,
        goal: this.state.goals[this.props.modalkey],
        journal_entry: ""
      })
    }
  }

  addJournal(e){
    e.preventDefault();
    const curr_goal = this.state.goals[this.state.key];
    curr_goal.journals.push(this.state.journal_entry);
    this.setState({ journal_entry: "" });
  }

  updateField(field){
    return (e) => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  render(){
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Current Goal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>  

          <h4>{this.state.goal.body}</h4>
          {this.state.goal.journals.map(function (journal, idx) {
            return <p key={idx}>{journal}</p>;
          })}
        
            <form>
              <input 
                type="textarea" 
                value={this.state.journal_entry}
                onChange={this.updateField("journal_entry")}
              />
              <input 
                type="button" 
                value="add journal"
                onClick={(e) => this.addJournal(e)}  
              />
            </form>
    
        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const Home = (props) => {

  const [modalShow, setModalShow] = React.useState(false);
  const [modalKey, setModalKey] = React.useState('clean');

  const setModal = (e) => {
    e.preventDefault();

    setModalKey(e.target.value);
    setModalShow(true);
  }

  return (
    <div className="body home">
        
        <Hero />

      <section className="middle taskList">
        <img src='./css/images/grass-border.png' alt=""/>
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
              {
                Object.keys(goals).map( (goalKey, idx) =>{
                  const goal = goals[goalKey];
                  return (
                    <li key={idx} className={`goalTitle ${goalKey}`}>
                      <button value={goalKey} onClick={(e) => setModal(e)}>
                        {goal.body}
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </section>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalkey={modalKey}
      />
    </div>
  )
}

export default Home;



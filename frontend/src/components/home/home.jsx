import React, { Component } from 'react'
import Hero from './hero';
import Modal from 'react-bootstrap/Modal';

const goals = {
  clean: {
    body: "clean out the garage",
    description: "This has been coming for years. Rags, clothes, old truck, tool area, storage, the floor; it's all gotta get done",
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
    description: "Poor Spot has been sleeping under the porch for 6 months now and winter's coming soon. He's kinda stinky",
    journals: [
      "First, I went on youtube and found a great tutorial that makes the most sense, watched that and took some notes.",
      "Made a materials, list, then went out to the lumber store and bought all the materials",
      "Found a day on the calendar when it's dry out and got the thing built!!"
    ]
  },
  go: {
    body: "go clothes shopping",
    description: "for all the winter clothes shopping, I'll need to pick up duck boots, warm clothes, longjohns, and new X-country skis",
    journals: [
      "got winter boots"
    ]
  },
  start: {
    body: "start on the novel",
    description: "this is a big one: been thinking about for years, and just procrastinating! It's definitely going to take some research, maybe a year's worth, then I'll get going on the steps. ",
    journals: [
      "decided on a topic",
      "made an outline",
      "wrote a two-page version and see if I want to do more"
    ]
  },
  paint: {
    body: "paint the kitchen",
    description: "the kitchen is the heart of the home. It's where everyone gathers and a place that imprints on us our mood for the day. Let's give it a color upgrade!",
    journals: [
      "Decided on a color, got a consultation since couldn't decide. Now, I'm psyched!",
      "Made a materials list, then headed to the paint store to buy all the materials",
      "Waiting for a day when it's dry so the paint dries and get the thing painted. Weather report says Sunday!"
    ]
  }
};

class MyVerticallyCenteredModal extends React.Component {
  constructor(props){
    super(props)
    this.props = props
    this.state = {
      journalForm: "journal_form_hidden",
      success: true,
      body: "",
      highlights: "",
      cues: "",
      rewards: "",
      journal: { createdAt: "", body: "", highlights: "", cues: [], rewards: [] },
      journalShow: "journal_goal_hidden",
      errors: "journal_errors_hidden",
      goals: goals,
      key: this.props.modalkey,
      goal: goals[this.props.modalkey],
      journal_entry: "",
    }
    this.addOrLater = "Add New Journal";
    this.handleButton = this.handleButton.bind(this);
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
    if(this.state.journal_entry === ""){
      this.setState({errors: "journal_errors_show"})
    }else{
      const curr_goal = this.state.goals[this.state.key];
      curr_goal.journals.push(this.state.journal_entry);
      this.setState({ journal_entry: "", journalForm: "journal_form_hidden", highlights: "", cues: "", rewards: "", errors: "journal_errors_hidden"});
      this.addOrLater = "Add New Journal";
    }
  }

  updateField(field){
    return (e) => {
      this.setState({ [field]: e.currentTarget.value })
    }
  }

  handlechange(type) {
    return (e => {
      this.setState({ [type]: e.currentTarget.value })
    })
  }

  handleButton(type) {
    if (type === "create") {
      if (this.state.journalForm === "journal_form_hidden") {
        this.setState({ journalForm: "journal_form_show", journalShow: "journal_goal_hidden" })
        this.addOrLater = "Write one Later"
      } else {
        this.setState({ journalForm: "journal_form_hidden", journalShow: "journal_goal_hidden" })
        this.addOrLater = "Add New Journal"
      }
    } else {
      this.setState({ journalForm: "journal_form_hidden", journalShow: "journal_goal_show", journal: type })
      this.addOrLater = "Add New Journal"
    }
  }

  render(){
    if(!this.state.goals){ return null}
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          <h4>{this.state.goal.body}</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>  
          <div className="left">
            {this.state.goal.journals.map(function (journal, idx) {
              return <p key={idx}>{journal}</p>;
            })}
            <button className="add_journal_button" onClick={() => this.handleButton("create")}>{this.addOrLater}</button>
          </div>
          <div className="right">
          <form id={this.state.journalForm} onSubmit={(e) => this.addJournal(e)} className={this.state.journalForm}>
              <div className="journal_radio">
                  <label>Did achieve your goal step?</label>
                  <div className="journal_radio_buttons">
                        <p>Yes I did!
                          <input type="radio" name="success" value="true" defaultChecked onClick={() => this.setState({success: true}) }/>
                        </p>
                      <p>No, but I will next time!
                          <input type="radio" name="success" value="false" onClick={() => this.setState({ success: false })}/>
                      </p>
                  </div>
              </div>
              <div className="journal_text_area">
                  <label className="">Journal about your Goal!
                  </label>
                <textarea className="journal_input" id="journal_input" value={this.state.journal_entry} onChange={this.updateField("journal_entry")} /> 
                <div className={this.state.errors}>Journal can not be blank.</div>
              </div>
              <div className="journal_text_area">
                  <label>Add any highlights:
                  </label>
                  <input
                    type="textarea"
                    value={this.state.highlights}
                    onChange={this.handlechange("highlights")}
                  />
              </div>
              <div className="journal_text_area">
                  <label>Add any Cues or distractions:</label>
                  <input type="text" id="journal_input" value={this.state.cues} onChange={this.handlechange("cues")}/>
              </div>
              <div className="journal_text_area">
              <label>Add any rewards you gave yourself:</label>
              <input type="text" id="journal_input" value={this.state.rewards} onChange={this.handlechange("rewards")} />
              <div className="form_journal_button_div">
                  <button className="add_journal_button" type="submit">Create New Journal</button>
              </div>
              </div>
          </form>            
          </div>
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
        <div className="left hide">
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
            <h3>Demo Goals</h3>
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



import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      password: '',
      errors: {}
    };
    this.user = ""
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.login(this.user)
      this.user = ""
      // this.props.history.push('/login'); 
    }

    this.setState({errors: nextProps.errors})
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password
    };
    this.props.signup(user, this.props.history);
    this.user = user 
  }

  // renderErrors() {
  //   return(
  //     <ul>
  //       {Object.keys(this.state.errors).map((error, i) => (
  //         <li key={`error-${i}`}>
  //           {this.state.errors[error]}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  render() {
    return (
      <div className="session-window">
        <div className="signup-form-container">
          <form onSubmit={this.handleSubmit} >
            <div className="signup-form" id="session-form">
              <div>
                <h2>Create an account</h2>
              </div>
              <div>
                <label>First name
                  <div>
                    <input type="text"
                      value={this.state.firstName}
                      onChange={this.update('firstName')}
                      autoFocus="autofocus"
                    />
                  </div>
                </label>
              </div>
              <div className="errors">
                {this.state.errors.firstName}
              </div>
              <div>
                <label>Email address
                    <div>
                        <input type="text"
                          value={this.state.email}
                          onChange={this.update('email')}
                        />
                    </div>
                </label>
              </div>
              <div className="errors">
                {this.state.errors.email}
              </div>
              <div>
                    <label>Password
                        <div>
                            <input type="password"
                              value={this.state.password}
                              onChange={this.update('password')}
                            />
                      
                        </div>
                    </label>
              </div>
              <div className="errors">
                {this.state.errors.password}
              </div>
            
              <button type="submit" className="signup-button">Sign up</button>
              <div>
                <p>Have an account? <Link to="/login">Sign in instead</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
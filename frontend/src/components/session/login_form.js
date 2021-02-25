import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.renderErrors = this.renderErrors.bind(this);
  }

  // Once the user has been authenticated, redirect to the goals page
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/goals');
    }

    // Set or clear errors
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
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user); 
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
      <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <div>
              <h2>Sign in</h2>
            </div>
        
            <div>
              <label>Email address
                <div>
                    <input type="text"
                      value={this.state.email}
                      onChange={this.update('email')}
                      autoFocus="autofocus"
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
            <button type="submit" className="login-button button">Sign in</button>
            <div>
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
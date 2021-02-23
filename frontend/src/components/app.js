import React from 'react';
import Main from './main/main';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
const App = () => {
    return(
        <div>
            <Switch>
              <AuthRoute exact path="/" component={Main} />
              <AuthRoute exact path="/login" component={LoginFormContainer} />
              <AuthRoute exact path="/signup" component={SignupFormContainer} />

              {/* <ProtectedRoute exact path="/goals" component={GoalsContainer} /> */}
              {/* <ProtectedRoute exact path="/profile" component={ProfileContainer} /> */}
              {/* <ProtectedRoute exact path="/new_goal" component={GoalComposeContainer} /> */}

              {/* <Route exact path="/" component={Main} /> */} 
              <Redirect to="/" />
            </Switch>
        </div>
    )
};


export default App;

//  <AuthRoute path="/signup" component={SignupContainer} /> TODO
//               <AuthRoute path="/login" component={LoginContainer} />
//               <Route path="/show/:id" component={ShowContainer} />
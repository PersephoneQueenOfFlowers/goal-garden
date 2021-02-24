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
import GoalsContainer from './goal/goals_container';
import GoalShowContainer from './goal/goal_show_container';

const App = () => {
    return(
        <div>
            <Switch>
              <AuthRoute exact path="/" component={Main} />
              <AuthRoute exact path="/login" component={LoginFormContainer} />
              <AuthRoute exact path="/signup" component={SignupFormContainer} />

              {/* <ProtectedRoute exact path="/goals/:goalId" component={GoalShowContainer} /> */}
              <ProtectedRoute exact path="/goals" component={GoalsContainer} />
              <Redirect to="/" />
            </Switch>
        </div>
    )
};


export default App;

//  <AuthRoute path="/signup" component={SignupContainer} /> TODO
//               <AuthRoute path="/login" component={LoginContainer} />
//               <Route path="/show/:id" component={ShowContainer} />
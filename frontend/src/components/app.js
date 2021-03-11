import React from 'react';
import Main from './main/main';
import NavContainer from './nav/nav_container';
import Footer from './footer/footer';
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
import JournalShowContainer from './journals/journal_show_container';
import GoalShowContainer from './goal/goal_show_container';

const App = () => {
    return(
        <div>
          <NavContainer />
            <Switch>
              <AuthRoute exact path="/" component={Main} />
              <AuthRoute exact path="/login" component={LoginFormContainer} />
              <AuthRoute exact path="/signup" component={SignupFormContainer} />

              <ProtectedRoute exact path="/goals/:goalId" component={GoalShowContainer} />
              <ProtectedRoute exact path="/goals" component={GoalsContainer} />

              <ProtectedRoute exact path="/journal/:journalId" component={JournalShowContainer} />

              <Redirect to="/" />
            </Switch>
          <Footer />
        </div>
    )
};


export default App;

//  <AuthRoute path="/signup" component={SignupContainer} /> TODO
//               <AuthRoute path="/login" component={LoginContainer} />
//               <Route path="/show/:id" component={ShowContainer} />
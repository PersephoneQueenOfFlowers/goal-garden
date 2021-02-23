import React from 'react';
import Main from './main/main';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
const App = () => {
    return(
        <div>
            <Switch>
              <Route exact path="/" component={Main} />
              <Redirect to="/" />
            </Switch>
        </div>
    )
};


export default App;

//  <AuthRoute path="/signup" component={SignupContainer} /> TODO
//               <AuthRoute path="/login" component={LoginContainer} />
//               <Route path="/show/:id" component={ShowContainer} />
// import React, { Component } from 'react';
// import {
//   Link
// } from 'react-router-dom';

// export default class Nav extends Component {
//   render() {
//     return (
//       <section className="nav">
//        <div className="left">left side nav logo</div> 
//         <div className="right">
//           <Link className="button" to="/login">Login</Link>{' '}
//           <Link className="button" to="/signup">Signup</Link>{' '}
//          </div>
//       </section>
//     )
//   }
// }

import React from 'react';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';


const Nav = ({ currentUser, logout, history }) => {

    const redirect = () => {
        logout();
        history.push(`/`);
    }

    const sessionLink = () => (
        <nav className="login-signup">
             <Link className="button" to="/login">Login</Link>
             <Link className="button" to="/signup">Signup</Link>
        </nav>
    );
    const personalGreeting = () => (
        <div className="header-greeting">
            <h2 className="header-name">Hi, {currentUser.firstName}!</h2>
            <button className="logout-btn" onClick={redirect}>Log out</button>
        </div>
    );

    if( currentUser ){
        if(currentUser.id !== undefined){
            return (personalGreeting(currentUser, logout))
        }else{
            return (sessionLink())
        }
    }else{
        return (sessionLink())
    }

    // return (
    //     currentUser ?
    //         personalGreeting(currentUser, logout) :
    //         sessionLink()
    // );
};

export default withRouter(Nav);

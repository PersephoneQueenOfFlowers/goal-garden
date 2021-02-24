import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <section className="nav">
       <div className="left">left side nav logo</div> 
        <div className="right">
          <Link className="button" to="/">Login</Link>{' '}
          <Link className="button" to="/signup">Signup</Link>{' '}
         </div>
      </section>
    )
  }
}

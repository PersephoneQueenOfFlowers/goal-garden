import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';

import configureStore from './store/store';

import jwt_decode from 'jwt-decode';

import { setAuthToken } from "./util/session_api_util"

import { login, logout, signup } from './actions/session_actions';
import { createJournal, deleteJournal, fetchJournal, fetchJournals } from './actions/journal_actions';


document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {

    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    store = configureStore({});
  }
  const root = document.getElementById('root');

  window.store = store;
  window.dispatch = store.dispatch;

  window.login = login;
  window.logout = logout;

  window.fetchJournals = fetchJournals;
  window.fetchJournal = fetchJournal;
  window.createJournal = createJournal;
  window.deleteJournal = deleteJournal;

  ReactDOM.render(<Root store={store} />, root);
});
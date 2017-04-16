import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import MainView from './components/MainView';
import MyTrip from './components/MyTrip';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';


export default(
  <Route path="/" component={App} >
    <IndexRoute component={LoginPage} />
    <Route path="/UserPage" component={UserPage}>
      <IndexRoute component={MyTrip} />
      <Route path="NewTrip" component={MainView} />
    </Route>

    <Route path="LoginPage" component={LoginPage} />
    <Route path="*" component={MyTrip} />
  </Route>
);

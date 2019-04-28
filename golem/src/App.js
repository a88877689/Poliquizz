import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from '@/containers/Layout/Layout';
import Login from '@/containers/Login/Login';
import store from './store';

const app = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/' component={Layout} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default app;

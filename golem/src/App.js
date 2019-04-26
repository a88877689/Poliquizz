import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '@/containers/Layout/Layout';
import Login from '@/containers/Login/Login';

const app = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Layout} />
      </Switch>
    </Router>
  );
}

export default app;

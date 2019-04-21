import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from '@/containers/Layout/Layout';
import Login from '@/containers/Login/Login';

const app = () => {
  return (
    <Router>
      <Route path='/login' component={Login} />
      <Route path='/' component={Layout} />
    </Router>
  );
}

export default app;

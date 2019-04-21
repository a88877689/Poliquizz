import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AsyncComponent from '@/high-order-components/AsyncComponent';
// import Layout from '@/containers/Layout/Layout';
import Login from '@/containers/Login/Login';


const AsyncLayout = AsyncComponent(() => {
  return import('./containers/Layout/Layout');
});

const app = () => {
  return (
    <Router>
      <Route path='/login' component={Login} />
      <Route path='/' component={AsyncLayout} />
    </Router>
  );
}

export default app;

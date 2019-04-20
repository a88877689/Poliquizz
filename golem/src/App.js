import React from 'react';
import Layout from '@/containers/Layout/Layout';
import Login from '@/containers/Login/Login';

const app = () => {
  const authorization = true;
  const view = authorization ? <Layout /> : <Login />;
  return view;
}

export default app;

import React from 'react';
import './Resources/css/app.css';
import {Switch } from 'react-router-dom';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';

import Layout from './components/Hoc/Layout';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/admin/Dashboard';

const App = (props) =>  {
  return (
    <div className="App">
      <Layout >
        <Switch>
          <PublicRoute restricted={false} {...props} exact path="/" component={Home}/>
          <PublicRoute restricted={true} {...props} exact path="/signin" component={SignIn}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard} {...props}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
 
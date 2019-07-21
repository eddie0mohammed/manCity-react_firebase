import React from 'react';
import './Resources/css/app.css';
import {Switch, Route } from 'react-router-dom';

import Layout from './components/Hoc/Layout';
import Home from './components/Home/Home';

const App = (props) =>  {
  return (
    <div className="App">
      <Layout >
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
 
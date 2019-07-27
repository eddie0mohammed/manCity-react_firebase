import React from 'react';
import './Resources/css/app.css';
import {Switch } from 'react-router-dom';
import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';

import Layout from './components/Hoc/Layout';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches/matches';
import AddEditMatch from './components/admin/matches/addEditMatch';
import AdminPlayers from './components/admin/players/players';
import AddEditPlayers from './components/admin/players/addEditPlayers';
import TheTeam from './components/TheTeam/TheTeam';
import TheMatches from './components/TheMatches/TheMatches';
import NotFound from './components/UI/not_found';


const App = (props) =>  {
  return (
    <div className="App">
      <Layout >
        <Switch>
          <PublicRoute restricted={false} {...props} exact path="/" component={Home}/>
          <PublicRoute restricted={false} {...props} exact path="/the_team" component={TheTeam}/>
          <PublicRoute restricted={false} {...props} exact path="/the_matches" component={TheMatches}/>
          <PublicRoute restricted={true} {...props} exact path="/signin" component={SignIn}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard} {...props}/>
          <PrivateRoute exact path="/admin_matches" component={AdminMatches} {...props}/>
          <PrivateRoute exact path="/admin_matches/edit_match/:id" component={AddEditMatch} {...props}/>
          <PrivateRoute exact path="/admin_matches/edit_match/" component={AddEditMatch} {...props}/>
          <PrivateRoute exact path="/admin_players" component={AdminPlayers} {...props}/>
          <PrivateRoute exact path="/admin_players/add_players" component={AddEditPlayers} {...props}/>
          <PrivateRoute exact path="/admin_players/add_players/:id" component={AddEditPlayers} {...props}/>
          <PublicRoute component={NotFound}/>


        </Switch>
      </Layout>
    </div>
  );
}

export default App;
 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Confirmation from './components/Confirmation.jsx';
import Register from './components/Register.jsx';
import SearchEngine from './components/pure/SearchEngine.jsx';
import UserManager from './components/UserManager.jsx';
import './css/normalize.css';
import ReservationManager from './components/ReservationManager.jsx';
import RoomManager from './components/RoomManager.jsx';
import StatsManager from './components/StatsManager.jsx';
import LeaveFeedback from './components/LeaveFeedback.jsx';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/feedback' component={LeaveFeedback} />
          <Route path='/admin/users' component={UserManager} />
          <Route path='/admin/reservation' component={ReservationManager} />
          <Route path='/admin/rooms/usage' component={StatsManager} />
          <Route path='/admin/rooms' component={RoomManager} />
          <Route path='/confirmation' component={Confirmation} />
          <Route path='/search/:location?/:capacity?/:begin?/:end?/:equipment?/:type?' component={SearchEngine} />
          <Redirect from='*' to='/'/>
        </Switch>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default withRouter(connect(mapStateToProps)(App));

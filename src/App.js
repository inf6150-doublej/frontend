import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Confirmation from './components/Confirmation.jsx';
import Register from './components/Register.jsx';
import SearchEngine from './components/pure/SearchEngine.jsx';
import UserManager from './components/UserManager.jsx';
import './css/normalize.css';
import ReservationManager from './components/ReservationManager.jsx';
import RoomManager from './components/RoomManager.jsx';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/admin/users' component={UserManager} />
          <Route path='/admin/reservation' component={ReservationManager} />
          <Route path='/admin/rooms' component={RoomManager} />
          <Route path='/confirmation' component={Confirmation} />
          <Route path='/search/:capacity?/:begin?/:end?/:equipment?/:type?' component={SearchEngine} />
          <Route path='*' component={Home}/>
        </Switch>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default withRouter(connect(mapStateToProps)(App));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Admin from './components/Admin.jsx';
import Home from './components/Home.jsx';
import Confirmation from './components/Confirmation';
import Register from './components/Register.jsx';
import SearchEngine from './components/pure/SearchEngine'
import UserManager from './components/UserManager'
import './css/normalize.css'
import ReservationManager from './components/ReservationManager.jsx';
import RoomManager from './components/RoomManager.jsx';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/admin/users' component={UserManager} />
          <Route path='/admin/reservation' component={ReservationManager} />
          <Route path='/admin/rooms' component={RoomManager} />
          <Route path='/admin' component={Admin} />
          <Route path='/confirmation' component={Confirmation} />
          <Route path='/:capacity?/:begin?/:end?/:equipment?' component={SearchEngine} />
          <Route path="*" component={Home}/>
        </Switch>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default withRouter(connect(mapStateToProps)(App));
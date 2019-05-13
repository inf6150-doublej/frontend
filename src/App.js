import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Login from './components/Login.jsx';
import MyAccount from './components/MyAccount.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import './css/normalize.css'

class App extends Component {
  constructor() {
    super();
  }
  componentDidMount() {}

  render() {
    return (
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/myaccount' component={MyAccount} />
        </div>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

export default withRouter(connect(mapStateToProps)(App));
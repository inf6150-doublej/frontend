import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Admin from './components/Admin.jsx';
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/admin' component={Admin} />
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
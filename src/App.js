import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Admin from './components/Admin.jsx';
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import SearchEngine from './components/pure/SearchEngine'
import './css/normalize.css'

class App extends Component {
  componentDidMount() {}

  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/admin' component={Admin} />
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
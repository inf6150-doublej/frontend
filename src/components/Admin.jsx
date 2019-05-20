import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../store/actions/user.actions';
import { goToUrl } from '../store/actions/router.actions';
import Header from './pure/Header.jsx';
import Manager from './Manager.jsx';
import '../css/Admin.css'


class Admin extends Component {

  componentDidMount() {
    const { user, history } = this.props;
    if(!user || !user.admin)goToUrl(history, '/')
  }

  logout = () => {
    const { dispatch, history } = this.props;
    dispatch(logout(history));
  }

  render() {
    const { user, history } = this.props;
    return (
      <div className='home-container'>
        <Header logout={this.logout} goToUrl={goToUrl} history={history} user={user}></Header>
        <Manager></Manager>
      </div>
    );
  }
}

Admin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object,
  fetchData: PropTypes.array,
  isFetching: PropTypes.bool,
  username: PropTypes.string,
};

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication
  return {
    user,
    loggedIn,
  };
}

export default withRouter(connect(mapStateToProps)(Admin));

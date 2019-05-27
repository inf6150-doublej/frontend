import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout, checkSession } from '../store/actions/user.actions';
import { goToUrl } from '../store/actions/router.actions';
import Header from './pure/Header.jsx';
import Form from './Form.jsx';
import '../css/Home.css'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    if(!user)dispatch(checkSession());
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
        <Form history={history}></Form>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  const { loggedIn } = state.authentication;
  const {user} = state.authentication.user ? state.authentication : state.registration;
  return {
    user,
    loggedIn
  };
}

export default withRouter(connect(mapStateToProps)(Home));

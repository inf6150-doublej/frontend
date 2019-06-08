import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout, checkSession } from '../store/actions/user.actions';
import { goToUrl } from '../store/actions/router.actions';
import Header from './pure/Header.jsx';
import '../css/Home.css';
import '../css/faq.css';


// Home page to search rooms
class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    if (!user)dispatch(checkSession());
  }

  logout = () => {
    const { dispatch, history } = this.props;
    dispatch(logout(history));
  }

  render() {
    const { user, history } = this.props;
    return (
      <div>
        <div className='home-container'>
            <Header logout={this.logout} goToUrl={goToUrl} history={history} user={user}></Header>
        </div>
        <div>
            <h1> FAQ</h1>
            <h3>How do I register myself on the website?</h3>
            <p className='faq-par'>When on the home page, click on the register button in the top right.
            When registering, you will be asked to enter your name, your phone number, a valid email address and a password of your choice</p>
            <h3>How do I make a reservation?</h3>
            <p className='faq-par'>When you are logged in, you use the search engine on the home page with the time you want for your reservation
            and a search will put you on the list of available room meeting your criterias</p>
        </div>  
      </div>  
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication;
  return {
    user,
    loggedIn,
  };
}

export default withRouter(connect(mapStateToProps)(FAQ));

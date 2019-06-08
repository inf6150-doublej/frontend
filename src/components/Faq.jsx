import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout, checkSession } from '../store/actions/user.actions';
import { goToUrl } from '../store/actions/router.actions';
import Row from 'react-bootstrap/Row';
import Logo from './pure/Logo.jsx';
import Col from 'react-bootstrap/Col';
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
        <Header logout={this.logout} goToUrl={goToUrl} history={history} user={user}></Header>
        <Row className="justify-content-md-center">
          
        <div>
        <Col md={{ span: 12, offset: 3 }}>
            <h1> FAQ</h1>
            <h3>How do I register to the website?</h3>
            <p className='faq-par'>From the home page, click on the register button at the top.
            When registering, you will be asked to enter your name, your phone number, a valid email address and a password of your choice.
            Upon registering, you will receive a confirmation email</p>
            <h3>How do I make a reservation?</h3>
            <p className='faq-par'>When you are logged in, use the search engine on the home page with the search criterias that match what you want for your reservation.
            A list will then be displayed for you with all the available rooms/venues. Simply click reserve on the one you wish to book.
            A confirmation page will be displayed and you will also receive a confirmation email.</p>
        </Col>
        </div>  
        </Row>
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

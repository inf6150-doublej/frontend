import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginPage from './Login.jsx';
import { checkSession, logout, updateUser } from '../../store/actions/user.actions';

class MyAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        first_name: '',
        last_name: '',
        gender: '',
        phone: '',
        email: '',
        username: '',
        password: '',
      },
      submitted: false,
    };
  }

  componentDidMount() {
    const { dispatch, user, loggedIn } = this.props;
    if (loggedIn && !user) dispatch(checkSession());
  }

  updateUser = () => {
    const { dispatch, user } = this.props;
    dispatch(updateUser());
  }

  render() {
    const { user, loggedIn } = this.props;
    if (user) {
      return (
        <div className="user-account-main-container">
          <div className="user-account-main-wrapper">
            <div className="user-account-detail-container">
              <div className="user-account-detail-wrapper">
                <div className="user-account-detail">
                  <h3>Details du Compte</h3>
                  <span>Les informations seront utilisés seulement par Kajaja pour vous contacter</span>
                  <label>Username</label>
                </div>

                <div className="user-account-password-verification">
                  <label>Entrez votre mot de passe pour sauver les changements</label>

                </div>

                <div className="user-account-button-container">
                  <button className="user-account-button" onClick={this.updateUser}>Sauvegarder</button>
                  <span>|</span>
                  <a>Canceler</a>

                </div>
              </div>
            </div>

            <div className="user-account-summary-container">
              <div className="user-account-summary-wrapper">
                <h3>Sommaire du compte</h3>
                <label>Membre Depuis :</label>
                <span>N/A</span>
                <label>Username :</label>
                <span>{user.username}</span>
              </div>

            </div>
          </div>
        </div>
      );
    } else if (loggedIn) {
      return <div/>;
    }
    // TODO send redirect component
    return <LoginPage error={'you do not have the permission to access this page'}/>;
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  const { loggedIn, user } = authentication;
  return {
    user,
    loggedIn,
  };
}

export default withRouter(connect(mapStateToProps)(MyAccount));

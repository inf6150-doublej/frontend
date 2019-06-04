import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import { login, recoverPassword } from '../store/actions/user.actions';
import { isValidEmail } from '../utils/utils';
import Logo from './pure/Logo.jsx';
import Loader from './pure/Loader.jsx';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      showRecoverModal: false,
      isValidEmail: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (name === 'email') this.validateEmail(value);
  }

  validateEmail = (email) => {
    if (isValidEmail(email)) {
      this.setState({ isValidEmail: true });
    } else {
      this.setState({ isValidEmail: false });
    }
  }

  cancel = () => {
    this.setState({ showRecoverModal: false });
  }

  login = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    if (email && password) {
      dispatch(login(email, password, history));
    }
  }

  showRecoveringModal = (e) => {
    e.preventDefault();
    this.setState({ showRecoverModal: true });
  }

  recoverPassword = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(recoverPassword(email));
  }

  render() {
    const { loggingIn, error, message, history } = this.props;
    const { email, password, submitted, showRecoverModal, isValidEmail } = this.state;
    let formClassName = 'form-group';
    if (submitted && (!(email || password) || error)) formClassName = 'form-group has-error';
    let emailClassName = 'form-control';
    if (!isValidEmail) emailClassName = 'form-control is-invalid';

    return (
      <form className='form-horizontal'>
        <div className='Hero-login'>
          <Logo viewHome={() => history.push('/')} classNome='foto-login' width={240} height={240} />
          <div className='col-md-6 col-md-offset-3 '>
            <h2>Login</h2>
            {error && <div className='help-block text-danger'>Invalid password or email</div>}

            <div className={formClassName}>
              <label htmlFor='email' className='control-label'>Email</label>
              <input type='text' className={emailClassName} name='email' value={email} onChange={this.handleChange} />
              {submitted && !email && <div className='help-block'>Email is required</div>}
            </div>

            <div className={formClassName}>
              <label htmlFor='password' className='control-label'>Password</label>
              <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} />
              {submitted && !password && <div className='help-block'>Password is required</div>}
            </div>

            <div className='form-group'>
              <button className='btn btn-primary' onClick={this.login}>Login</button>
              <Loader loading={loggingIn} />
              <Link to='/register' className='btn btn-link'>Register</Link>
              <Link className='btn btn-link' onClick={this.showRecoveringModal}>Recover password</Link>
            </div>

            <Dialog open={showRecoverModal}>
              {message && <div>{message}</div>}
              <label>email</label>
              <input name='email' onChange={this.handleChange}></input>
              <button onClick={this.recoverPassword}>recover</button>
              <button onClick={this.cancel}>cancel</button>
            </Dialog>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn, error, message } = state.authentication;
  return {
    loggingIn,
    error,
    message,
  };
}

export default withRouter(connect(mapStateToProps)(LoginPage));

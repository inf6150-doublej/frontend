import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { login, recoverPassword } from '../store/actions/user.actions';
import { isValidEmail } from '../utils/utils';
import Logo from './pure/Logo.jsx';
import Loader from './pure/Loader.jsx';

// Lopin page
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

  // Click on login
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

  // Forgot password
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
        <Row className="justify-content-md-center">
          <Col md={{ span: 8, offset: 5 }}>
            <Logo viewHome={() => history.push('/')} className='foto-login' width={240} height={240} />
          </Col>
          <Col md={{ span: 11, offset: 5 }}>
            <div className='Hero-login'>
              <div className='col-md-5 col-md-offset-3 '>
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
                <DialogTitle id="simple-dialog-title">Recover Password</DialogTitle>
                  <DialogContent>
                    Please enter your email below so that we can send you a recovery password.
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email Address"
                      type="email"
                      fullWidth
                    />
                    {message && <div>{message}</div>}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.recoverPassword} color="primary">
                      Recover Password
                    </Button>
                    <Button onClick={this.cancel} color="primary" autoFocus>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </Col>
        </Row>
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-image-resizer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userActions, isAuthenticated } from '../store/actions/user.actions';
import Dialog from '@material-ui/core/Dialog';
import { urlConstants } from '../constants/url.constants';

const logo = require('../img/BE2.png');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      submitted: false,
      showRecoverModal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.login.bind(this);

    if(isAuthenticated()) {
      const { dispatch, history } = this.props;
      history.push('/');
    }

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
      dispatch(userActions.login(email, password, history));
    }
  }

  showRecoveringModal = (e) => {
    e.preventDefault();
    this.setState({showRecoverModal : true})
  }

  recoverPassword = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(userActions.recoverPassword(email));
  }

  render() {
    const { loggingIn, error, message } = this.props;
    const { email, password, submitted, showRecoverModal } = this.state;
    let formClassName = 'form-group';
    if (submitted && (!(email || password) || error)) {
      formClassName = 'form-group has-error';
    }

    return (
      <form className='form-horizontal'>
      <div className='Hero-login'>
        <div className='foto-login'>
          <Image src={logo} alt='logo' width={240} height={240} /> {/*} onClick={() => goToUrl(history, '/')}  Comment faire? {*/}
        </div>
        <div className='col-md-6 col-md-offset-3 '>
          <h2>Login</h2>
          {error && <div className='help-block text-danger'>Invalid password or email</div>}
          <div
            className={formClassName}>
            <label htmlFor='email' className='control-label'>Email</label>
            <input type='text' className='form-control' name='email' value={email} onChange={this.handleChange} />
            {submitted && !email && <div className='help-block'>Email is required</div>}
          </div>

          <div
            className={formClassName}>
            <label htmlFor='password' className='control-label'>Password</label>
            <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} />
            {submitted && !password && <div className='help-block'>Password is required</div>}

          </div>

          <div className='form-group'>
            <button className='btn btn-primary' onClick={this.login}>Login</button>
            {loggingIn &&
              <img
                src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' alt='bonjour' />}
            <Link to='/register' className='btn btn-link'>Register</Link>
            <Link className='btn btn-link' onClick={this.showRecoveringModal}>recover password</Link>
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

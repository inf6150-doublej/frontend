import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-image-resizer';
// import './Login.css'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userActions } from '../../store/actions/user.actions';

const logo = require('../../img/logo.svg');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false,
      passwordError: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }


  render() {
    const { loggingIn, error } = this.props;
    const { username, password, submitted, passwordError } = this.state;
    let formClassName = 'form-group';
    if (submitted && !(username || password)) {
      formClassName = 'form-group has-error';
    }

    return (
      <div className='Hero-login'>
        <div className='foto-login'>
          <Image src={logo} alt='logo' width={240} height={240} />
        </div>

        <div className='col-md-6 col-md-offset-3 '>
          <h2>Login</h2>
          {passwordError && <div className='help-block'>Wrong password or username</div>}
          {error && <div className='help-block'>{error}</div>}
          <div
            className={formClassName}>
            <label htmlFor='username'>Username</label>
            <input type='text' className='form-control' name='username' value={username} onChange={this.handleChange} />
            {submitted && !username && <div className='help-block'>Username is required</div>}
          </div>

          <div
            className={formClassName}>
            <label htmlFor='password'>Password</label>
            <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} />
            {submitted && !password && <div className='help-block'>Password is required</div>}

          </div>

          <div className='form-group'>
            <button className='btn btn-primary' onClick={this.handleSubmit}>Login</button>
            {loggingIn &&
              <img
                src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' alt='bonjour' />}
            <Link to='/register' className='btn btn-link'>Register</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

export default withRouter(connect(mapStateToProps)(LoginPage));

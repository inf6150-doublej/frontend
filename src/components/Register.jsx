import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Image from 'react-image-resizer';
import { userActions } from '../store/actions/user.actions';

const logo = require('../img/logo.svg');

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        last_name: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        password: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch, history } = this.props;
    const { register } = userActions;
    if (user.name && user.last_name && user.username && user.password && user.email) {
      dispatch(register(user, history));
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    const { name, last_name, address, phone, username, password, email } = user;
    let formClassName = 'form-group';
    if (submitted && !(name || last_name || address || phone || username || password || email)) {
      formClassName = 'form-group has-error';
    }
    return (
      <form className='form-horizontal'>
      <div className='Hero-register'>
        <div className='foto-register'>
          <Image src={logo} alt='logo' width={240} height={240} />
        </div>
        <div className='col-md-6 col-md-offset-3'>
          <h2>Register</h2>

          <div className={formClassName}>
            <label htmlFor='name'>First Name </label>
            <input type='text' className='form-control' name='name' value={user.name} onChange={this.handleChange} required />
            {submitted && !user.name && <div className='help-block text-danger'>First Name is required</div>}
          </div>
          <div className={formClassName}>
            <label htmlFor='last_name'>Last Name </label>
            <input type='text' className='form-control' name='last_name' value={user.last_name} onChange={this.handleChange} required />
            {submitted && !user.last_name && <div className='help-block text-danger'>Last Name is required</div>}
          </div>
          <div className={formClassName}>
            <label htmlFor='address'>Address </label>
            <input type='text' className='form-control' name='address' value={user.address} onChange={this.handleChange} />
          </div>
          <div className={formClassName}>
            <label htmlFor='phone'>Phone Number </label>
            <input type='text' className='form-control' name='phone' value={user.phone} onChange={this.handleChange} />
          </div>
          <div className={formClassName}>
            <label htmlFor='email'>Email </label>
            <input type='text' className='form-control' name='email' value={user.email} onChange={this.handleChange} required />
            {submitted && !user.email && <div className='help-block text-danger'>Email is required</div>}
          </div>
          <div className={formClassName}>
            <label htmlFor='username'>Username </label>
            <input type='text' className='form-control' name='username' value={user.username} onChange={this.handleChange} required />
            {submitted && !user.username && <div className='help-block text-danger'>Username is required</div>}
          </div>
          <div className={formClassName}>
            <label htmlFor='password'>Password </label>
            <input type='password' className='form-control' name='password' value={user.password} onChange={this.handleChange} required />
            {submitted && !user.password && <div className='help-block text-danger'>Password is required</div>}
          </div>
          <div className='form-group'>
            <button className='btn btn-primary' onClick={this.handleSubmit}>Register</button>
            {registering &&
              <img src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' alt='blabla' />}
            <Link to='/login' className='btn btn-link'>Cancel</Link>
          </div>
        </div>
      </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering,
  };
}

export default withRouter(connect(mapStateToProps)(RegisterPage));

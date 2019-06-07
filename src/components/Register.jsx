import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import { userActions } from '../store/actions/user.actions';
import { goToUrl } from '../store/actions/router.actions';
import Logo from './pure/Logo.jsx';
import Loader from './pure/Loader.jsx';
import { isValidEmail } from '../utils/utils';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


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
      emailClassName: 'form-control',
    };
  }


  handleChange = (event) => {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
    if (name === 'email') {
      if (isValidEmail(value)) {
        this.setState({ emailClassName: 'form-control' });
      } else {
        this.setState({ emailClassName: 'form-control is-invalid' });
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch, history } = this.props;
    const { register } = userActions;
    if (user.name && user.last_name && user.username && user.password && user.email) {
      dispatch(register(user, history));
    }
  }

  handleBack = () => {
    this.props.history.goBack();
  }


  render() {
    const { registering, error, history, registeredUser } = this.props;
    const { user, submitted, emailClassName } = this.state;
    const { name, last_name, address, phone, username, password, email } = user;
    const openModal = !!registeredUser;
    let formClassName = 'form-group';
    if (submitted && !(name || last_name || address || phone || username || password || email)) {
      formClassName = 'form-group has-error';
    }

    return (
      <form className='form-horizontal'>
         <Row className="justify-content-md-center">
          <Col md={{ span: 8, offset: 5 }}>
            <Logo viewHome={() => history.push('/')} className='foto-login' width={240} height={240} />
          </Col>
          <Col md={{ span: 11, offset: 5 }}>
            <div className='Hero-register'>
              <div className='col-md-5 col-md-offset-3'>
                <h2>Register</h2>

                {error && <div className='help-block text-danger'>Unable to register.  E-mail address already used.</div>}

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
                  <input type='text' className={emailClassName} name='email' value={user.email} onChange={this.handleChange} required />
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
                  <Loader loading={registering} />
                  <Link onClick={this.handleBack} className='btn btn-link'>Cancel</Link>
                </div>
              </div>
            </div>
            <Dialog open={openModal}>
              <DialogContent>
                Thank you for registering to BookingExpert
              </DialogContent>  
              <Button onClick={() => goToUrl(history, '/')} color="primary">
                OK
              </Button>
            </Dialog>
          </Col>
        </Row>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { registering, error, user } = state.authentication;
  return {
    registering,
    error,
    registeredUser: user,
  };
}

export default withRouter(connect(mapStateToProps)(RegisterPage));

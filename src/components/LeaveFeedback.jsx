import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dialog } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { userActions } from '../store/actions/user.actions';
import { goToUrl } from '../store/actions/router.actions';
import Logo from './pure/Logo.jsx';
import Loader from './pure/Loader.jsx';
import { isValidEmail } from '../utils/utils';

// Register opage
class LeaveFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        publicationDate: null,
        comment: '',
      },
      openModal: false,
      submitted: false,
      emailClassName: 'form-control',
    };
  }

  // When a control change, we update state
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

  // Click on Register button
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch, history } = this.props;
    const { register } = userActions;
    if (user.name && user.email) {
      dispatch(register(user, history));
    }
  }

  handleBack = () => {
    this.props.history.goBack();
  }


  render() {
    const { registering, error, history, registeredUser } = this.props;
    const { user, submitted, emailClassName, openModal } = this.state;
    const { name, last_name, address, phone, username, password, email } = user;

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
                <h2>Leave Feedback</h2>

                {error && <div className='help-block text-danger'>Unable to leave feedback.</div>}

                <div className={formClassName}>
                  <label htmlFor='name'>Name:</label>
                  <input type='text' className='form-control' name='name' value={user.name} onChange={this.handleChange} required />
                  {submitted && !user.name && <div className='help-block text-danger'>Name is required</div>}
                </div>
                <div className={formClassName}>
                  <label htmlFor='email'>Email </label>
                  <input type='text' className={emailClassName} name='email' value={user.email} onChange={this.handleChange} required />
                  {submitted && !user.email && <div className='help-block text-danger'>Email is required</div>}
                </div>
                <div className={formClassName}>
                  <label htmlFor='comment'>Comments </label>
                  <input type='comment' className='form-control' name='comment' value={user.comment} onChange={this.handleChange} required />
                  {submitted && !user.comment && <div className='help-block text-danger'>Comments are required</div>}
                </div>
                <div className='form-group'>
                  <button className='btn btn-primary' onClick={this.handleSubmit}>Leave feedback</button>
                  <Loader loading={registering} />
                  <Link onClick={this.handleBack} className='btn btn-link'>Cancel</Link>
                </div>
              </div>
            </div>
            <Dialog open={openModal}>
              <DialogContent>
                Thank you for your feedback to BookingExpert
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

export default withRouter(connect(mapStateToProps)(LeaveFeedback));

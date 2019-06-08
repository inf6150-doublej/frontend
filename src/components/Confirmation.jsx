import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Media from 'react-bootstrap/Media';
import Room from './pure/Room.jsx';
import User from './pure/User.jsx';
import '../css/Confirmation.css';
import Logo from './pure/Logo.jsx';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Confirmation of a reservation
class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {}

  render() {
    const { confirmation, error, history } = this.props;
    return (
      <div>
        <Row className="justify-content-md-center">
          <Col md={{ span: 8, offset: 5 }}>
            <Logo viewHome={() => history.push('/')} className='foto-login' width={240} height={240} />
          </Col>
          <Col md={{ span: 11, offset: 5 }}>
        {confirmation
        && <div className='col-md-5 col-md-offset-3 '>
          <h3>You have successfully reserved a room. Please check your email for validation.</h3>
          <Room room={confirmation.room}></Room>
          <ul>
            <Media as="li">
              <Media.Body>   
                <li><h5>Confirmation to:</h5></li>
                <User user={confirmation.user}></User>
                <br></br>
                <li><h5>Date and Time:</h5></li>
                <li><p>start: {confirmation.begin}</p></li>
                <li><p>end: {confirmation.end}</p></li>                 
              </Media.Body>
            </Media>
          </ul>
        </div>}
        {error && <div>{error}</div>}
        </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { confirmation, error } = state.reservation;
  return {
    confirmation,
    error,
  };
}

export default withRouter(connect(mapStateToProps)(Confirmation));

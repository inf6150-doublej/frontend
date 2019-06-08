import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Media from 'react-bootstrap/Media';
import Room from './pure/Room.jsx';
import User from './pure/User.jsx';
import '../css/Confirmation.css';

// Confirmation of a reservation
class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {}

  render() {
    const { confirmation, error } = this.props;
    return (
      <div>
        {confirmation
        && <div className='confirmation-container'>
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
                <li><p>ending: {confirmation.end}</p></li>                 
              </Media.Body>
            </Media>
          </ul>
        </div>}
        {error && <div>{error}</div>}
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

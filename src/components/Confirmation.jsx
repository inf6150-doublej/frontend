import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Room from './pure/Room.jsx';
import User from './pure/User.jsx';
import '../css/Confirmation.css';

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
          <h2>you have successfully reserved a room, please check your email for the receive.</h2>
          <Room room={confirmation.room}></Room>
          <User user={confirmation.user}></User>
          <div>start: {confirmation.begin}</div>
          <div>ending: {confirmation.end}</div>
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

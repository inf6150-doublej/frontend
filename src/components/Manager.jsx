import React, { Component } from 'react';
import RoomManager from './RoomManager';
import UserManager from './UserManager';
import ReservationManager from './ReservationManager'
import 'react-input-range/lib/css/index.css';
import '../css/Manager.css';

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserManager: false,
      showRoomManager: false,
      showReservationManager: false,
    };
  }
  
  componentDidMount() { }
  

  handleRoomManager = () => {
    this.setState({ showRoomManager: true, showReservationManager: false, showUserManager: false })
  }

  handleUserManager = () => {
    this.setState({ showRoomManager: false, showReservationManager: false, showUserManager: true })
  }

  handleReservationManager = () => {
    this.setState({ showRoomManager: false, showReservationManager: true, showUserManager: false })
  }
  render() {
    const { showReservationManager, showRoomManager, showUserManager } = this.state;
    return (
      <div className='manager-container'>
        <div className='manager-wrapper'>
          <button onClick={this.handleUserManager}>manage users</button>
          <button onClick={this.handleReservationManager}>manage reservations</button>
          <button onClick={this.handleRoomManager}>manage rooms</button>

          {showUserManager && <UserManager></UserManager>}
          {showReservationManager && <ReservationManager></ReservationManager>}
          {showRoomManager && <RoomManager></RoomManager>}
        </div>
      </div>
    );
  }
}

export default Manager;

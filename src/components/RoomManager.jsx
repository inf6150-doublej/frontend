import React, { Component } from 'react';
import { connect } from 'react-redux';
import Room from './pure/Room'
import {
  deleteRoom,
  createRoom,
  updateRoom,
  getRooms,
} from '../store/actions/admin.actions'
class RoomManager extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rooms:{},
      showRoomList: false,
      showUpdateForm: false,
      showCreateForm: false,
    };
  }


  roomList = () => {
    const { rooms, dispatch } = this.props;
    
    const onDelete = (id) => {
      const confirmation = window.confirm('Confirm delete');
      if(confirmation){
        dispatch(deleteRoom(id));
      }
    };

    const onUpdate = (room) => {
      this.setState({room:room, showUpdateForm:true, showRoomList:false})
    };

    let roomMap = []
    if (rooms && rooms.length) {
      roomMap = rooms.map((room, i) => <Room key={i} room={room} onReservation={onDelete} />);
    }
    return (<div>{roomMap}</div>)
  }

  handleRoomList = () => {
    const { dispatch } = this.props;
    dispatch(getRooms());
    this.setState({ showRoomList: true, showUpdateForm:false, showCreateForm:false, showDeleteForm:false })
  };

  render() {
    const { showRoomList, showUpdateForm, showCreateForm, showDeleteForm } = this.state;
    return (
      <div>
        <button name='create' onClick={this.handleCreateForm}>create room</button>
        <button name='delete' onClick={this.handleDeleteForm}>delete room</button>
        <button name='read' onClick={this.handleRoomList}>list rooms </button>
        {showRoomList && this.roomList()}
        {showUpdateForm && this.updateForm()}
        {showCreateForm && this.createForm()}
        {showDeleteForm && this.deleteForm()}
      </div>
    )
}
}
function mapStateToProps(state) {
  const { rooms, fetching } = state.administrator;
  return {
    rooms,
    fetching
  };
}

export default connect(mapStateToProps)(RoomManager);

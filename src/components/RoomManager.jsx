import React, { Component } from 'react';
import { connect } from 'react-redux';
import Room from './pure/RoomAdmin'
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
        this.handleRoomList() 
      }
    };

    const onUpdate = (room) => {
      this.setState({room:room, showUpdateForm:true, showRoomList:false})
    };

    let roomMap = []
    if (rooms && rooms.length) {
      roomMap = rooms.map((room, i) => <Room key={i} room={room} onDelete={onDelete} onUpdate={onUpdate} />);
    }
    return (<div>{roomMap}</div>)
  }

  handleRoomList = () => {
    const { dispatch } = this.props;
    dispatch(getRooms());
    this.setState({ showRoomList: true, showUpdateForm:false, showCreateForm:false, showDeleteForm:false })
  };

  createForm = () => {
    const {room} = this.state;
    const {dispatch} = this.props;
    return (
      <div>
        <div>
          <div >
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' name='name' />
          </div>
          <div >
            <label htmlFor='Type'>Type</label>
            <input type='text' className='form-control' name='Type'/>
          </div>          
          <div >
            <label htmlFor='capacity'>Capacity</label>
            <input type='text' className='form-control' name='capacity' />
          </div>
          <div >
            <label htmlFor='Description'>Description</label>
            <input type='text' className='form-control' name='Description'/>
          </div>          
        </div>
        <div><button onClick={() => dispatch(createRoom(room))}>create</button></div>
        <div><button onClick={()=>this.cancel()}>cancel</button></div>
      </div>
      )
  }

  render() {
    const { showRoomList, showUpdateForm, showCreateForm, showDeleteForm } = this.state;
    return (
      <div>
        <button name='create' onClick={this.handleCreateForm}>create room</button>        
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

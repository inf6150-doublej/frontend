import React, { Component } from 'react';
import { connect } from 'react-redux';
import Room from './pure/RoomAdmin'
import {
  deleteRoom,
  createRoom,
  updateRoom,
  getRooms,
} from '../store/actions/admin.actions'
import { template } from '@babel/core';
class RoomManager extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rooms:{},
      room: {
        name: '',
        type: '',
        capacity: '',
        description: '',
        reservation_id: '',
        equipment_id: '',
        id: '',
      },
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
      roomMap = rooms.map((room, i) => <Room key={i} room={room} onDelete={onDelete} onUpdate={onUpdate} />);
    }
    return (<div>{roomMap}</div>)
  }

  cancel = () =>{this.setState({ showRoomList: false, showCreateForm:false, showUpdateForm:false, showDeleteForm:false })}


  handleRoomList = () => {
    const { dispatch } = this.props;
    dispatch(getRooms());
    this.setState({ showRoomList: true, showUpdateForm:false, showCreateForm:false})
  };

  handleCreateForm = () =>{
    this.setState({ showRoomList: false, showUpdateForm:false, showCreateForm:true})
  };

  createForm = () => {
    const {room} = this.state;
    const {dispatch} = this.props;
    return (
      <div>
        <div>
          <div >
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' name='name'  ref='name' />
          </div>
          <div >
            <label htmlFor='type'>Type</label>
            <input type='text' className='form-control' name='type'  ref='type'/>
          </div>          
          <div >
            <label htmlFor='capacity'>Capacity</label>
            <input type='text' className='form-control' name='capacity'  ref='capacity' />
          </div>
          <div >
            <label htmlFor='description'>Description</label>
            <input type='text' className='form-control' name='description'  ref='description'/>
          </div>          
        </div>
        <div><button onClick={() => {
          room.name = this.refs.name.value;
          room.description = this.refs.description.value;
          room.type = this.refs.type.value;
          room.capacity = this.refs.capacity.value;
          dispatch(createRoom(room))}}>create</button></div>
        <div><button onClick={()=>this.cancel()}>cancel</button></div>
      </div>
      )
  }

  updateForm = () => {
    const {room} = this.state;
    const {dispatch} = this.props;
    return (
      <div>
        <div>
        <div>
          <div >
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' name='name' value={room.name} />
          </div>
          <div >
            <label htmlFor='type'>Type</label>
            <input type='text' className='form-control' name='type'  ref='type' defaultValue ={this.state.room.type}/>
          </div>          
          <div >
            <label htmlFor='capacity'>Capacity</label>
            <input type='text' className='form-control' name='capacity'  ref='capacity' defaultValue ={room.capacity}/>
          </div>
          <div >
            <label htmlFor='description'>Description</label>
            <input type='text' className='form-control' name='description'  ref='description' defaultValue ={room.description}/>
          </div>          
        </div>
        </div>
        <div><button onClick={() => {
          room.description = this.refs.description.value;
          room.type = this.refs.type.value;
          room.capacity = this.refs.capacity.value;
           dispatch(updateRoom(room))}}>update</button></div>
           
        <div><button onClick={this.cancel}>cancel</button></div>
      </div>
      )
  }

  render() {
    const { showRoomList, showUpdateForm, showCreateForm} = this.state;
    return (
      <div>
        <button name='create' onClick={this.handleCreateForm}>create room</button>        
        <button name='read' onClick={this.handleRoomList}>list rooms </button>
        {showRoomList && this.roomList()}
        {showUpdateForm && this.updateForm()}
        {showCreateForm && this.createForm()}       
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

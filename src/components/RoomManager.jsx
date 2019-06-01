import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Room from './pure/RoomAdmin'
import {
  deleteRoom,
  createRoom,
  updateRoom,
  getRooms,
} from '../store/actions/admin.actions'
import '../css/CustomBootstrapTable.css'
import Button from 'react-bootstrap/Button';
import HeaderAdmin from './pure/HeaderAdmin'
//font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

// React-Bootstrap
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');


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
      showRoomList: true,
      showUpdateForm: false,
      showCreateForm: false,
    };

    const { dispatch } = this.props;
    dispatch(getRooms());

    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);

  }

  rowClassNameFormat = (row, rowIdx) => {
    // row is whole row object
    // rowIdx is index of row
    return rowIdx % 2 === 0 ? 'td-even' : 'td-odd';
  };
  
  createCustomInsertButton = (onClick) => {
    return (
      <Button size="sm" className="btnCreate" variant="info" onClick={() => this.onCreateClick(null)}><FontAwesomeIcon icon={faPlus} />&nbsp;Create</Button>
    );
  }


  roomList = () => {
    const { rooms, dispatch } = this.props;
    
    const options = {
      insertBtn: this.createCustomInsertButton,
      defaultSortName: 'name',  // default sort column name
      defaultSortOrder: 'asc'  // default sort order
    };
    
      return (<BootstrapTable data={rooms} version='4' hover condensed pagination search insertRow trClassName={this.rowClassNameFormat} options={options}
      multiColumnSearch={ true }>
      <TableHeaderColumn dataField='edit' width={'80px'}  dataFormat={ this.editFormatter.bind(this) }></TableHeaderColumn>
      <TableHeaderColumn dataField='delete'  width={'90px'} dataFormat={ this.deleteFormatter.bind(this) }></TableHeaderColumn>
      <TableHeaderColumn isKey dataField='id' dataSort hidden={true}></TableHeaderColumn>
      <TableHeaderColumn dataField='name' dataSort>Name</TableHeaderColumn>
      <TableHeaderColumn dataField='type' dataSort>Type</TableHeaderColumn>
      <TableHeaderColumn dataField='capacity' dataSort>Capacity</TableHeaderColumn>
      <TableHeaderColumn dataField='description' dataSort>Description</TableHeaderColumn>
  </BootstrapTable>)
  }

  cancel = () =>{this.setState({ showRoomList: true, showCreateForm:false, showUpdateForm:false, showDeleteForm:false })}


  handleSubmitCreate(event) {

    const { room } = this.state;
    const { dispatch, history } = this.props;

    if(room.name && room.capacity) {

      dispatch(createRoom(room, history));

      this.setState({room: room, showRoomList: true, showUpdateForm:false, showCreateForm:false, isSubmitted: false, shouldReload: true })
    } else {
      this.setState({room: room, showRoomList: false, showUpdateForm:false, showCreateForm:true, isSubmitted: true })  
    }
  
  }

  handleSubmitUpdate(event) {
    event.preventDefault();

    const { room } = this.state;
    const { dispatch, history } = this.props;

    if(room.name && room.capacity) {
      dispatch(updateRoom(room, history));

      this.setState({room: room, showRoomList: true, showUpdateForm:false, showCreateForm:false, isSubmitted: false })
    } else {
      
      this.setState({room: room, showRoomList: false, showUpdateForm:true, showCreateForm:false, isSubmitted: true })
    }
  
  }


  createForm = () => {
    const {room, isSubmitted} = this.state;
    const { dispatch, history } = this.props;


    const onChange = (event) => {
      const { name, value } = event.target;
      const { user } = this.state;
      this.setState({
        room: {
          ...room,
          [name]: value,
        },
      });
    }


    return (
      <form autoComplete="new-password3" onSubmit={this.handleSubmitCreate}>
        <div>
          <div >
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' name='name' value={room.name}  onChange={onChange} />
            {isSubmitted && !room.name && <div className='help-block text-danger'>Name is required</div>}
          </div>
          <div >
            <label htmlFor='type'>Type</label>
            <input type='text' className='form-control' name='type' value={room.type} onChange={onChange}/>
          </div>          
          <div >
            <label htmlFor='capacity'>Capacity</label>
            <input type='text' className='form-control' name='capacity' value={room.capacity} onChange={onChange} />
            {isSubmitted && !room.capacity && <div className='help-block text-danger'>Capacity is required</div>}
          </div>
          <div >
            <label htmlFor='description'>Description</label>
            <input type='text' className='form-control' name='description' value={room.description} onChange={onChange}/>
          </div>          
        </div>
        <div><input type="submit" value="Create" /></div>
        <div><button onClick={()=>this.cancel()}>cancel</button></div>
      </form>
      )
  }

  updateForm = () => {
    const {room, isSubmitted} = this.state;

    const onChange = (event) => {
      const { name, value } = event.target;
      const { room } = this.state;
      this.setState({
        room: {
          ...room,
          [name]: value,
        },
      });
    }

    return (
      <form  autoComplete="new-password3" onSubmit={this.handleSubmitUpdate}>
        <div>
        <div>
          <div >
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' name='name' value={room.name} onChange={onChange} />
            {isSubmitted && !room.name && <div className='help-block text-danger'>Name is required</div>}
          </div>
          <div >
            <label htmlFor='type'>Type</label>
            <input type='text' className='form-control' name='type' value={room.type} onChange={onChange}/>
          </div>          
          <div >
            <label htmlFor='capacity'>Capacity</label>
            <input type='text' className='form-control' name='capacity' value={room.capacity} onChange={onChange}/>
            {isSubmitted && !room.capacity && <div className='help-block text-danger'>Capacity is required</div>}
          </div>
          <div >
            <label htmlFor='description'>Description</label>
            <input type='text' className='form-control' name='description' value={room.description} defaultValue ={room.description} onChange={onChange}/>
          </div>          
        </div>
        </div>
        <div><div><input type="submit" value="Update" /></div>
        <div><button onClick={this.cancel}>cancel</button></div>
        </div>
      </form>
      )
  }

  
onEditClick = room => 
{
  this.setState({ room: room, showRoomList: false, showUpdateForm:true, showCreateForm:false, isSubmitted: false })
};

onCreateClick = room => 
{
  this.setState({ room: {
    name: "",
    type: "",
    capacity: "",
    description: "",
    reservation_id: '',
    equipment_id: '',
    id: '',

  }, showRoomList: false, showUpdateForm:false, showCreateForm:true, isSubmitted: false })
};

onDeleteClick = room => 
{
  const {dispatch} = this.props;

  const confirmation = window.confirm('Confirm delete');
  if(confirmation){
    dispatch(deleteRoom(room.id));
  }
};

  editFormatter(cell,room) {
    return  <Button size="sm"  variant="primary" onClick={() => this.onEditClick(room)}><FontAwesomeIcon icon={faPencilAlt} /> Edit</Button>
}

deleteFormatter(cell,room) {
  return  <Button size="sm" variant="danger" className="btnGrid2" onClick={() => this.onDeleteClick(room)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</Button>
}

  render() {
    const { showRoomList, showUpdateForm, showCreateForm, shouldReload} = this.state;
    const { history, dispatch, shouldRefresh } = this.props;
    
    if(shouldRefresh && shouldReload) {
      this.state.shouldReload = false;
      dispatch(getRooms());
    }

    return (
      <div  className='room-manager-container'>
      <HeaderAdmin history={history}></HeaderAdmin>
      <div  className='room-manager-body container-fluid'>
        {showRoomList && this.roomList()}
        {showUpdateForm && this.updateForm()}
        {showCreateForm && this.createForm()}
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { rooms, fetching, shouldReload } = state.administrator;
  return {
    rooms,
    fetching,
    shouldReload
  };
}

export default withRouter(connect(mapStateToProps)(RoomManager));

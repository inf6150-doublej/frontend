import React, { Component, cloneElement } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/CustomBootstrapTable.css';
import '../css/RoomManager.css';
import Button from 'react-bootstrap/Button';
import Select from '@material-ui/core/Select';
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import HeaderAdmin from './pure/HeaderAdmin.jsx';
import {
  deleteRoom,
  createRoom,
  updateRoom,
  getRooms,
} from '../store/actions/admin.actions';

// React-Bootstrap
const ReactBsTable = require('react-bootstrap-table');

const { BootstrapTable } = ReactBsTable;
const { TableHeaderColumn } = ReactBsTable;
require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');


class RoomManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {
        name: '',
        type: 0,
        capacity: 0,
        description: '',
        equipment: {computer : 0 ,white_board : 0, sound_system : 0, projector : 0},
        id: '',
      },
      showRoomList: true,
      showUpdateForm: false,
      showCreateForm: false,
      saveErrorMessage: 'Unable to save.  Name already exist'
    };

    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getRooms());
  }

  rowClassNameFormat = (row, rowIdx) =>
    // row is whole row object
    // rowIdx is index of row
    (rowIdx % 2 === 0 ? 'td-even' : 'td-odd')
  ;

  createCustomInsertButton = onClick => (
      <Button size='sm' className='btnCreate' variant='info' onClick={() => this.onCreateClick(null)}><FontAwesomeIcon icon={faPlus} />&nbsp;Create</Button>
  )


  roomList = () => {
    const { rooms, dispatch } = this.props;

    const options = {
      insertBtn: this.createCustomInsertButton,
      defaultSortName: 'name', // default sort column name
      defaultSortOrder: 'asc', // default sort order
    };
    const listEquip = (cell,row) => {
      return  <ul>
                {cell.computer != 0 && <li>Computer</li>}
                {cell.white_board != 0 && <li>Whiteboard</li>}
                {cell.sound_system != 0 && <li>Sound System</li>}
                {cell.projector != 0 && <li>Projector</li>}
              </ul> 
    };
    const typeFilter = (cell,row) => {
      switch(cell) {
        case 1:
          return 'arena';
        case 2:
          return 'auditorium';
        case 3:
          return 'bar';
        case 4:
          return 'university';
        case 5:
          return 'theatre';
        case 6:
          return 'cultural center';
        case 7:
          return 'house';
        case 8:
          return 'outdoor';
        default:
          return '';
      }              
    };
    return (
      <BootstrapTable
        data={rooms}
        version='4'
        hover condensed pagination search insertRow trClassName={this.rowClassNameFormat}
        options={options}
        multiColumnSearch={ true }
      >
        <TableHeaderColumn dataField='edit' width={'80px'} dataFormat={ this.editFormatter.bind(this) }></TableHeaderColumn>
        <TableHeaderColumn dataField='delete' width={'90px'} dataFormat={ this.deleteFormatter.bind(this) }></TableHeaderColumn>
        <TableHeaderColumn isKey dataField='id' dataSort hidden={true}></TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='type' dataFormat={typeFilter} dataSort>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='capacity' dataSort>Capacity</TableHeaderColumn>
        <TableHeaderColumn dataField='description' dataSort>Description</TableHeaderColumn>
        <TableHeaderColumn dataField='equipment' dataFormat={listEquip} dataSort>Equipment</TableHeaderColumn>
      </BootstrapTable>);
  }

  cancel = () => { this.setState({ showRoomList: true, showCreateForm: false, showUpdateForm: false, showDeleteForm: false }); }


  handleSubmitCreate(event) {
    event.preventDefault();
    const { room } = this.state;
    const { dispatch } = this.props;

    if (room.name && room.capacity) {

      const onSuccess = () => {
        this.setState({ showRoomList: true, showCreateForm: false });
        dispatch(getRooms());
      };

      dispatch(createRoom(room, onSuccess));
    } else {
      this.setState({ room, showRoomList: false, showUpdateForm: false, showCreateForm: true, isSubmitted: true });
    }
  }

  handleSubmitUpdate(event) {
    event.preventDefault();
    const { room } = this.state;
    const { dispatch } = this.props;

    if (room.name && room.capacity) {

      const onSuccess = () => {
        this.setState({ showRoomList: true, showUpdateForm: false });
      };

      dispatch(updateRoom(room, onSuccess));
    } else {
      this.setState({ room, showRoomList: false, showUpdateForm: true, showCreateForm: false, isSubmitted: true });
    }
  }


  createForm = () => {
    const { room, isSubmitted, saveErrorMessage } = this.state;
    const { error } = this.props;

    const onChange = (event) => {
      const { name, value, checked } = event.target;
      this.setState({
        room: {
          ...room,
          [name]: value,           
                 
        },
      });
    };

    const onEquipChange = (event) => {
      const { name,checked } = event.target;
      this.setState({
        room: {
          ...room,
          equipment: {
            ...room.equipment,
            [name] : checked ? 1 : 0}          
                 
        },
      });
    };

    return (
      <form autoComplete='new-password3' onSubmit={this.handleSubmitCreate}>
        <div>
          <div >
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' name='name' value={room.name} onChange={onChange} />
            {isSubmitted && !room.name && <div className='help-block text-danger'>Name is required</div>}
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

          <div>
            <label htmlFor='type'>Type</label>
            <Select
              native
              value={this.state.room.type}
              onChange={onChange}
              inputProps={{ name: 'type', id: 'create-form-select' }}
            >
              <option value={0} />
              <option value={1}>arena</option>
              <option value={2}>auditorium</option>
              <option value={3}>bar</option>
              <option value={4}>university</option>
              <option value={5}>theatre</option>
              <option value={6}>cultural center</option>
              <option value={7}>house</option>
              <option value={8}>outdoor</option>
            </Select>
          </div>          
          <div>
          
            <label htmlFor='equipment' name='equipment'>Equipment :   
              <label htmlFor='computer' name='computer'>Computer 
                <input type='checkbox' id='computer' name='computer' onChange={onEquipChange}  value={room.equipment.computer}/>
              </label>
              <label htmlFor='white_board' name='white_board'>Whiteboard 
                <input type='checkbox' id='white_board' name='white_board' onChange={onEquipChange}  value={room.equipment.white_board}/>
              </label>
              <label htmlFor='equisound_systempment' name='sound_system'>Soundsystem 
                <input type='checkbox' id='sound_system' name='sound_system' onChange={onEquipChange}  value={room.equipment.sound_system}/>
              </label>
              <label htmlFor='projector' name='projector'>Projector 
                <input type='checkbox' id='projector' label='projector' name='projector' onChange={onEquipChange}  value={room.equipment.projector}/>
              </label>
            </label>
          </div>
          
        </div>
        {error && <div className='help-block text-danger'>{saveErrorMessage}</div>}
        <div className="editFormButtonContainer"><input type='submit' value='Create' className='btn btn-primary' />
        <button onClick={() => this.cancel()} className='btn btn-secondary'>Cancel</button></div>
      </form>
    );
  }

  updateForm = () => {
    const { room, isSubmitted, saveErrorMessage } = this.state;
    const { error } = this.props;

    const onChange = (event) => {
      const { name, value } = event.target;

      this.setState({
        room: {
          ...room,
          [name]: value,
        },
      });
    };

    const onEquipChange = (event) => {
      const { name,checked } = event.target;
      this.setState({
        room: {
          ...room,
          equipment: {
            ...room.equipment,
            [name] : checked ? 1 : 0}          
                 
        },
      });
    };
    return (
      <form autoComplete='new-password3' onSubmit={this.handleSubmitUpdate}>
        <div>
        <div>
          <div >
            <label htmlFor='name'>Name</label>
            <input type='text' className='form-control' name='name' value={room.name} onChange={onChange} />
            {isSubmitted && !room.name && <div className='help-block text-danger'>Name is required</div>}
          </div>
          <div >
            <label htmlFor='capacity'>Capacity</label>
            <input type='text' className='form-control' name='capacity' value={room.capacity} onChange={onChange}/>
            {isSubmitted && !room.capacity && <div className='help-block text-danger'>Capacity is required</div>}
          </div>
          <div >
            <label htmlFor='description'>Description</label>
            <input type='text' className='form-control' name='description' value={room.description} onChange={onChange}/>
          </div>
          <div>
          <div>
            <label htmlFor='type'>Type</label>
            <Select
              native
              value={this.state.room.type}
              onChange={onChange}
              inputProps={{ name: 'type', id: 'create-form-select' }}
            >
              <option value={0} />
              <option value={1}>arena</option>
              <option value={2}>auditorium</option>
              <option value={3}>bar</option>
              <option value={4}>university</option>
              <option value={5}>theatre</option>
              <option value={6}>cultural center</option>
              <option value={7}>house</option>
              <option value={8}>outdoor</option>
            </Select>
          </div>        
            <label htmlFor='equipment' name='equipment'>Equipment :   
              <label htmlFor='computer' name='computer'>Computer 
                <input type='checkbox' checked={room.equipment.computer === 1} id='computer' name='computer' onChange={onEquipChange}  value={room.equipment.computer}/>
              </label>
              <label htmlFor='white_board' name='white_board'>Whiteboard 
                <input type='checkbox' checked={room.equipment.white_board === 1} id='white_board' name='white_board' onChange={onEquipChange}  value={room.equipment.white_board}/>
              </label>
              <label htmlFor='equisound_systempment' name='sound_system'>Soundsystem 
                <input type='checkbox' checked={room.equipment.sound_system === 1} id='sound_system' name='sound_system' onChange={onEquipChange}  value={room.equipment.sound_system}/>
              </label>
              <label htmlFor='projector' name='projector'>Projector 
                <input type='checkbox' checked={room.equipment.projector === 1} id='projector' label='projector' name='projector' onChange={onEquipChange}  value={room.equipment.projector}/>
              </label>
            </label>
          </div>
        </div>
        </div>
        {error && <div className='help-block text-danger'>{saveErrorMessage}</div>}
        <div>        <div className="editFormButtonContainer"><input type='submit' value='Update' className='btn btn-primary' />
        <button onClick={() => this.cancel()} className='btn btn-secondary'>Cancel</button></div>
        </div>
      </form>
    );
  }


  onEditClick = (room) => {
    this.setState({ room, showRoomList: false, showUpdateForm: true, showCreateForm: false, isSubmitted: false });
  };

  onCreateClick = (room) => {
    this.setState({ room: {
      name: '',
      type: '',
      capacity: '',
      description: '',
      equipment: {computer : 0 ,white_board : 0, sound_system : 0, projector : 0},
      id: '',

    },
    showRoomList: false,
    showUpdateForm: false,
    showCreateForm: true,
    isSubmitted: false });
  };

  onDeleteClick = (room) => {
    const { dispatch } = this.props;
    // eslint-disable-next-line no-alert
    const confirmation = window.confirm('Confirm delete');
    if (confirmation) {
      dispatch(deleteRoom(room.id));
    }
  };

  editFormatter(cell, room) {
    return <Button size='sm' variant='primary' onClick={() => this.onEditClick(room)}><FontAwesomeIcon icon={faPencilAlt} /> Edit</Button>;
  }

  deleteFormatter(cell, room) {
    return <Button size='sm' variant='danger' className='btnGrid2' onClick={() => this.onDeleteClick(room)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</Button>;
  }

  render() {
    const { showRoomList, showUpdateForm, showCreateForm } = this.state;
    const { history } = this.props;

    return (
      <div className='room-manager-container'>
        <HeaderAdmin history={history}></HeaderAdmin>
        <div className='room-manager-body container-fluid'>
          {showRoomList && this.roomList()}
          {showUpdateForm && this.updateForm()}
          {showCreateForm && this.createForm()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { rooms, fetching, error } = state.administrator;
  return {
    rooms,
    fetching,
    error,
  };
}

export default withRouter(connect(mapStateToProps)(RoomManager));

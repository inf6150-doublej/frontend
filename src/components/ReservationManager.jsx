import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/CustomBootstrapTable.css';
import '../css/ReservationManager.css';
import Button from 'react-bootstrap/Button';
import MyCalendar from 'react-calendar';
import TimePickers from './pure/TimePickers.jsx';
import Calendar from './Calendar.jsx';
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import HeaderAdmin from './pure/HeaderAdmin.jsx';
import {
  deleteReservation,
  createReservation,
  updateReservation,
  getReservations,
} from '../store/actions/admin.actions';

// React-Bootstrap
const ReactBsTable = require('react-bootstrap-table');

const { BootstrapTable } = ReactBsTable;
const { TableHeaderColumn } = ReactBsTable;
require('../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');

// Reservation by an admin
class ReservationManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: {
          date : new Date(),
      },
      showReservationList: true,
      showUpdateForm: false,
      showCreateForm: false,
      isSubmitted: false,  
      saveErrorMessage: 'Unable to save.  Reservation already exist'   
    };

    const { dispatch } = this.props;
    dispatch(getReservations());

    this.handleSubmitCreate = this.handleSubmitCreate.bind(this);
    this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
  }

  cancel = () => { this.setState({ showReservationList: true, showCreateForm: false, showUpdateForm: false, isSubmitted: false  }); }


  rowClassNameFormat = (row, rowIdx) =>
  // row is whole row object
  // rowIdx is index of row
  (rowIdx % 2 === 0 ? 'td-even' : 'td-odd')
  ;

  createCustomInsertButton = onClick => (
    <Button size='sm' className='btnCreate' variant='info' onClick={() => this.onCreateClick(null)}><FontAwesomeIcon icon={faPlus} />&nbsp;Create</Button>
  )

  // List all reservations
  reservationList = () => {
    const { reservations } = this.props;

    const options = {
      insertBtn: this.createCustomInsertButton,
      defaultSortName: 'user_id', // default sort column by user id
      defaultSortOrder: 'asc', // default sort order
    };

    return (
      <BootstrapTable
        data={reservations}
        version='4'
        hover condensed pagination search insertRow trClassName={this.rowClassNameFormat}
        options={options}
        multiColumnSearch={ true }
      >
        <TableHeaderColumn dataField='edit' width={'80px'} dataFormat={ this.editFormatter.bind(this) }></TableHeaderColumn>
        <TableHeaderColumn dataField='delete' width={'90px'} dataFormat={ this.deleteFormatter.bind(this) }></TableHeaderColumn>
        <TableHeaderColumn isKey dataField='id' dataSort hidden={true}></TableHeaderColumn>
        <TableHeaderColumn dataField='user_id' dataSort>User</TableHeaderColumn>
        <TableHeaderColumn dataField='room_id' dataSort>Room</TableHeaderColumn>
        <TableHeaderColumn dataField='date_begin' dataSort>Begin time</TableHeaderColumn>
        <TableHeaderColumn dataField='date_end' dataSort>End time</TableHeaderColumn>
      </BootstrapTable>);
  }

  // Click on Create
  handleSubmitCreate(event) {
    event.preventDefault();
    const { reservation } = this.state;
    const { user_id, room_id, begin, end, date } = reservation;
    const { dispatch } = this.props;

    if (user_id && room_id && begin && end) {

      const onSuccess = () => {
        this.setState({ showReservationList: true, showCreateForm: false });
        dispatch(getReservations());
      };

      let [hour, min] = begin.split(':');
      date.setHours(hour, min, '0');
      const dateEnd = new Date(date);
      [hour, min] = end.split(':');
      dateEnd.setHours(hour, min, '0');

      const data = { 
          ...reservation,
          begin: date.toString(),
          end: dateEnd.toString(),
      }

      dispatch(createReservation(data, onSuccess));
    } else {
      this.setState({ reservation, showReservationList: false, showUpdateForm: false, showCreateForm: true, isSubmitted: true });
    }
  }


  handleSubmitUpdate(event) {
    event.preventDefault();
    const { reservation } = this.state;
    const { user_id, room_id, begin, end, date } = reservation;
    const { dispatch } = this.props;

    if (user_id && room_id && begin && end) {

      const onSuccess = () => {
        this.setState({ showReservationList: true, showUpdateForm: false });
      };

      let [hour, min] = begin.split(':');
      date.setHours(hour, min, '0');
      const dateEnd = new Date(date);
      [hour, min] = end.split(':');
      dateEnd.setHours(hour, min, '0');

      const data = { 
          ...reservation,
          begin: date.toString(),
          end: dateEnd.toString(),
      }
      dispatch(updateReservation(data, onSuccess));
    } else {
      this.setState({ reservation, showReservationList: false, showUpdateForm: true, showCreateForm: false, isSubmitted: true });
    }
  }



  createForm = () => {
    const { reservation, isSubmitted, saveErrorMessage } = this.state;
    const { error } = this.props;

    const onChangeDate = async (date) => {
        await this.setState({ reservation:{ ...reservation, date } });
    }
   
    
    
    const onTimeChange = async (e) => {
        const { name, value } = e.target;
        const { date, begin, end } = this.state.reservation;
        switch (name) {
        
        case 'time-picker-begin':
            await this.setState({ reservation:{ ...reservation, begin: value } });
            if (this.state.begin > end) {
            await this.setState({ reservation:{ ...reservation, end: this.state.begin } });
            }
            break;
        case 'time-picker-end':
            await this.setState({ reservation: { ...reservation, end: value } });
            if (begin > this.state.end) {
            await this.setState({ reservation:{ ...reservation, begin: this.state.end } });
            }
            break;
        default:
            break;
        }

    }

    const onChange = (event) => {
      const { name, value } = event.target;
      this.setState({
          reservation: {
            ...reservation,
            [name]: value,
          },
      });      
    };
    return (
        <form autoComplete='new-password2' onSubmit={this.handleSubmitCreate}> 
            <div>
                <div>
                    <label htmlFor='user_id'>User id</label>
                    <input type='text' className='form-control' name='user_id' value={reservation.user_id} onChange={onChange} />
                    {isSubmitted && !reservation.user_id && <div className='help-block text-danger'>User ID is required</div>}
                </div>
                <div >
                    <label htmlFor='room_id'>Room id</label>
                    <input type='text' className='form-control' name='room_id' value={reservation.room_id} onChange={onChange} />
                    {isSubmitted && !reservation.room_id && <div className='help-block text-danger'>Room ID is required</div>}
                </div>
               
               <Calendar onChangeDate={onChangeDate} onTimeChange={onTimeChange} date={this.state.reservation.date} begin={this.state.reservation.begin} end={this.state.reservation.end} />
            </div>   

            {error && <div className='help-block text-danger'>{saveErrorMessage}</div>}

            <div className="editFormButtonContainer"><input type='submit' value='Create' className='btn btn-primary' />
            <button onClick={() => this.cancel()} className='btn btn-secondary'>Cancel</button></div>
        </form>
    );
  }

  updateForm = () => {
    const { reservation, isSubmitted, saveErrorMessage } = this.state;
    const { error } = this.props;

    const onChangeDate = async (date) => {
        await this.setState({ reservation:{ ...reservation, date } });
        console.log(this.state.reservation)
    }
   
    
    
    const onTimeChange = async (e) => {
        const { name, value } = e.target;
        const { date, begin, end } = this.state.reservation;
        switch (name) {
        
        case 'time-picker-begin':
            await this.setState({ reservation:{ ...reservation, begin: value } });
            if (this.state.begin > end) {
            await this.setState({ reservation:{ ...reservation, end: this.state.begin } });
            }
            break;
        case 'time-picker-end':
            await this.setState({ reservation: { ...reservation, end: value } });
            if (begin > this.state.end) {
            await this.setState({ reservation:{ ...reservation, begin: this.state.end } });
            }
            break;
        default:
            break;
        }
        console.log(this.state.reservation)
    }

    const onChange = (event) => {
      const { name, value } = event.target;
      this.setState({
          reservation: {
            ...reservation,
            [name]: value,
          },
      });      
    };

    return (
        <form autoComplete='new-password2' onSubmit={this.handleSubmitUpdate}> 
          <div>
            <div>
                <label htmlFor='user_id'>User id</label>
                <input type='text' className='form-control' name='user_id' value={reservation.user_id} onChange={onChange} />
                {isSubmitted && !reservation.user_id && <div className='help-block text-danger'>User ID is required</div>}
            </div>
            <div >
                <label htmlFor='room_id'>Room id</label>
                <input type='text' className='form-control' name='room_id' value={reservation.room_id} onChange={onChange} />
                {isSubmitted && !reservation.room_id && <div className='help-block text-danger'>Room ID is required</div>}
            </div>
            <Calendar onChangeDate={onChangeDate} onTimeChange={onTimeChange} date={this.state.reservation.date} begin={this.state.reservation.begin} end={this.state.reservation.end} />
          </div>    

          {error && <div className='help-block text-danger'>{saveErrorMessage}</div>}

          <div className="editFormButtonContainer"><input type='submit' value='Create' className='btn btn-primary' />
          <button onClick={() => this.cancel()} className='btn btn-secondary'>Cancel</button></div>
        </form>
    );  
  }



  onEditClick = (reservation) => {
    this.setState({ reservation, showReservationList: false, showUpdateForm: true, showCreateForm: false, isSubmitted: false });
  };

  onCreateClick = () => {
    this.setState({ reservation: {
        user_id: '',
        room_id: '',
        begin: '',
        end: '',
        id: '',
      },
      showReservationList: false,
      showUpdateForm: false,
      showCreateForm: true,
      isSubmitted: false,
    });
  };


  onDeleteClick = (reservation) => {
    const { dispatch } = this.props;
    // eslint-disable-next-line no-alert
    const confirmation = window.confirm('Confirm delete');
    if (confirmation) {
      dispatch(deleteReservation(reservation.id));
    }
  };

  editFormatter(cell, reservation) {
    return <Button size='sm' variant='primary' onClick={() => this.onEditClick(reservation)}><FontAwesomeIcon icon={faPencilAlt} /> Edit</Button>;
  }

  deleteFormatter(cell, reservation) {
    return <Button size='sm' variant='danger' className='btnGrid2' onClick={() => this.onDeleteClick(reservation)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</Button>;
  }


  render() {
    const { showReservationList, showUpdateForm, showCreateForm } = this.state;
    const { history } = this.props;

    return (
      <div className='reservation-manager-container'>
        <HeaderAdmin history={history}></HeaderAdmin>
        <div className='reservation-manager-body container-fluid'>
          {showReservationList && this.reservationList()}
          {showUpdateForm && this.updateForm()}
          {showCreateForm && this.createForm()}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { reservations, fetching, error } = state.administrator;
  
  return {
    reservations,
    fetching,
    error,
  };
}
export default withRouter(connect(mapStateToProps)(ReservationManager));

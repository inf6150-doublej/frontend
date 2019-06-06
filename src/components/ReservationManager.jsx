import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/CustomBootstrapTable.css';
import '../css/ReservationManager.css';
import Button from 'react-bootstrap/Button';
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


class ReservationManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: {},
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

  reservationList = () => {
    const { reservations} = this.props;

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

  handleSubmitCreate(event) {
    event.preventDefault();
    const { reservation } = this.state;
    const { dispatch } = this.props;

    if (reservation.user_id && reservation.room_id && reservation.date_begin && reservation.date_end) {

      const onSuccess = () => {
        this.setState({ showReservationList: true, showCreateForm: false });
        dispatch(getReservations());
      };

      dispatch(createReservation(reservation, onSuccess));
    } else {
      this.setState({ reservation, showReservationList: false, showUpdateForm: false, showCreateForm: true, isSubmitted: true });
    }
  }


  handleSubmitUpdate(event) {
    event.preventDefault();
    const { reservation } = this.state;
    const { dispatch } = this.props;

    if (reservation.user_id && reservation.room_id && reservation.date_begin && reservation.date_end) {

      const onSuccess = () => {
        this.setState({ showReservationList: true, showUpdateForm: false });
      };

      dispatch(updateReservation(reservation, onSuccess));
    } else {
      this.setState({ reservation, showReservationList: false, showUpdateForm: true, showCreateForm: false, isSubmitted: true });
    }
  }



  createForm = () => {
    const { reservation, isSubmitted, saveErrorMessage } = this.state;
    const { error } = this.props;

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
                <div >
                    <label htmlFor='begin'>Begin time</label>
                    <input type='text' className='form-control' name='begin' value={reservation.date_begin} onChange={onChange} />
                    {isSubmitted && !reservation.date_begin && <div className='help-block text-danger'>Begin time is required</div>}
                </div>
                <div >
                    <label htmlFor='end'>End time</label>
                    <input type='text' className='form-control' name='end' value={reservation.date_end} onChange={onChange} />
                    {isSubmitted && !reservation.date_end && <div className='help-block text-danger'>End time is required</div>}
                </div>
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
            <div >
                <label htmlFor='begin'>Begin time</label>
                <input type='text' className='form-control' name='begin' value={reservation.date_begin} onChange={onChange} />
                {isSubmitted && !reservation.date_begin && <div className='help-block text-danger'>Begin time is required</div>}
            </div>
            <div >
                <label htmlFor='end'>End time</label>
                <input type='text' className='form-control' name='end' value={reservation.date_end} onChange={onChange} />
                {isSubmitted && !reservation.date_end && <div className='help-block text-danger'>End time is required</div>}
            </div>
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

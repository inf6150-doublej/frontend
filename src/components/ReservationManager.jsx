import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reservation from './pure/Reservation.jsx';
import {
  deleteReservation,
  createReservation,
  updateReservation,
  getReservations,
} from '../store/actions/admin.actions';


class ReservationManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservation: {},
      showReservationList: false,
      showUpdateForm: false,
      showCreateForm: false,
    };
  }

  cancel = () => { this.setState({ showReservationList: false, showCreateForm: false, showUpdateForm: false, showDeleteForm: false }); }

  reservationList = () => {
    const { reservations, dispatch } = this.props;

    const onDelete = (id) => {
      const confirmation = window.confirm('Confirm delete');
      if (confirmation) {
        dispatch(deleteReservation(id));
      }
    };

    const onUpdate = (reservation) => {
      this.setState({ reservation, showUpdateForm: true, showReservationList: false });
    };

    let reservationMap = [];
    if (reservations && reservations.length) {
      reservationMap = reservations.map((reservation, i) => <Reservation key={i} reservation={reservation} onDelete={onDelete} onUpdate={onUpdate} />);
    }
    return (<div>{reservationMap}</div>);
  }

  createForm = () => {
    const { reservation } = this.state;
    const { dispatch } = this.props;
    return (
      <div>
        <div>
          <div >
            <label htmlFor='user_id'>User id</label>
            <input type='text' className='form-control' name='user_id' />
          </div>
          <div >
            <label htmlFor='room_id'>Room id</label>
            <input type='text' className='form-control' name='room_id' />
          </div>
          <div >
            <label htmlFor='begin'>Begin time</label>
            <input type='text' className='form-control' name='begin' />
          </div>
          <div >
            <label htmlFor='end'>End time</label>
            <input type='text' className='form-control' name='end' />
          </div>
        </div>
        <div><button onClick={() => dispatch(createReservation(reservation))}>create</button></div>
        <div><button onClick={() => this.cancel()}>cancel</button></div>
      </div>
    );
  }

  updateForm = () => {
    const { reservation } = this.state;
    const { dispatch } = this.props;
    return (
      <div>
        <div>
          <div >
            <label htmlFor='user_id'>User id</label>
            <input type='text' className='form-control' name='user_id' value={reservation.user_id} />
          </div>
          <div >
            <label htmlFor='room_id'>Room id</label>
            <input type='text' className='form-control' name='room_id' value={reservation.room_id} />
          </div>
          <div >
            <label htmlFor='begin'>Begin time</label>
            <input type='text' className='form-control' name='begin' value={reservation.begin} />
          </div>
          <div >
            <label htmlFor='end'>End time</label>
            <input type='text' className='form-control' name='end' value={reservation.end} />
          </div>
        </div>
        <div><button onClick={() => dispatch(updateReservation(reservation))}>update</button></div>
        <div><button onClick={this.cancel}>cancel</button></div>
      </div>
    );
  }

  deleteForm = () => {
    const { reservation } = this.state;
    const { dispatch } = this.props;
    return (
      <div>
        <div>
          <div >
            <label htmlFor='email'>Email</label>
            <input type='text' className='form-control' name='email'/>
          </div>
        </div>
        <div><button onClick={() => dispatch(deleteReservation(reservation))}>delete</button></div>
        <div><button onClick={() => this.cancel()}>cancel</button></div>
      </div>
    );
  }

  handleReservationsList = () => {
    const { dispatch } = this.props;
    dispatch(getReservations());
    this.setState({ showReservationList: true, showUpdateForm: false, showCreateForm: false, showDeleteForm: false });
  };

  handleCreateForm = () => {
    this.setState({ showReservationList: false, showUpdateForm: false, showCreateForm: true, showDeleteForm: false });
  };

  handleDeleteForm = () => {
    this.setState({ showReservationList: false, showUpdateForm: false, showCreateForm: false, showDeleteForm: true });
  };

  render() {
    const { showReservationList, showUpdateForm, showCreateForm, showDeleteForm } = this.state;
    return (
      <div>
        <button name='create' onClick={this.handleCreateForm}>create reservation</button>
        <button name='delete' onClick={this.handleDeleteForm}>delete reservation</button>
        <button name='read' onClick={this.handleReservationsList}>read reservations </button>
        {showReservationList && this.reservationList()}
        {showUpdateForm && this.updateForm()}
        {showCreateForm && this.createForm()}
        {showDeleteForm && this.deleteForm()}
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { reservation, fetching } = state.administrator;
  return {
    reservation,
    fetching,
  };
}


export default connect(mapStateToProps)(ReservationManager);

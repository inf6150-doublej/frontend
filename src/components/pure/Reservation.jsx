import React from 'react';
import '../../css/Reservation.css'


const Reservation = (props) => {
    const {reservation, onDelete, onUpdate} = props

  return (
    <div className="reservation-container">
        <ul>
          <li>{reservation.id}</li>
          <li>{reservation.user_id}</li>
          <li>{reservation.room_id}</li>
          <li>{reservation.begin}</li>
          <li>{reservation.end}</li>
          <button onClick={()=>onUpdate(reservation)}>update</button>
          <button onClick={()=>onDelete(reservation.id)}>delete</button>
        </ul>
    </div>
  );
};

export default Reservation;

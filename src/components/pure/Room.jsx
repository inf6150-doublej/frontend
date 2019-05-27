import React from 'react';
import '../../css/Room.css'

const Room = (props) => {
  const { room, onReservation } = props;
  return (
    <div className="room-container">
        <ul>
          <li>{room.id}</li>
          <li>{room.name}</li>
          <li>{room.type}</li>
          <li>{room.capacity}</li>
          <li>{room.description}</li>
          <li>{room.reservation_id}</li>
          <li>{room.equipment_id}</li>
        </ul>
        {onReservation && <div><button onClick={() => onReservation(room)} value={room}>reserve</button></div>}
    </div>
  );
};

export default Room;

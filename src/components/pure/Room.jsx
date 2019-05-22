import React from 'react';
import '../../css/Room.css'

const Room = (props) => {
  const { room, onReservation } = props;
  const [id, name, type, capacity, description, reservation_id, equipment_id] = room;
  return (
    <div className="room-container">
        <ul>
          <li>{id}</li>
          <li>{name}</li>
          <li>{type}</li>
          <li>{capacity}</li>
          <li>{description}</li>
          <li>{reservation_id}</li>
          <li>{equipment_id}</li>
        </ul>
        <div><button onClick={() => onReservation(room)} value={room}>reserve</button></div>
    </div>
  );
};

export default Room;

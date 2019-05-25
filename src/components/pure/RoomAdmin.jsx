import React from 'react';
import '../../css/Room.css'

const Room = (props) => {
  const { room, onDelete, onUpdate } = props;
  //const [id, name, type, capacity, description, reservation_id, equipment_id] = room;
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
        <div><button onClick={() => onDelete(room.id)} value={room}>Delete</button></div>
        <div><button onClick={() => onUpdate(room.id)} value={room}>Update</button></div>
    </div>
  );
};


export default Room;
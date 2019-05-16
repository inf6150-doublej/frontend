import React from 'react';
import '../../css/Room.css'

const Room = (props) => {
    const {id, name, email, family_name} = props
  return (
    <div className="user-container">
        <ul>
          <li>{id}</li>
          <li>{name}</li>
          <li>{email}</li>
          <li>{family_name}</li>
        </ul>
    </div>
  );
};

export default Room;

import React from 'react';
import '../../css/User.css'


const User = (props) => {
    const {user, onDelete, onUpdate} = props;

  return (
    <div className="user-container">
        <ul>
          <li>{user.id}</li>
          <li>{user.name}</li>
          <li>{user.email}</li>
          <li>{user.family_name}</li>
          <button onClick={()=>onUpdate(user)}>update</button>
          <button onClick={()=>onDelete(user.id)}>delete</button>
        </ul>
    </div>
  );
};

export default User;

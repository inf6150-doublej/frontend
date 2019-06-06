import React from 'react';
import Media from 'react-bootstrap/Media';
import '../../css/User.css';


const User = (props) => {
  const { user, onDelete, onUpdate } = props;

  return (
    <div className="user-container">
      <ul>
      <Media as="li">
        <Media.Body>
        {/*}<li>{user.id}</li>{*/}
        <li>{user.name} {user.family_name}</li>
        <li>{user.email}</li>
        {/*}<li>{onDelete && <button onClick={() => onUpdate(user)}>update</button>}</li>
        <li>{onUpdate && <button onClick={() => onDelete(user.id)}>delete</button>}</li>{*/}
        </Media.Body>
      </Media>
      </ul>
    </div>
  );
};

export default User;

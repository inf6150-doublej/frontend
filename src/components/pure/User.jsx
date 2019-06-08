import React from 'react';
import Media from 'react-bootstrap/Media';
import '../../css/User.css';

// Display a user
const User = (props) => {
  const { user } = props;

  return (
    <div className="user-container">
      <ul>
      <Media as="li">
        <Media.Body>
        <li>{user.name} {user.family_name}</li>
        <li>{user.email}</li>
        </Media.Body>
      </Media>
      </ul>
    </div>
  );
};

export default User;

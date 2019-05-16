import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/UserProfile.css'

const UserProfile = (props) => {
  const { user, logout, viewAdmin} = props;

  return (
    <div className='user-profile-container'>
      <div className='user-profile-wrapper'>
        <div className='user-profile'>Devenez hote</div>
        <div className='user-profile'>Aide</div>
        <Link to='/register' className='user-profile'>Register</Link>
        {user && <div className='user-profile' onClick={logout}>Logout</div>}
        {!user && <Link to="/login" className="user-profile">Login</Link>}
        {user && user.admin && <div className="image" onClick={viewAdmin}>Manage</div>}
      </div>
    </div>
  );
};

export default UserProfile;

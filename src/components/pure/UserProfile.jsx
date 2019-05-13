import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/UserProfile.css'

const UserProfile = (props) => {
  const { user, logout, viewAccount, viewCart } = props;

  return (
    <div className='user-profile-container'>
      <div className='user-profile-wrapper'>
        <div className='user-profile'>Devenez hote</div>
        <div className='user-profile'>Aide</div>
        <Link to='/register' className='user-profile'>Register</Link>
        {user && <div className='user-profile'>{user.username}</div>}
        {user && <div className='user-profile' onClick={logout} >logout</div>}
        {!user && <Link to="/login" className="user-profile">Login</Link>}
        {user && <div className="image"><img alt="login" onClick={viewAccount}/></div>}
        {/* <img className='user-profile-object'  onClick={viewCart} alt='cart svg' /> */}
      </div>
    </div>
  );
};

export default UserProfile;

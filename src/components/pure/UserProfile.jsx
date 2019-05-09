import React from 'react';
import { Link } from 'react-router-dom';


const UserProfile = (props) => {
  const { user, logout, viewAccount, viewCart } = props;

  return (
    <div className="UserProfile">
      <div className="User">
        {user && <div className='name'>{user.username}</div>}
        {user && <div className='name' onClick={logout} >logout</div>}
        {!user && <Link to="/login" className="name">login</Link>}
        {user && <div className="image"><img alt="login" onClick={viewAccount}/></div>}
        <img className='user-profile-object'  onClick={viewCart} alt='cart svg' />
      </div>
    </div>
  );
};

export default UserProfile;

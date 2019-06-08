import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import '../../css/HeaderAdmin.css';

// Header used onAdmin section
const HeaderAdmin = (props) => {
  const { history } = props;
  return (
    <header className="headerWithMenu">
      <Logo viewHome={() => history.push('/')} width={60} height={60} />
      <div className='user-profile-container'>
        <div className='user-profile-wrapper'>
          <Link to='/admin/users' className='user-profile'>Manage users</Link>
          <Link to='/admin/reservation' className='user-profile'>Manage reservations</Link>
          <Link to='/admin/rooms' className='user-profile'>Manage rooms</Link>
          <Link to='/admin/rooms/usage' className='user-profile'>Statistics</Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;

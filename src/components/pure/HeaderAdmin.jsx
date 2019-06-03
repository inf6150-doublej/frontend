import React from 'react';
import Logo from './Logo.jsx';
import { Link } from 'react-router-dom';
import '../../css/HeaderAdmin.css'

const HeaderAdmin = (props) => {
  const { history } = props;
  return (
    <header className="headerWithMenu">
      <Logo viewHome={() => history.push('/')} />
      <div className='user-profile-container'>
        <div className='user-profile-wrapper'>
          {<Link to='/admin/users' className='user-profile'>Manage users</Link>}
          {<Link to='/admin/reservation' className='user-profile'>Manage reservations</Link>}
          {<Link to='/admin/rooms' className='user-profile'>Manage rooms</Link>}
        </div>
      </div>
      
    </header>
    
  );
};

export default HeaderAdmin;
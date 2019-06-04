import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/UserProfile.css';
import { Navbar, NavItem } from 'react-bootstrap';
import logo from '../../img/BE2.png';


const UserProfile = (props) => {
  const { user, logout, viewAdmin } = props;
  return (
      <Navbar bg='white' variant='light'>
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={logo}
            width='100'
            height='100'
            className='d-inline-block align-center'
          />
          <span className='user-profile'>{' BookingExpert '}</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='navbar-nav mr-auto user-profile-wrapper'>
          <NavItem right>{!user && <Link to='/register' className='user-profile'>Register</Link>}</NavItem>
          <NavItem right>{user && <div className='user-profile' onClick={logout}>Logout</div>}</NavItem>
          <NavItem right>{!user && <Link to='/login' className='user-profile'>Login</Link>}</NavItem>
          <NavItem right>{user && user.admin && <div className='user-profile' onClick={viewAdmin}>Manage</div>}</NavItem>
        </Navbar.Collapse>
      </Navbar>

  );
};

export default UserProfile;

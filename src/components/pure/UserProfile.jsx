import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/UserProfile.css'
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Image from 'react-image-resizer';

const logo = require('../../img/BE2.png');
const UserProfile = (props) => {
  const { user, logout, viewAdmin} = props;
    return(
      <>
  <Navbar bg="white" variant="light">
  <Navbar.Brand href='/'>
      <img
        alt=""
        src={logo}
        width="60"
        height="60"
        className="d-inline-block align-center"
      />
      {' BookingExpert '}
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="navbar-nav mr-auto">
          <NavItem right>{!user && <Link to='/register' className='user-profile'>Register</Link>}</NavItem>
          <NavItem right>{user && <div className='user-profile' onClick={logout}>Logout</div>}</NavItem>
          <NavItem right>{!user && <Link to="/login" className="user-profile">Login</Link>}</NavItem>
          <NavItem right>{user && user.admin && <div className="user-profile" onClick={viewAdmin}>Manage</div>}</NavItem>
    </Navbar.Collapse>
  </Navbar>
</>

  );      
}
export default UserProfile;

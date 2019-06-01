import React, { Component } from 'react';
import Logo from './Logo.jsx';
import UserProfile from './UserProfile.jsx';


const HeaderAdmin = (props) => {
  const { user, history, logout, goToUrl } = props;
  return (
    <header>
      <Logo viewHome={() => goToUrl(history, '/')} />
      <UserProfile user={user} logout={logout} viewAdmin={() => goToUrl(history, '/admin')} />
    </header>
  );
};

export default HeaderAdmin;
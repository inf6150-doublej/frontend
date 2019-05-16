import React, { Component } from 'react';
import Logo from './Logo.jsx';
import Navigation from './Navigation.jsx';
import UserProfile from './UserProfile.jsx';


const Header = (props) => {
  const { user, history, searchTerm, handleSearchBarKeyUp, handleSearchBarChange, logout, goToUrl } = props;
  return (
    <header>
      <Logo viewHome={() => goToUrl(history, '/')} />
      {/* <Navigation /> */}
      <UserProfile user={user} logout={logout} viewAdmin={() => goToUrl(history, '/admin')} />
    </header>
  );
};

export default Header;
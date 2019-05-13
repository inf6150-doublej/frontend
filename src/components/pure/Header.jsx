import React, { Component } from 'react';
import Logo from './Logo.jsx';
import Navigation from './Navigation.jsx';
import UserProfile from './UserProfile.jsx';
import SearchBar from './SearchBar.jsx';

const Header = (props) => {
  const { user, history, searchTerm, handleSearchBarKeyUp, handleSearchBarChange, logout, goToUrl } = props;
  return (
    <header>
      <Logo viewHome={() => goToUrl(history, '/')} />
      {/* <Navigation /> */}
      <UserProfile user={user} logout={logout} viewCart={() => goToUrl(history, '/mycart')} viewAccount={() => goToUrl(history, '/myaccount')} />
    </header>
  );
};

export default Header;
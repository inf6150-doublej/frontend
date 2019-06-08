import React from 'react';
import UserProfile from './UserProfile.jsx';

// Header used on Home page
const Header = (props) => {
  const { user, history, logout, goToUrl } = props;
  return (
    <header>
      <UserProfile user={user} logout={logout} viewAdmin={() => goToUrl(history, '/admin/users')} />
    </header>
  );
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onKeyUp, onChange, searchTerm }) => {

  return (
    <div id="search" className="search-bar">
      <input onKeyUp={onKeyUp} onChange={onChange} type="search" placeholder="Search for a title..." value={searchTerm} />
    </div>
  );
};

SearchBar.propTypes = {
  onKeyUp: PropTypes.func,
  onChange: PropTypes.func,
  searchTerm: PropTypes.string,
};

export default SearchBar;

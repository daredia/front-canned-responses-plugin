import React from 'react';

const SearchBox = ({ searchQuery, onChange }) => {
  return (
    <input
      id="template-search-input"
      type="search"
      placeholder="Search templates..."
      className="template-searchbox"
      value={searchQuery}
      onChange={onChange}
    />
  );
};

export default SearchBox;

import React from 'react';

const SearchBox = ({ searchQuery, onChange }) => {
  return (
    <input
      id="template-search-input"
      type="text"
      placeholder="Search templates..."
      value={searchQuery}
      onChange={onChange}
    />
  );
};

export default SearchBox;

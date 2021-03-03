import React from 'react';

const SearchBox = ({ searchQuery, onChange }) => {
  return (
    <div className="template-searchbox-container">
      <input
        id="template-search-input"
        type="search"
        placeholder="Search templates..."
        autocomplete="off"
        className="template-searchbox"
        value={searchQuery}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBox;

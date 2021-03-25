import React from 'react';

const SearchBox = ({ searchQuery, onChange, onReset }) => {
  return (
    <div className="template-searchbox-container">
      <input
        id="template-search-input"
        type="search"
        placeholder="Search templates..."
        autoComplete="off"
        className="template-searchbox"
        value={searchQuery}
        onChange={onChange}
        required
      />
      <button class="template-search-close-btn" type="reset" onClick={onReset}></button>
    </div>
  );
};

export default SearchBox;

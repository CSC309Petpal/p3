// SidePanel.js
import React from 'react';

function SidePanel({ setSortOption }) {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="col-md-3">
      {/* ... other parts of the side panel ... */}
      <select onChange={handleSortChange}>
        <option value="">Select sort option</option>
        <option value="name">Name: A to Z</option>
        <option value="-name">Name: Z to A</option>
        {/* Add more sort options as needed */}
      </select>
    </div>
  );
}

export default SidePanel;

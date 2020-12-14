import React from 'react';
import { useSelector } from 'react-redux';

const FilterControls = () => {
  const filters = useSelector(state =>
    Object.keys(state.uiState.activeDeviceFilters)
  );
  return (
    <div>
      {filters.map(filter => (
        <div>filter</div>
      ))}
    </div>
  );
};

export default FilterControls;

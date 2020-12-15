import FilterControlsItem from 'features/geometry/FilterControlsItem';
import React, { memo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const FilterControls = () => {
  const [isShowing, setIsShowing] = useState(false);
  const filters = useSelector(
    state => state.uiState.activeDeviceFilters,
    shallowEqual
  );
  return (
    <div className='filter-controls-container'>
      {isShowing && (
        <div className='filter-controls'>
          {Object.keys(filters).map(filter => (
            <FilterControlsItem
              filter={{ [filter]: filters[filter] }}
              key={filter}
            />
          ))}
        </div>
      )}
      <button onClick={() => setIsShowing(!isShowing)}>Filters</button>
    </div>
  );
};

export default memo(FilterControls);

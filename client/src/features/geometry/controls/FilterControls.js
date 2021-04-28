import useOnClickOutside from 'common/useOnClickOutside';
import Button from 'features/geometry/controls/Button';
import FilterControlsItem from 'features/geometry/controls/FilterControlsItem';
import PerformanceMode from 'features/geometry/controls/PerformanceMode';
import React, { memo, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

const FilterControls = () => {
  const [isShowing, setIsShowing] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsShowing(false));
  const filters = useSelector(
    state => state.uiState.activeDeviceFilters,
    shallowEqual
  );
  return (
    <div className='filter-controls' ref={ref}>
      {isShowing && (
        <div className='controls-container s'>
          <PerformanceMode />
          {Object.keys(filters).map(filter => (
            <FilterControlsItem
              filter={{ [filter]: filters[filter] }}
              key={filter}
            />
          ))}
        </div>
      )}
      <Button
        type='filter'
        mod='shadow hov'
        handleClick={() => setIsShowing(!isShowing)}
      />
    </div>
  );
};

export default memo(FilterControls);

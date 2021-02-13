import { toggleDeviceFilter } from 'app/uiStateSlice';
import Button from 'features/geometry/controls/Button';
import React from 'react';
import { useDispatch } from 'react-redux';

const FilterControlsItem = ({ filter }) => {
  const dispatch = useDispatch();
  const name = Object.keys(filter);
  return (
    <Button
      handleClick={() => dispatch(toggleDeviceFilter(name))}
      type={name}
      mod={`m ${filter[name] ? 'selected' : 'disabled pointer'}`}
    />
  );
};

export default FilterControlsItem;

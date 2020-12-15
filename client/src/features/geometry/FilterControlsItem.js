import { toggleDeviceFilter } from 'app/uiStateSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const FilterControlsItem = ({ filter }) => {
  const dispatch = useDispatch();
  const name = Object.keys(filter);
  return (
    <button onClick={() => dispatch(toggleDeviceFilter(name))}>{name}</button>
  );
};

export default FilterControlsItem;

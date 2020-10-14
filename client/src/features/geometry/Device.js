import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import {  } from 'features/geometry/deviceSlice';

const Device = id => {
  const { coords } = useSelector(state => state.devices.entities[id]);
  return <g></g>;
};

export default Device;

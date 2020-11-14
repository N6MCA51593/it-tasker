import React from 'react';
import { selectFloorById } from 'app/selectors';
import { useSelector } from 'react-redux';

const FloorRow = ({ id, isEditing, clickHandler, items }) => {
  const { name } = useSelector(state => selectFloorById(state, id));

  return <div></div>;
};

export default FloorRow;

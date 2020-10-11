import React from 'react';

const RoomNameLabel = ({ coords, name }) => {
  const { x, y } = coords;
  return (
    <text x={x} y={y}>
      {name}
    </text>
  );
};

export default RoomNameLabel;

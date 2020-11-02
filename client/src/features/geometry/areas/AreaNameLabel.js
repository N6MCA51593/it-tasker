import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { moveLabel, renameLabel } from 'features/geometry/areas/areaSlice';
import { moveAreaLabelGeo, renameAreaLabelGeo } from 'common/uiStates';

const AreaNameLabel = ({ coords, name, mode, id }) => {
  const [labelName, setLabelName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { x, y } = coords;
  const handleClick = () => {
    if (mode === moveAreaLabelGeo) {
      dispatch(moveLabel(id));
    } else if (mode === renameAreaLabelGeo) {
      setIsEditing(!isEditing);
    }
  };

  const handleChange = e => {
    setLabelName(e.target.value);
  };

  const onBlur = () => {
    setIsEditing(false);
    if (name !== labelName) {
      dispatch(renameLabel({ id, name: labelName }));
    }
  };

  const className = `name-label${
    mode === renameAreaLabelGeo || mode === moveAreaLabelGeo ? '' : '-disabled'
  }`;

  return (
    <g>
      {!isEditing && (
        <text x={x} y={y} onClick={() => handleClick()} className={className}>
          {labelName ? labelName : '-.-'}
        </text>
      )}
      {isEditing && (
        <foreignObject
          x={x}
          y={y - 15}
          width='100px'
          height='100px'
          className='text-edit'
        >
          <input
            value={labelName}
            onChange={e => handleChange(e)}
            onBlur={() => onBlur()}
          />
        </foreignObject>
      )}
    </g>
  );
};

export default AreaNameLabel;

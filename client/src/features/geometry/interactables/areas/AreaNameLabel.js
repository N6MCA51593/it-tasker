import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  moveLabel,
  renameLabel
} from 'features/geometry/interactables/areas/areaSlice';
import { MOVE_AREA_LABEL_GEO, RENAME_AREA_LABEL_GEO } from 'app/constants';

const AreaNameLabel = ({ coords, name, mode, id }) => {
  const [labelName, setLabelName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { x, y } = coords;
  const handleClick = () => {
    if (mode === MOVE_AREA_LABEL_GEO) {
      dispatch(moveLabel(id));
    } else if (mode === RENAME_AREA_LABEL_GEO) {
      setLabelName(name);
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
    mode === RENAME_AREA_LABEL_GEO || mode === MOVE_AREA_LABEL_GEO
      ? ''
      : '-disabled'
  }`;

  return (
    <g>
      {!isEditing && (
        <text x={x} y={y} onClick={() => handleClick()} className={className}>
          {name ? name : '-.-'}
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
            autoFocus
          />
        </foreignObject>
      )}
    </g>
  );
};

export default AreaNameLabel;

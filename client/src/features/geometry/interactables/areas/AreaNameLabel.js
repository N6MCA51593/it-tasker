import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  moveLabel,
  renameLabel
} from 'features/geometry/interactables/areas/areaSlice';
import { MOVE_AREA_LABEL_GEO, RENAME_AREA_LABEL_GEO } from 'app/constants';
import clTern from 'common/clTern';

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

  const className = `area-name-label ${clTern(
    mode === RENAME_AREA_LABEL_GEO || mode === MOVE_AREA_LABEL_GEO,
    'events-enabled'
  )}`;

  return (
    <foreignObject x={x} y={y}>
      {isEditing ? (
        <input
          value={labelName}
          onChange={e => handleChange(e)}
          onBlur={() => onBlur()}
          autoFocus
          onFocus={e => e.target.select()}
        />
      ) : (
        <div className={className} onClick={() => handleClick()}>
          {name ? name : '-.-'}
        </div>
      )}
    </foreignObject>
  );
};

export default AreaNameLabel;

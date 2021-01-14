import clTern from 'common/clTern';
import Button from 'features/geometry/controls/Button';
import React from 'react';

const LabeledButton = ({ type, label, mod, handleClick }) => {
  return (
    <div
      className={`controls-button-labeled ${clTern(mod, mod)}`}
      onClick={handleClick}
    >
      <Button type={type} mod='m' />
      <p>{label}</p>
    </div>
  );
};

export default LabeledButton;

import { selectIsPretty } from 'app/selectors';
import { togglePerformanceMode } from 'app/uiStateSlice';
import Button from 'features/geometry/controls/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PerformanceMode = () => {
  const dispatch = useDispatch();
  const isPretty = useSelector(selectIsPretty);
  return (
    <Button
      handleClick={() => dispatch(togglePerformanceMode())}
      type={isPretty ? 'pretty' : 'simple'}
      mod={`m u ${isPretty ? 'selected' : 'disabled pointer'}`}
    />
  );
};

export default PerformanceMode;

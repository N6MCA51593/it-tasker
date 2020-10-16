import React from 'react';

const StatusIndicator = ({ status, x, y }) => {
  const style = {
    ok: '#117739',
    warning: '#776c11',
    failure: '#77111c'
  };
  return <circle cx={x} cy={y} r='5px' fill={style[status]} stroke='black' />;
};

export default StatusIndicator;

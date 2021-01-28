import clTern from 'common/clTern';
import React, { memo } from 'react';

const DeviceIcon = ({
  type,
  x,
  y,
  className = 'device-icon',
  status,
  hasActiveNotes,
  hasActiveTasks
}) => {
  return (
    <g transform='translate(-14 -14)'>
      <svg width='44' height='44' x={x} y={y} className={className}>
        <svg viewBox='0 0 600 500'>
          <rect
            x='0.5'
            y='0.5'
            width='396.5'
            height='299'
            rx='11.5'
            ry='11.5'
            className={`icon-body ${type}`}
            filter='url(#shadow)'
          />
          {/* <foreignObject x='265' y='30' width='190' height='70'>
            <div className='test'></div>
          </foreignObject>
          <foreignObject x='265' y='114' width='190' height='70'>
            <div className='test'></div>
          </foreignObject>
          <foreignObject x='265' y='198' width='190' height='70'>
            <div className='test'></div>
          </foreignObject> */}
          {/* <rect
            x='280.5'
            y='50'
            width='141'
            height='32'
            rx='12'
            ry='12'
            className={`icon-indicator ${clTern(status, status)}`}
          />
          <rect
            x='280.5'
            y='134'
            width='141'
            height='32'
            rx='12'
            ry='12'
            className={`icon-indicator tasks ${clTern(
              hasActiveTasks,
              'active'
            )}`}
          />
          <rect
            x='280.5'
            y='218'
            width='141'
            height='32'
            rx='12'
            ry='12'
            className={`icon-indicator notes ${clTern(
              hasActiveNotes,
              'active'
            )}`}
          /> */}
          <circle
            cx='330'
            cy='70'
            r='30'
            className={`icon-indicator ${clTern(status, status)}`}
          />
          <circle
            cx='330'
            cy='154'
            r='30'
            className={`icon-indicator tasks ${clTern(
              hasActiveTasks,
              'active'
            )}`}
          />
          <circle
            cx='330'
            cy='238'
            r='30'
            className={`icon-indicator notes ${clTern(
              hasActiveNotes,
              'active'
            )}`}
          />

          <use href={`#icon-${type}`} />
        </svg>
      </svg>
    </g>
  );
};

export default memo(DeviceIcon);

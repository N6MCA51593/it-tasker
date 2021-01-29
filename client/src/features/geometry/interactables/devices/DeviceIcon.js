import clTern from 'common/clTern';
import React, { memo } from 'react';

const DeviceIcon = ({
  type,
  x,
  y,
  className = 'device-icon',
  status = 'neutral',
  hasActiveNotes,
  hasActiveTasks
}) => {
  return (
    <g transform='translate(-14 -14)'>
      <svg width='44' height='44' x={x} y={y} className={className}>
        <svg viewBox='0 0 600 500'>
          <g className='device-icon-hov'>
            <rect
              x='20'
              y='0.5'
              width='396.5'
              height='299'
              rx='11.5'
              ry='11.5'
              className={`icon-body ${type}`}
              filter='url(#shadow)'
              fill={`url(#gradient-box-${type})`}
            />
            <circle
              cx='350'
              cy='70'
              r='30'
              className={`icon-indicator ${clTern(status, status)}`}
              fill={`url(#gradient-indicator-${status})`}
            />
            <circle
              cx='350'
              cy='154'
              r='30'
              className='icon-indicator'
              fill={`url(#gradient-indicator-${
                hasActiveTasks ? 'tasks' : 'neutral'
              })`}
            />
            <circle
              cx='350'
              cy='238'
              r='30'
              className='icon-indicator'
              fill={`url(#gradient-indicator-${
                hasActiveNotes ? 'notes' : 'neutral'
              })`}
            />
            <g transform='translate(20 0)'>
              <use href={`#icon-${type}`} />
            </g>
          </g>
        </svg>
      </svg>
    </g>
  );
};

export default memo(DeviceIcon);

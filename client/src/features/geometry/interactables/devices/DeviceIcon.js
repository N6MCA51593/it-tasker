import clTern from 'common/clTern';
import React from 'react';

const DeviceIcon = ({
  type,
  x,
  y,
  className,
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
          <rect
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
          />
          <use href={`#icon-${type}`} />
        </svg>
      </svg>
    </g>
  );
};

// const DeviceIcon = ({ type, x, y, className }) => {
//   return (
//     <g transform='translate(-21.5 -44)'>
//       <svg width='44' height='44' x={x} y={y} className={className}>
//         <svg viewBox='0 0 215 268.17'>
//           <path
//             d='M567.13,191C507.75,191,459,242.72,459,302.08c0,53.87,88.53,141.67,104.91,157.45a3.72,3.72,0,0,0,5.18,0C585.47,443.75,674,356,674,302.08,674,242.72,626.5,191,567.13,191Z'
//             transform='translate(-459 -191)'
//             fill='none'
//             stroke='none'
//           />
//           <path
//             d='M505.54,387.05a10.32,10.32,0,0,1-8.24-4.3c-25.08-34.29-37.8-62.15-37.8-82.82a110.62,110.62,0,0,1,2.28-22.34A10,10,0,0,1,474.65,270a10.74,10.74,0,0,1,7.29,12.38A95.47,95.47,0,0,0,480,301.6c0,17.87,11,42.08,32.79,71.95a8.43,8.43,0,0,1,1.21,7.5,8.56,8.56,0,0,1-5.53,5.52,9.09,9.09,0,0,1-2.93.48Z'
//             transform='translate(-459 -191)'
//           />
//           <path
//             d='M566.5,458.67a6.64,6.64,0,0,1-4.68-1.93c-6.29-6.23-16.2-16.32-27.66-29.05a9.36,9.36,0,0,1-2.37-5.15,8.18,8.18,0,0,1,2-6.66,9.49,9.49,0,0,1,7.05-3.14,9,9,0,0,1,6.67,3c9.68,10.63,17,17.87,18.33,19.21a1,1,0,0,0,1.36,0C576,426.28,653,349,653,301.6a93,93,0,0,0-2-19.06A10,10,0,0,1,657.29,271a10.87,10.87,0,0,1,3.73-.67A10.69,10.69,0,0,1,671.5,279a110.57,110.57,0,0,1,2,21c0,51.51-78.32,133.05-102.32,156.81A6.64,6.64,0,0,1,566.5,458.67Z'
//             transform='translate(-459 -191)'
//           />
//           <path
//             d='M630.71,237.27a9.64,9.64,0,0,1-6.6-2.62A85.13,85.13,0,0,0,566,211.5a83.75,83.75,0,0,0-56.88,22.43,9.66,9.66,0,0,1-6.58,2.6,9.39,9.39,0,0,1-4.54-1.17l-1.24-.68a9.52,9.52,0,0,1-1.8-15.36,105.91,105.91,0,0,1,143-.12,10.18,10.18,0,0,1-1.61,16.26l-.78.47a9.29,9.29,0,0,1-4.82,1.34Z'
//             transform='translate(-459 -191)'
//           />
//           <circle cx='192.5' cy='60.5' r='12' fill='red' />
//           <circle cx='62.5' cy='209.5' r='12' fill='blue' />
//           <circle cx='22.5' cy='60.5' r='12' fill='green' />
//           <path
//             d='M566.5,350.5a52,52,0,1,1,52-52c0,1.4-.06,2.79-.17,4.16a8.33,8.33,0,0,0,5.22,8.42h0a7.84,7.84,0,0,0,10.69-6.68q.25-2.91.26-5.9a68,68,0,1,0-68,68c1.78,0,3.55-.07,5.3-.21a7.88,7.88,0,0,0,6.77-10.64h0a8.26,8.26,0,0,0-8.36-5.28C569,350.45,567.75,350.5,566.5,350.5Z'
//             transform='translate(-459 -191)'
//           />
//           <use href={`#icon-${type}`} transform='translate(67 67)' />
//         </svg>
//       </svg>
//     </g>
//   );
// };

export default DeviceIcon;

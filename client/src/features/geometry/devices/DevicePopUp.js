import React from 'react';

const DevicePopUp = ({ x, y }) => {
  return (
    <foreignObject x={x - 250} y={y - 250} width='500px' height='500px'>
      <div className='popup'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam culpa
        itaque, cumque nihil perspiciatis, quas dignissimos sequi vel minus
        soluta autem, illum consectetur. Ullam esse aliquam ab laboriosam vel,
        neque fugiat aspernatur voluptatum cupiditate expedita dolore nesciunt
        sit, molestiae accusantium tempore totam pariatur autem? Quaerat tempore
        quo dolorem itaque necessitatibus.
      </div>
    </foreignObject>
  );
};

export default DevicePopUp;

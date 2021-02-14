import React from 'react';
import TimeAgo from 'timeago-react';

const Timestamp = ({ ts, mod }) => {
  const tsFormatted = new Date(ts).toString();
  return (
    <div className={`tasker-item-ts ${mod}`} title={tsFormatted} tabIndex='-1'>
      <TimeAgo datetime={ts} />
    </div>
  );
};

export default Timestamp;

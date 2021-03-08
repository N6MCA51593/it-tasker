import clTern from 'common/clTern';
import React, { useLayoutEffect, useState } from 'react';

const CollapsibleText = ({ text, id }) => {
  const isLong = text.length > 260;
  const [isShowing, setIsShowing] = useState(!isLong);

  useLayoutEffect(() => {
    if (id) {
      setIsShowing(!isLong); // Resets on id change
    }
  }, [id, isLong]);

  return (
    <div className={`collapsible-text-container ${clTern(isShowing, 'full')}`}>
      <div className={`collapsible-text-contents ${clTern(isLong, 'long')}`}>
        {text ? text : 'No description available'}
      </div>
      {isLong && (
        <div className='text-collapse' onClick={() => setIsShowing(true)}>
          Show more...
        </div>
      )}
    </div>
  );
};

export default CollapsibleText;

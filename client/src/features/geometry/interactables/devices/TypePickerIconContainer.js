import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

const TypePickerIconContainer = ({ type, types }) => {
  const refArr = useRef([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  useEffect(() => {
    refArr.current = refArr.current.slice(0, types.length);
  }, [types]);

  useLayoutEffect(() => {
    if (isFirstLoad) {
      const ref = refArr.current[types.findIndex(e => e === type)];
      if (ref) {
        scrollIntoView(ref, {
          behavior: 'auto',
          scrollMode: 'if-needed',
          block: 'nearest',
          inline: 'center'
        });
        setIsFirstLoad(false);
      }
    }
  }, [type, types, isFirstLoad]);

  useEffect(() => {
    const ref = refArr.current[types.findIndex(e => e === type)];
    if (ref) {
      scrollIntoView(ref, {
        behavior: 'smooth',
        scrollMode: 'if-needed',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [type, types]);

  return (
    <div className='icon-container'>
      {[...types].reverse().map((e, i) => (
        <svg
          key={e}
          viewBox='-178 -105 600 600'
          className={`icon ${e}`}
          ref={el => (refArr.current[types.length - 1 - i] = el)}
        >
          <use href={`#icon-${e}`} />
          <rect
            x='-60'
            y='-60'
            width='350'
            height='350'
            fill='none'
            strokeWidth='15'
            stroke='#fff'
          />
        </svg>
      ))}
    </div>
  );
};

export default TypePickerIconContainer;

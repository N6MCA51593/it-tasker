import { selectAllCollectionItems } from 'app/selectors';
import useOnClickOutside from 'common/useOnClickOutside';
import { importFromCollectionHelper } from 'features/tasker/single-page-item/device-list/importFromCollectionHelper';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CollectionImport = () => {
  const [isShowing, setIsShowing] = useState(false);
  const collections = useSelector(selectAllCollectionItems);
  const dispatch = useDispatch();
  const ref = useRef();
  useOnClickOutside(ref, () => setIsShowing(false));

  const importDevices = id => {
    dispatch(importFromCollectionHelper(id));
    setIsShowing(false);
  };

  return (
    <div>
      <div className='collection-import' ref={ref}>
        <span onClick={() => setIsShowing(!isShowing)}>
          Import from collection...
        </span>
        {isShowing && (
          <div className='confirmation-popup r'>
            {collections.map(item => (
              <div
                className='collection-item'
                key={item.id}
                onClick={() => importDevices(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionImport;

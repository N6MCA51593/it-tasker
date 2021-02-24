import { selectAllCollectionItems } from 'app/selectors';
import { importFromCollectionHelper } from 'features/tasker/single-page-item/device-list/importFromCollectionHelper';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CollectionImport = () => {
  const [isShowing, setIsShowing] = useState(false);
  const collections = useSelector(selectAllCollectionItems);
  const dispatch = useDispatch();

  const importDevices = id => {
    dispatch(importFromCollectionHelper(id));
    setIsShowing(false);
  };

  return (
    <div>
      <button onClick={() => setIsShowing(!isShowing)}>Import</button>
      {isShowing && (
        <div>
          {collections.map(item => (
            <div key={item.id} onClick={() => importDevices(item.id)}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionImport;

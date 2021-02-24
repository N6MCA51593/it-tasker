import React, { memo, useRef } from 'react';
import { selectTaskerItemById, selectDevicesById } from 'app/selectors';
import { useSelector } from 'react-redux';
import FloorRow from 'features/tasker/single-page-item/device-list/FloorRow';
import CollectionImport from 'features/tasker/single-page-item/device-list/CollectionImport';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

const DeviceList = ({ id, isEditing, scrollToBtn }) => {
  const ref = useRef();
  const { devices, floors } = useSelector(state =>
    selectTaskerItemById(state, id)
  );
  const floorsDeduped = [...new Set(floors)];

  const deviceItems = useSelector(state => selectDevicesById(state, devices));

  const scroll = () => {
    scrollIntoView(ref.current, {
      scrollMode: 'if-needed',
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div ref={ref}>
      {scrollToBtn(() => scroll())}
      {isEditing && <CollectionImport />}
      {floorsDeduped.map(id => (
        <FloorRow
          key={id}
          id={id}
          items={deviceItems.filter(device => device.floor === id)}
        />
      ))}
    </div>
  );
};

export default memo(DeviceList);

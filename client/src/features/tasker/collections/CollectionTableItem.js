import React from 'react';
import { selectTaskerItemById } from 'app/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveItem } from 'features/tasker/taskerSlice';

const CollectionTableItem = ({ id }) => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => selectTaskerItemById(state, id));
  return (
    <div
      className='collection-table-item'
      onClick={() => dispatch(setActiveItem(id))}
    >
      {name}
    </div>
  );
};

export default CollectionTableItem;

import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllCollections,
  selectTaskerActiveItemProperties
} from 'app/selectors';
import { addItem } from 'features/tasker/taskerSlice';
import CollectionSinglePage from 'features/tasker/collections/CollectionSinglePage';
import TaskerListItem from 'features/tasker/TaskerListItem';

const Collections = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectAllCollections);
  const { activeItem, isEditing } = useSelector(
    selectTaskerActiveItemProperties
  );

  if (activeItem) {
    return <CollectionSinglePage id={activeItem} isEditing={isEditing} />;
  }

  return (
    <Fragment>
      {ids.map(id => (
        <TaskerListItem key={id} id={id} />
      ))}
      <button onClick={() => dispatch(addItem({ type: 'collection' }))}>
        Add
      </button>
    </Fragment>
  );
};

export default Collections;

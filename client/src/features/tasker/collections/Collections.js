import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllCollections,
  selectTaskerActiveAndEditing
} from 'app/selectors';
import { addItem } from 'features/tasker/taskerSlice';
import CollectionTableItem from 'features/tasker/collections/CollectionTableItem';
import CollectionSinglePage from 'features/tasker/collections/CollectionSinglePage';

const Collections = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectAllCollections);
  const { activeItem, isEditing } = useSelector(selectTaskerActiveAndEditing);

  if (activeItem) {
    return <CollectionSinglePage id={activeItem} isEditing={isEditing} />;
  }

  return (
    <Fragment>
      {ids.map(id => (
        <CollectionTableItem key={id} id={id} />
      ))}
      <button onClick={() => dispatch(addItem({ type: 'collection' }))}>
        Add
      </button>
    </Fragment>
  );
};

export default Collections;

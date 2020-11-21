import React from 'react';
import useInput from 'common/useInput';
import { selectTaskerItemById } from 'app/selectors';
import { useSelector, useDispatch } from 'react-redux';
import {
  cancelChanges,
  toggleActiveItem,
  toggleEditing
} from 'features/tasker/taskerSlice';
import { updateTaskerItem } from 'features/api/updateTaskerItem';
import DeviceList from 'features/tasker/DeviceList';
import EditingControls from 'features/tasker/EditingControls';

const CollectionSinglePage = ({ id, isEditing }) => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => selectTaskerItemById(state, id));
  const { value: nameState, bind: bindName } = useInput(name);

  if (isEditing) {
    const save = () => {
      dispatch(updateTaskerItem({ name: nameState }));
    };
    const cancel = () => {
      dispatch(cancelChanges());
    };
    return (
      <div className='collection-single-page'>
        <label>
          Name:
          <input {...bindName} />
        </label>
        <DeviceList id={id} />
        <EditingControls save={save} cancel={cancel} />
      </div>
    );
  }

  return (
    <div className='collection-single-page'>
      {name}
      <DeviceList id={id} />
      <button onClick={() => dispatch(toggleEditing())}>Edit</button>
      <button onClick={() => dispatch(toggleActiveItem())}>Back</button>
    </div>
  );
};

export default CollectionSinglePage;

import React from 'react';
import useInput from 'common/useInput';
import { selectTaskerItemById } from 'app/selectors';
import { useSelector, useDispatch } from 'react-redux';
import {
  cancelChanges,
  toggleActiveItem,
  toggleEditing,
  toggleDevice,
  toggleDeviceCheckOff
} from 'features/tasker/taskerSlice';
import { updateTaskerItem } from 'features/api/updateTaskerItem';
import DeviceList from 'features/tasker/DeviceList';
import EditingControls from 'features/tasker/EditingControls';

const TaskSinglePage = ({ id, isEditing }) => {
  const dispatch = useDispatch();
  const { name, description } = useSelector(state =>
    selectTaskerItemById(state, id)
  );
  const { value: nameState, bind: bindName } = useInput(name);
  const { value: descriptionState, bind: bindDescription } = useInput(
    description
  );

  if (isEditing) {
    const save = () => {
      dispatch(
        updateTaskerItem({ name: nameState, description: descriptionState })
      );
    };
    const cancel = () => {
      dispatch(cancelChanges());
    };
    const clickHandler = (id, floor) => {
      dispatch(toggleDevice({ id, floor }));
    };
    return (
      <div className='collection-single-page'>
        <label>
          Name:
          <input {...bindName} />
        </label>
        <label>
          Description:
          <input {...bindDescription} />
        </label>
        <DeviceList id={id} clickHandler={clickHandler} />
        <EditingControls save={save} cancel={cancel} />
      </div>
    );
  }

  const clickHandler = id => {
    dispatch(toggleDeviceCheckOff(id));
  };

  return (
    <div className='collection-single-page'>
      {name}
      {description}
      <DeviceList id={id} clickHandler={clickHandler} />
      <button onClick={() => dispatch(toggleEditing())}>Edit</button>
      <button onClick={() => dispatch(toggleActiveItem())}>Back</button>
    </div>
  );
};

export default TaskSinglePage;

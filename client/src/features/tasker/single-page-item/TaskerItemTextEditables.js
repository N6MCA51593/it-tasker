import React from 'react';
import useInput from 'common/useInput';
import {
  selectTaskerActiveItemProperties,
  selectTaskerItemById
} from 'app/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { cancelChanges } from 'features/tasker/taskerSlice';
import { updateTaskerItem } from 'features/api/updateTaskerItem';
import EditingControls from 'features/tasker/controls/EditingControls';

const TaskerItemTextEditables = ({ id }) => {
  const dispatch = useDispatch();
  const { isEditing } = useSelector(selectTaskerActiveItemProperties);

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

    return (
      <div>
        <label>
          Name:
          <input {...bindName} />
        </label>
        <label>
          Description:
          <input {...bindDescription} />
        </label>
        <EditingControls save={save} cancel={cancel} />
      </div>
    );
  } else {
    return (
      <div>
        <h2>{name}</h2>
        <div>{description}</div>
      </div>
    );
  }
};

export default TaskerItemTextEditables;

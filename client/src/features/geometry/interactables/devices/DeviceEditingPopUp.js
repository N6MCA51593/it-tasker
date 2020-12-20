import React, { useState } from 'react';
import useInput from 'common/useInput';
import { useDispatch } from 'react-redux';
import {
  updateActiveDevice,
  setActiveDevice
} from 'features/geometry/interactables/devices/deviceSlice';
import TypePicker from 'features/geometry/interactables/devices/TypePicker';

const DeviceEditingPopUp = ({ device }) => {
  const dispatch = useDispatch();
  const { name, type, description, status } = device;
  const { value: nameState, bind: bindName } = useInput(name);
  const { value: statusState, bind: bindStatus } = useInput(status);
  const { value: descriptionState, bind: bindDescription } = useInput(
    description
  );
  const [typeState, setTypeState] = useState(type);

  const save = () => {
    dispatch(
      updateActiveDevice({
        name: nameState,
        status: statusState,
        description: descriptionState,
        type: typeState
      })
    );
  };

  const cancel = () => {
    dispatch(setActiveDevice());
  };

  return (
    <div className='options'>
      <label>
        Name:
        <input {...bindName} />
      </label>
      <label>
        Description:
        <textarea {...bindDescription} />
      </label>
      <label>
        Status:
        <select {...bindStatus}>
          <option value='ok'>Ok</option>
          <option value='warning'>Warning</option>
          <option value='failure'>Failure</option>
        </select>
      </label>
      <TypePicker type={typeState} setType={setTypeState} />
      <button onClick={() => save()}>Save</button>
      <button onClick={() => cancel()}>Cancel</button>
    </div>
  );
};

export default DeviceEditingPopUp;

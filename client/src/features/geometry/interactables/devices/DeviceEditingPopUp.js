import React, { useLayoutEffect, useRef, useState } from 'react';
import useInput from 'common/useInput';
import { useDispatch } from 'react-redux';
import {
  updateActiveDevice,
  setActiveDevice
} from 'features/geometry/interactables/devices/deviceSlice';
import TypePicker from 'features/geometry/interactables/devices/TypePicker';

const DeviceEditingPopUp = ({ device }) => {
  const dispatch = useDispatch();
  const { name, type, description, id } = device;
  const ref = useRef();
  const { value: nameState, bind: bindName, setValue: setNameValue } = useInput(
    name
  );
  const {
    value: descriptionState,
    bind: bindDescription,
    setValue: setDescriptionValue
  } = useInput(description);
  const [typeState, setTypeState] = useState(type);

  useLayoutEffect(() => {
    if (id && !ref.current) {
      ref.current = id;
    } else if (id !== ref.current) {
      setDescriptionValue(description);
      setNameValue(name);
      setTypeState(type);
      ref.current = id;
    }
  }, [id, description, name, type, setDescriptionValue, setNameValue]);

  const save = () => {
    dispatch(
      updateActiveDevice({
        name: nameState,
        description: descriptionState,
        type: typeState
      })
    );
  };

  const cancel = () => {
    dispatch(setActiveDevice());
  };

  return (
    <div className='container'>
      <TypePicker type={typeState} setType={setTypeState} />
      <label>
        Name:
        <input {...bindName} />
      </label>
      <label>
        Description:
        <textarea {...bindDescription} />
      </label>
      <button onClick={() => save()}>Save</button>
      <button onClick={() => cancel()}>Cancel</button>
    </div>
  );
};

export default DeviceEditingPopUp;

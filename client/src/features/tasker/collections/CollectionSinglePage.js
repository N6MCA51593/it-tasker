import React from 'react';
import useInput from 'common/useInput';
import { selectTaskerItemById } from 'app/selectors';
import { useSelector, useDispatch } from 'react-redux';
import DeviceList from 'features/tasker/DeviceList';

const CollectionSinglePage = ({ id, isEditing }) => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => selectTaskerItemById(state, id));
  const { value: nameState, bind: bindName } = useInput(name);

  if (isEditing) {
    return (
      <div className='collection-single-page'>
        <label>
          Name:
          <input {...bindName} />
        </label>
        <DeviceList id={id} />
      </div>
    );
  }

  return <div className='collection-single-page'>{name}</div>;
};

export default CollectionSinglePage;

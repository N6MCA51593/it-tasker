import React from 'react';
import useInput from 'common/useInput';
import { selectTaskerItemById } from 'app/selectors';
import { useSelector } from 'react-redux';
import DeviceList from 'features/tasker/DeviceList';

const CollectionSinglePage = ({ id, isEditing }) => {
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

import React from 'react';
import useInput from 'common/useInput';
import { selectTaskerItemById } from 'app/selectors';
import { useSelector, useDispatch } from 'react-redux';

const CollectionSinglePage = ({ id, isEditing }) => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectTaskerItemById);
  const { value: nameState, bind: bindName } = useInput(name);
  return <div></div>;
};

export default CollectionSinglePage;

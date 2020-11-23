import { selectTaskerActiveAndEditing } from 'app/selectors';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const useAreaTaskerState = id => {
  //const dispatch = useDispatch();
  const { activeItem, isEditing } = useSelector(
    selectTaskerActiveAndEditing,
    shallowEqual
  );
  const children = useSelector(
    state =>
      state.devices.ids.filter(
        deviceId => state.devices.entities[deviceId].area === id
      ),
    shallowEqual
  );
  console.log(children);
  return {};
};

export default useAreaTaskerState;

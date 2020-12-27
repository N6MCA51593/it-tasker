import {
  selectActiveFloor,
  selectPersistingUiStateValues
} from 'app/selectors';
import { loadFromLocalStorage } from 'app/uiStateSlice';
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const usePersistingUiState = geoUi => {
  const [hasRead, setHasRead] = useState(false);
  const values = useSelector(selectPersistingUiStateValues, shallowEqual);
  const activeFloor = useSelector(selectActiveFloor);
  const activeTaskerItemType = useSelector(
    state => state.tasker.activeItemType
  );
  const userId = useSelector(state => state.authState.id);
  const dispatch = useDispatch();

  const saveToLocalStorage = useCallback(() => {
    const valuesWithGeo = {
      ...values,
      ...geoUi,
      activeFloor,
      activeTaskerItemType
    };
    localStorage.setItem(userId, JSON.stringify(valuesWithGeo));
  }, [values, geoUi, activeFloor, activeTaskerItemType, userId]);

  const readFromLocalStorage = useCallback(() => {
    const uiState = JSON.parse(localStorage.getItem(userId));
    dispatch(loadFromLocalStorage(uiState));
  }, [dispatch, userId]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => saveToLocalStorage());
    if (!hasRead) {
      readFromLocalStorage();
      setHasRead(true);
    }
    return () => {
      window.removeEventListener('beforeunload', () => saveToLocalStorage());
    };
  }, [saveToLocalStorage, readFromLocalStorage, hasRead]);
};

export default usePersistingUiState;

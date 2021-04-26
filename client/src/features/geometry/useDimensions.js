import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import debounce from 'debounce';
import { useSelector } from 'react-redux';
import { selectActiveGlobalUiState } from 'app/selectors';
import {
  EDIT_GEOM_GLOB,
  EDIT_INTERACTABLES_GLOB,
  MAIN_GLOB
} from 'app/constants';

const useDimensions = ref => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const activeGlobalUiState = useSelector(selectActiveGlobalUiState);
  const uiStateRef = useRef(MAIN_GLOB);

  const shouldUpdate = useCallback((oldState, newState) => {
    const noTasker = {
      [EDIT_INTERACTABLES_GLOB]: true,
      [EDIT_GEOM_GLOB]: true
    };
    if (
      (noTasker[newState] && !noTasker[oldState]) ||
      (!noTasker[newState] && noTasker[oldState])
    ) {
      return true;
    }
  }, []);

  const updateDimensions = debounce(() => {
    if (ref.current) {
      setDimensions(ref.current.getBoundingClientRect());
    }
  }, 50);

  useEffect(() => {
    if (ref.current && !isLoaded) {
      setIsLoaded(true);
      setDimensions(ref.current.getBoundingClientRect());
    }
  }, [ref, isLoaded]);

  useLayoutEffect(() => {
    if (shouldUpdate(uiStateRef.current, activeGlobalUiState)) {
      if (ref.current) {
        setDimensions(ref.current.getBoundingClientRect());
      }

      uiStateRef.current = activeGlobalUiState;
    }
  }, [activeGlobalUiState, uiStateRef, updateDimensions, shouldUpdate, ref]);

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions]);

  return { width: dimensions.width, height: dimensions.height };
};

export default useDimensions;

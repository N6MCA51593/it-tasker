import { useEffect, useState } from 'react';
import debounce from 'debounce';

const useDimensions = ref => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const updateDimensions = debounce(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, 50);

  useEffect(() => {
    if (ref.current && !isLoaded) {
      setIsLoaded(true);
      setDimensions(ref.current.getBoundingClientRect());
    }
  }, [ref, isLoaded]);

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions]);

  return { width: dimensions.width, height: dimensions.height };
};

export default useDimensions;

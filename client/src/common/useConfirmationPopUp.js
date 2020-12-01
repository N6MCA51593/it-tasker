import { useState } from 'react';

const useConfirmationPopUp = () => {
  const [isShowing, setIsShowing] = useState(false);

  const togglePopUp = () => setIsShowing(!isShowing);

  return { isShowing, togglePopUp };
};

export default useConfirmationPopUp;

import React, { Fragment, useState } from 'react';

const ConfirmationPopupComponent = props => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <Fragment>
      {props.render(() => setIsShowing(!isShowing))}
      {isShowing && props.children}
    </Fragment>
  );
};

export default ConfirmationPopupComponent;

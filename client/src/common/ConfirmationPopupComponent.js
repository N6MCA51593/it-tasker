import clTern from 'common/clTern';
import React, { Fragment, useState } from 'react';

const ConfirmationPopupComponent = props => {
  const [isShowing, setIsShowing] = useState(false);
  const { opener, pos, title, action, cancel } = props;

  return (
    <Fragment>
      {isShowing && (
        <div className={`confirmation-popup ${clTern(pos, pos)}`}>
          {title()}
          <div>
            {action()}
            {cancel(() => setIsShowing(!isShowing))}
          </div>
        </div>
      )}
      {opener(() => setIsShowing(!isShowing))}
    </Fragment>
  );
};

export default ConfirmationPopupComponent;

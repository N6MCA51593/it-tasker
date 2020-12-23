import React, { useState } from 'react';
import useInput from 'common/useInput';
import { useDispatch } from 'react-redux';
import { login } from 'features/api/login';
import { signup } from 'features/api/signup';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { value: userName, bind: bindUserName } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const dispatch = useDispatch();

  const handleClick = () => {
    if (userName.length > 0 && password.length > 0) {
      if (isLogin) {
        dispatch(login({ userName, password }));
      } else {
        dispatch(signup({ userName, password }));
      }
    }
  };

  return (
    <div className='landing'>
      <label>
        Username:
        <input {...bindUserName} />
      </label>
      <label>
        Password:
        <input {...bindPassword} />
      </label>
      <button onClick={() => handleClick()}>
        {isLogin ? 'Login' : 'Signup'}
      </button>
      <button onClick={() => setIsLogin(!isLogin)}>Switch</button>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import useInput from 'common/useInput';
import { useDispatch } from 'react-redux';
import { login } from 'features/api/login';
import { signup } from 'features/api/signup';

const FormContainer = () => {
  const { value: userName, bind: bindUserName } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const dispatch = useDispatch();

  const signIn = e => {
    e.preventDefault();
    if (userName.length > 0 && password.length > 0) {
      dispatch(login({ userName, password }));
    }
  };

  const signUp = e => {
    e.preventDefault();
    if (userName.length > 0 && password.length > 0) {
      dispatch(signup({ userName, password }));
    }
  };

  return (
    <div className='form-container'>
      <h1>Welcome!</h1>
      <h3>
        Please enter credentials to sign up or sign in to an existing account
      </h3>
      <form onSubmit={e => signIn(e)} id='cred-form'>
        <label>
          Username:
          <input
            name='username'
            type='text'
            autoComplete='username'
            pattern='^[a-z0-9A-Z*.!@$%^&(){}\[\]:;<>,.?\/~_+-=|\\]{3,16}$'
            required
            {...bindUserName}
          />
        </label>
        <label>
          Password:
          <input
            name='password'
            type='password'
            pattern='^[a-z0-9A-Z*.!@$%^&(){}\[\]:;<>,.?\/~_+-=|\\]{3,16}$'
            autoComplete='on'
            required
            {...bindPassword}
          />
        </label>
        <button
          type='submit'
          form='cred-form'
          className='save-btn-device-popup'
        >
          Sign In
        </button>
        <button onClick={e => signUp(e)}>Sign Up</button>
      </form>
    </div>
  );
};

export default FormContainer;

import { resetState } from 'features/auth/authStateSlice';
import { addNotification } from 'features/notifications/notificationSlice';
import { ERROR_NT } from 'app/constants';

const getMessage = async response => {
  try {
    const body = await response.json();
    return body.msg;
  } catch (error) {
    return 'Server Error';
  }
};

export default async function handleResponseErrors(
  response,
  isPrivate,
  dispatch
) {
  if (response.status >= 400 && response.status < 600) {
    const message = await getMessage(response);
    if (response.status === 401 && isPrivate) {
      dispatch(addNotification({ type: ERROR_NT, message }));
      dispatch(resetState());
      throw new Error('Auth error');
    } else {
      dispatch(addNotification({ type: ERROR_NT, message }));
      throw new Error('Server error');
    }
  }
}

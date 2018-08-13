import {apiUrl} from '~/config';
import Base64 from 'Base64';
export const login = (user, password) => {
  return async dispatch => {
    function success(success) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: success
      });
      return success;
    }
    function fail(error) {
      dispatch({
        type: 'LOGIN_FAIL',
        error
      });
      return error;
    }
    const code = Base64.btoa(`${user}:${password}`);
    const config = {
      method: 'get',
      headers: {
        Authorization: `Basic ${code}`
      }
    };
    if (__DEV__) console.log("users.js - config", config);
    try {
      const url = `${apiUrl}/auth/authenticate`;
      //const url = `${apiUrl}`;
      const res = await fetch(url, config);
      //const res = await fetch(url);
      if (__DEV__) console.log('res', res);
      if (res.status === 401) {
        return fail({ token: res.status });
      }
      const repo = await res.json();
      console.log('repo.result', repo.result);
      return success(repo.result);
    } catch (e) {
      console.log('e fail', { token: 401 , error: e});
      return fail({ token: 401, error: e});
    }
  };
};

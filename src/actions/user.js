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
    console.log(config);
    try {
      const url = `${apiUrl}/auth/authenticate`;
      const res = await fetch(url, config);
      const repo = await res.json();
      if (repo.status === 401) {
        return fail(repo);
      }
      return success(repo.result);
    } catch (e) {
      return fail(e);
    }
  };
};

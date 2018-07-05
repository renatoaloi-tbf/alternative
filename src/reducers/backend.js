import {cloneDeep} from 'lodash';
// Backend

const INITIAL_STATE = {
  valor: ''
};

const getBackend = (state, {payload}) => {
  const newState = cloneDeep(state);
  
  newState.valor = JSON.stringify(payload);
  
  console.log("backend.js - payload", payload);
  console.log("backend.js - getBackend", newState);
  return newState;
};

export const backend = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return getBackend(state, action);
    default:
      console.log("backend.js - default", state);
      return state;
  }
};

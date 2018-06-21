import {cloneDeep} from 'lodash';

const INITIAL_STATE = {
  email: '',
  name: '',
  city: '',
  cpf_cnpj: '',
  farm: '',
  token: '',
  isLogin: false
};

const getLogin = (state, {payload}) => {
  const newState = cloneDeep(state);
  const {token} = payload;
  const {
    mail,
    name,

    properties: {city, cpf_cnpj}
  } = payload.data[0];
  newState.email = mail;
  newState.name = name;
  newState.city = city;
  newState.token = token;
  newState.cpf_cnpj = cpf_cnpj;
  newState.isLogin = true;
  return newState;
};

export const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return getLogin(state, action);
    default:
      return state;
  }
};

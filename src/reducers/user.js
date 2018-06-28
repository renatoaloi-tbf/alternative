import {cloneDeep} from 'lodash';

const INITIAL_STATE = {
  id: '',
  email: '',
  name: '',
  city: '',
  cpf_cnpj: '',
  farm: '',
  token: '',
  isLogin: false,
  recent: {}
};

const getLogin = (state, {payload}) => {
  const newState = cloneDeep(state);
  const {token} = payload;
  const {
    _id,
    mail,
    name,
    recent,
    properties: {city, cpf_cnpj}
  } = payload.data[0];
  newState.id = _id;
  newState.email = mail;
  newState.recent = recent;
  newState.name = name;
  newState.city = city;
  newState.token = token;
  newState.cpf_cnpj = cpf_cnpj;
  newState.isLogin = true;
  console.log(newState);
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

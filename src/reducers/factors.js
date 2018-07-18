import {padZero} from '~/utils';
import {forEach, cloneDeep} from 'lodash';
// Statements

const INITIAL_STATE = {
  items: [],
};

const Months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const getFactors = (state, {payload}) => {
  const newState = cloneDeep(state);

  const {milkPriceFactors} = payload.data[0];
  //console.log('milkPriceFactors', milkPriceFactors);
  milkPriceFactors.forEach(item => {
    //console.log('item', item);
    newState.items.push(item);
  });
  if (__DEV__) console.log("factors.js - getFactors", newState);
  return newState;
};

export const factors = (state = INITIAL_STATE, action) => {
  //if (__DEV__) console.log("factors.js - default", state);
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return getFactors(state, action);
    default:
      return state;
  }
};

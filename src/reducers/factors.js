import {padZero} from '~/utils';
import {forEach, cloneDeep} from 'lodash';
// Statements

const INITIAL_STATE = {
  allMonths: [],
  byMonth: {},
  byMonthExt: {},
};

const Months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const getFactors = (state, {payload}) => {
  const newState = cloneDeep(state);

  const {milkPriceFactors} = payload.data[0];
  forEach(milkPriceFactors, item => {
    if (item.month > 0)
    {
      const dateExt = `${Months[item.month-1]} ${item.year}`;
      const date = `${padZero(2, item.month)}/${item.year}`;
      if (newState.allMonths.indexOf(date)) {
        newState.allMonths.push(date);
        newState.byMonth[date] = item;
        newState.byMonthExt[date] = dateExt;
      }
    }
  });
  if (__DEV__) console.log("factors.js - getFactors", newState);
  return newState;
};

export const factors = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return getFactors(state, action);
    default:
      return state;
  }
};

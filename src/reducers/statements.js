import {padZero} from '~/utils';
import {forEach, cloneDeep} from 'lodash';
// Statements

const INITIAL_STATE = {
  allMonths: [],
  byMonth: {},
  byMonthExt: {},
};

const Months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const getStatements = (state, {payload}) => {
  const newState = cloneDeep(state);

  const {milkStatements} = payload.data[0];
  forEach(milkStatements, item => {
    const dateExt = `${Months[item.month-1]} ${item.year}`;
    const date = `${padZero(2, item.month)}/${item.year}`;
    if (newState.allMonths.indexOf(date)) {
      newState.allMonths.push(date);
      newState.byMonth[date] = item;
      newState.byMonthExt[date] = dateExt;
    }
  });
  console.log("statements.js - getStatements", newState);
  return newState;
};

export const statements = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return getStatements(state, action);
    default:
      return state;
  }
};

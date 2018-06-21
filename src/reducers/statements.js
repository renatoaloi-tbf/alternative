import {padZero} from '~/utils';
import {forEach, cloneDeep} from 'lodash';
// Statements

const INITIAL_STATE = {
  allMonths: [],
  byMonth: {}
};

const getStatements = (state, {payload}) => {
  const newState = cloneDeep(state);

  const {milkStatements} = payload.data[0];
  forEach(milkStatements, item => {
    debugger;
    const date = `${padZero(2, item.month)}/${item.year}`;
    if (newState.allMonths.indexOf(date)) {
      newState.allMonths.push(date);
      newState.byMonth[date] = item;
    }
  });
  console.log(newState);
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

import {cloneDeep, forEach} from 'lodash';
const INITIAL_STATE = {
  byYear: {}
};

const getPrice = (state, {payload}) => {
  const newState = cloneDeep(state);
  const {milkPrice} = payload.data[0];
  newState.items = milkPrice;
  forEach(milkPrice, item => {
    if (!newState.byYear[item.year]) {
      newState.byYear[item.year] = [];
    } else {
      newState.byYear[item.year].push(item);
    }
  });
  return newState;
};

export const price = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return getPrice(state, action);
    default:
      return state;
  }
};

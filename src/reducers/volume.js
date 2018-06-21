import {forEach, cloneDeep} from 'lodash';
import moment from 'moment';
const INITIAL_STATE = {
  allIds: [],
  all: []
};

const getVolume = (state, {payload}) => {
  const newState = cloneDeep(state);
  const {milkVolume} = payload.data[0];
  console.log(milkVolume);
  forEach(milkVolume, item => {
    if (newState.allIds.indexOf(item._id) === -1) {
      newState.allIds.push(item._id);
      item.searchDate = moment(item.start_date);
      newState.all.push(item);
    }
  });
  console.log(newState);
  return newState;
};

export const volume = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return getVolume(state, action);
    default:
      return state;
  }
};

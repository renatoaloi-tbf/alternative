import {forEach, cloneDeep, reduce} from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
  allIds: [],
  groupByMonth: {},
  groupByYear: {}
};

const getQuality = (state, {payload}) => {
  const newState = cloneDeep(state);
  const {milkQuality} = payload.data[0];
  console.log("milkQuality payload.data[0]", payload.data[0]);
  forEach(milkQuality, item => {
    if (newState.allIds.indexOf(item._id) === -1) {
      const ranger = moment(item.period, 'DD/MM/YY').format('MM/YYYY');
      if (newState.groupByMonth[ranger]) {
        newState.groupByMonth[ranger] = [
          ...newState.groupByMonth[ranger],
          item
        ];
      } else {
        newState.groupByMonth[ranger] = [item];
      }
      newState.allIds.push(item._id);
    }
  });

  const keys = Object.keys(newState.groupByMonth);
  forEach(keys, item => {
    newState.groupByYear[item] = reduce(
      newState.groupByMonth[item],
      (prev, next) => {
        const ccs = (prev.ccs ? prev.ccs : 0) + (next.css ? next.css : 0),
          esd = (prev.esd ? prev.esd : 0) + (next.esd ? next.esd : 0),
          est = (prev.est ? prev.est : 0) + (next.est ? next.est : 0),
          fat = (prev.fat ? prev.fat : 0) + (next.fat ? next.fat : 0),
          lact = (prev.lact ? prev.lact : 0) + (next.lact ? next.lact : 0),
          prot = (prev.prot ? prev.prot : 0) + (next.prot ? next.prot : 0),
          ufc = (prev.ufc ? prev.ufc : 0) + (next.ufc ? next.ufc : 0),
          cbt = (prev.cbt ? prev.cbt : 0) + (next.cbt ? next.cbt : 0);
        return {
          ccs,
          esd,
          est,
          fat,
          lact,
          prot,
          ufc,
          cbt
        };
      }
    );
  });
  console.log('getQuality', newState);
  return newState;
};

export const quality = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return getQuality(state, action);
    default:
      return state;
  }
};

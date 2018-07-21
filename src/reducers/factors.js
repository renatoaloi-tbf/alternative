import {padZero} from '~/utils';
import {forEach, cloneDeep} from 'lodash';
import moment from 'moment';
// Statements

const INITIAL_STATE = {
  items: [],
  infos: {
    basePrice: 0,
    marketBonus: 0,
    period: moment().format('M/YYYY')
  }
};

const Months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const getFactors = (state, {payload}) => {
  const newState = cloneDeep(state);

  const {milkPriceFactors} = payload.data[0];
  console.log('milkPriceFactors', milkPriceFactors);
  newState.infos.basePrice = milkPriceFactors.basePrice;
  newState.infos.period = milkPriceFactors.period;
  newState.infos.marketBonus = milkPriceFactors.marketBonus;
  let arrayCbt = [], arrayCcs = [], arrayFat = [], arrayProt = [], arrayVolume = [];
  milkPriceFactors.cbt.forEach(item => {
    arrayCbt.push(item)
  });
  milkPriceFactors.fat.forEach(item => {
    arrayFat.push(item)
  });
  milkPriceFactors.ccs.forEach(item => {
    arrayCcs.push(item)
  });
  milkPriceFactors.prot.forEach(item => {
    arrayProt.push(item)
  });
  milkPriceFactors.volume.forEach(item => {
    arrayVolume.push(item)
  });

  var merge = arrayCbt.concat(arrayFat).concat(arrayCcs).concat(arrayProt).concat(arrayVolume);
  newState.items.push(merge);
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

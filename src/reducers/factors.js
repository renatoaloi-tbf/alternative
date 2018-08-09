import {padZero} from '~/utils';
import {forEach, cloneDeep} from 'lodash';
import moment from 'moment';
// Statements

const INITIAL_STATE = {
  items: [],
  infos: {
    basePrice: 0,
    marketBonus: 0,
    period: moment().format('M/YYYY'),
    tendency: ''
  }
};

const Months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const getFactors = (state, {payload}) => {
  const newState = cloneDeep(state);

  const {milkPriceFactors} = payload.data[0];
  newState.infos.basePrice = milkPriceFactors.basePrice;
  newState.infos.period = milkPriceFactors.period;
  newState.infos.marketBonus = milkPriceFactors.marketBonus;
  newState.infos.tendency = milkPriceFactors.tendency;
  let arrayCbt = [], arrayCcs = [], arrayBpf = [], arrayPncebt = [], arrayFat = [], arrayProt = [], arrayVolume = [], arrayKm = [];


  if (milkPriceFactors) {
    if (milkPriceFactors.cbt) {
      milkPriceFactors.cbt.values.forEach(item => {
        arrayCbt.push({ ...item, type: milkPriceFactors.cbt.type })
      });
    }
    if (milkPriceFactors.ccs) {
      milkPriceFactors.ccs.values.forEach(item => {
        arrayCcs.push({ ...item, type: milkPriceFactors.ccs.type })
      });
    }
    if (milkPriceFactors.bpf) {
      milkPriceFactors.bpf.values.forEach(item => {
        arrayBpf.push({ ...item, type: milkPriceFactors.bpf.type })
      });
    }
    if (milkPriceFactors.pncebt) {
      milkPriceFactors.pncebt.values.forEach(item => {
        arrayPncebt.push({ ...item, type: milkPriceFactors.pncebt.type })
      });
    }
    if (milkPriceFactors.fat) {
      milkPriceFactors.fat.values.forEach(item => {
        arrayFat.push({ ...item, type: milkPriceFactors.fat.type })
      });
    }
    if (milkPriceFactors.prot) {
      milkPriceFactors.prot.values.forEach(item => {
        arrayProt.push({ ...item, type: milkPriceFactors.prot.type })
      });
    }
    if (milkPriceFactors.volume) {
      milkPriceFactors.volume.values.forEach(item => {
        arrayVolume.push({ ...item, type: milkPriceFactors.volume.type })
      });
    }
    if (milkPriceFactors.km) {
      milkPriceFactors.km.values.forEach(item => {
        arrayKm.push({ ...item, type: milkPriceFactors.km.type })
      });
    }


    var merge = arrayCbt.concat(arrayCcs).concat(arrayBpf).concat(arrayPncebt)
                        .concat(arrayFat).concat(arrayProt).concat(arrayVolume).concat(arrayKm);
    newState.items.push(merge);
  }
  
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

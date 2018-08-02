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
  console.log('MILK QUALITY GERAL', milkQuality);
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
  console.log('TEEEEEEEESTE', newState.groupByYear);
  const keys = Object.keys(newState.groupByMonth);
  var contaFatMedia = [], contaCcsMedia = [], contaCbtMedia = [], contaEsdMedia = [], contaEstMedia = [], contaLactMedia = [], contaProtMedia = [];
  
  keys.forEach(function(item) {
    var countFat = 0, countCcs = 0, countCbt = 0, countEsd = 0, countEst = 0, countLact = 0, countProt = 0;  
    contaCbtMedia[item] = 0;
    contaCcsMedia[item] = 0;
    contaEsdMedia[item] = 0;
    contaEstMedia[item] = 0;
    contaFatMedia[item] = 0;
    contaLactMedia[item] = 0;
    contaProtMedia[item] = 0;

    newState.groupByMonth[item].forEach(function(item2) {
      
      countCbt = countCbt + (item2.cbt ? item2.cbt : 0);
      if (item2.cbt) contaCbtMedia[item] = contaCbtMedia[item] + 1;
      countCcs = countCcs + (item2.ccs ? item2.ccs : 0);
      if (item2.ccs) contaCcsMedia[item] = contaCcsMedia[item] + 1;
      countEsd = countEsd + (item2.esd ? item2.esd : 0);
      if (item2.esd) contaEsdMedia[item] = contaEsdMedia[item] + 1;
      countEst = countEst + (item2.est ? item2.est : 0);
      if (item2.est) contaEstMedia[item] = contaEstMedia[item] + 1;
      countFat = countFat + (item2.fat ? item2.fat : 0);
      if (item2.fat) contaFatMedia[item] = contaFatMedia[item] + 1;
      countLact = countLact + (item2.lact ? item2.lact : 0);
      if (item2.lact) contaLactMedia[item] = contaLactMedia[item] + 1;
      countProt = countProt + (item2.prot ? item2.prot : 0);
      if (item2.prot) contaProtMedia[item] = contaProtMedia[item] + 1;
      
      newState.groupByYear[item] = {
        'cbt': countCbt,
        'ccs': countCcs,
        'esd': countEsd,
        'est': countEst,
        'fat': countFat,
        'lact': countLact,
        'prot': countProt,
        'ufc': 0,
        'code': item2.code
      }
      
    });
    
    if (newState.groupByYear[item].cbt) newState.groupByYear[item].cbt = newState.groupByYear[item].cbt / contaCbtMedia[item];
    if (newState.groupByYear[item].ccs) newState.groupByYear[item].ccs = newState.groupByYear[item].ccs / contaCcsMedia[item];
    if (newState.groupByYear[item].esd) newState.groupByYear[item].esd = newState.groupByYear[item].esd / contaEsdMedia[item];
    if (newState.groupByYear[item].est) newState.groupByYear[item].est = newState.groupByYear[item].est / contaEstMedia[item];
    if (newState.groupByYear[item].fat) newState.groupByYear[item].fat = newState.groupByYear[item].fat / contaFatMedia[item];
    if (newState.groupByYear[item].lact) newState.groupByYear[item].lact = newState.groupByYear[item].lact / contaLactMedia[item];
    if (newState.groupByYear[item].prot) newState.groupByYear[item].prot = newState.groupByYear[item].prot / contaProtMedia[item];
    //console.log('newState.groupByYear[item].cbt', newState.groupByYear[item].cbt / contaCbtMedia[item]);
    
  });
  console.log('GroupByYear', newState.groupByYear);
  /* console.log('countCbtMedia', contaCbtMedia);
  console.log('contaCcsMedia', contaCcsMedia);
  console.log('contaEsdMedia', contaEsdMedia);
  console.log('contaEstMedia', contaEstMedia);
  console.log('contaFatMedia', contaFatMedia);
  console.log('contaLactMedia', contaLactMedia);
  console.log('contaProtMedia', contaProtMedia); */

  /* forEach(keys, item => {
    newState.groupByYear[item] = reduce(
      newState.groupByMonth[item],
      (prev, next) => {

        const 
          ccs = ((prev.ccs ? prev.ccs : 0) + (next.ccs ? next.ccs : 0)) / 2.0,
          esd = ((prev.esd ? prev.esd : 0) + (next.esd ? next.esd : 0)) / 2.0,
          est = ((prev.est ? prev.est : 0) + (next.est ? next.est : 0)) / 2.0,
          fat = ((prev.fat ? prev.fat : 0) + (next.fat ? next.fat : 0)) / 2.0,
          lact = ((prev.lact ? prev.lact : 0) + (next.lact ? next.lact : 0)) / 2.0,
          prot = ((prev.prot ? prev.prot : 0) + (next.prot ? next.prot : 0)) / 2.0,
          ufc = ((prev.ufc ? prev.ufc : 0) + (next.ufc ? next.ufc : 0)) / 2.0,
          cbt = ((prev.cbt ? prev.cbt : 0) + (next.cbt ? next.cbt : 0)) / 2.0,
          
          code = prev.code;          
        return {
          ccs,
          esd,
          est,
          fat,
          lact,
          prot,
          ufc,
          cbt,
          code
        };
      }
    );
  }); */
  
  //console.log('contador', contador);
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

import { forEach, cloneDeep, reduce } from 'lodash';
import moment from 'moment';

const INITIAL_STATE = {
  allIds: [],
  groupByMonth: {},
  groupByYear: {},
  milkQualityStandards: {},
  milkQualityReport: []
};

const getQuality = (state, { payload }) => {
  const newState = cloneDeep(state);
  const { milkQuality, milkQualityStandards, milkQualityReport, user } = payload.data[0];
  newState.milkQualityStandards = milkQualityStandards;
  newState.milkQualityReport = milkQualityReport;
  console.log('MILK QUALITY GERAL', milkQuality);
  console.log('MILK QUALITY STANDARDS', milkQualityStandards);
  console.log('MILK QUALITY REPORT', milkQualityReport);
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
  var contaFatMedia = [], contaCcsMedia = [], contaCbtMedia = [], contaEsdMedia = [], contaEstMedia = [], contaLactMedia = [], contaProtMedia = [];

  keys.forEach(function (item) {
    var countFat = 0, countCcs = 0, countCbt = 0, countEsd = 0, countEst = 0, countLact = 0, countProt = 0;
    contaCbtMedia[item] = 0;
    contaCcsMedia[item] = 0;
    contaEsdMedia[item] = 0;
    contaEstMedia[item] = 0;
    contaFatMedia[item] = 0;
    contaLactMedia[item] = 0;
    contaProtMedia[item] = 0;

    newState.groupByMonth[item].forEach(function (item2) {

      //console.log('ITEM2 OBJETO', item2);
      //console.log('ITEM2 USER', user);
      if (user == item2.code) {
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
      }
    });

    if (newState.groupByYear[item].cbt) newState.groupByYear[item].cbt = newState.groupByYear[item].cbt / contaCbtMedia[item];
    if (newState.groupByYear[item].ccs) newState.groupByYear[item].ccs = newState.groupByYear[item].ccs / contaCcsMedia[item];
    if (newState.groupByYear[item].esd) newState.groupByYear[item].esd = newState.groupByYear[item].esd / contaEsdMedia[item];
    if (newState.groupByYear[item].est) newState.groupByYear[item].est = newState.groupByYear[item].est / contaEstMedia[item];
    if (newState.groupByYear[item].fat) newState.groupByYear[item].fat = newState.groupByYear[item].fat / contaFatMedia[item];
    if (newState.groupByYear[item].lact) newState.groupByYear[item].lact = newState.groupByYear[item].lact / contaLactMedia[item];
    if (newState.groupByYear[item].prot) newState.groupByYear[item].prot = newState.groupByYear[item].prot / contaProtMedia[item];

  });
  console.log('GroupByYear', newState.groupByYear);

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

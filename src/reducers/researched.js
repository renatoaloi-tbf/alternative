import { cloneDeep, forEach, map, filter, reduce, find } from 'lodash';
import { dateDiffList } from '~/utils';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const qualityConstant = {
  ccs: 0,
  esd: 0,
  est: 0,
  fat: 0,
  lact: 0,
  prot: 0,
  ufc: 0
};
const INITIAL_STATE = {
  searchQuality: {
    items: [],
    period: [],
    byIndex: {},
    average: 0,
    averageLastMonth: 0,
    total: 0,
    currentMonth: moment().format('MMMM'),
    lastMonth: moment().subtract(1, 'month').format('MMMM')
  },
  searchVolume: {
    items: [],
    period: [],
    byIndex: {}
  },
  searchVolumeAnoAnterior: {
    items: [],
    period: [],
    byIndex: {}
  },
  searchPrice: {
    items: [],
    period: [],
    byIndex: {}
  },
  searchPriceAnoAnterior: {
    items: [],
    period: [],
    byIndex: {}
  }
};

const getData = (state, { payload }) => {
  const newState = cloneDeep(INITIAL_STATE);
  const { qualities, range, type } = payload;
  if (__DEV__) console.log("researched.js - getData1", range);
  const list = [];
  newState.searchQuality.period = dateDiffList(range.startDate, range.endDate);
  forEach(newState.searchQuality.period, (item, index) => {
    newState.searchQuality.byIndex[index] = item;
    if (qualities[item]) {
      list.push(qualities[item]);
    } else {
      list.push(qualityConstant);
    }
  });
  newState.searchQuality.items = map(list, item => ({ y: item[type] }));
  if (__DEV__) console.log("researched.js - getData2", newState);
  return newState;
};

const setArray = number => {
  const arr = [];
  if (!number) arr;
  for (var i = 0; i < number; i++) {
    const num = i + 1;
    arr.push(num.toString());
  }
  return arr;
};

const getVolumeData = (state, { payload }) => {
  const newState = cloneDeep(INITIAL_STATE);
  const { range, volumes } = payload;
  const start = moment(range.startDate, 'MM/YYYY').startOf('month');
  const end = moment(range.endDate, 'MM/YYYY').endOf('month');
  const ra = moment.range(start, end);
  const filterVolumes = filter(volumes, item =>
    ra.contains(moment(item.searchDate))
  );

  forEach(filterVolumes, (item, index) => {
    newState.searchVolume.byIndex[index] = item;
  });
  newState.searchVolume.items = map(filterVolumes, item => ({ y: item.volume }));
  newState.searchVolume.period = setArray(newState.searchVolume.items.length);
  newState.searchVolume.currentMonth = start.format('MMMM');
  newState.searchVolume.lastMonth = start.subtract(1, 'month').format('MMMM');
  newState.searchVolume.total = reduce(
    map(filterVolumes, item => item.volume),
    (prev, next) => prev + next
  );

  newState.searchVolume.average =
    newState.searchVolume.total / newState.searchVolume.items.length;

  const filterMesAnterior = volumes.filter(item => {
    return moment(item.searchDate).format('MMMM') == newState.searchVolume.lastMonth
  });

  const totalLastMonth = reduce(
    map(filterMesAnterior, item => item.volume),
    (prev, next) => prev + next
  );

  newState.searchVolume.averageLastMonth = totalLastMonth / filterMesAnterior.length;
  console.log('newState.searchVolume', newState.searchVolume);
  return newState;
};


const getVolumeDataAnoAnterior = (state, { payload }) => {

  const newState = cloneDeep(INITIAL_STATE);
  const { range, volumes, rangeAnterior, volumesAnteriores } = payload;

  /**
   * VOLUME DO ANO ATUAL
   */
  const start = moment(range.startDate, 'MM/YYYY').startOf('month');
  const end = moment(range.endDate, 'MM/YYYY').endOf('month');
  const ra = moment.range(start, end);
  const filterVolumes = filter(volumes, item =>
    ra.contains(moment(item.searchDate))
  );

  forEach(filterVolumes, (item, index) => {
    newState.searchVolume.byIndex[index] = item;
  });
  newState.searchVolume.items = map(filterVolumes, item => ({ y: item.volume }));
  newState.searchVolume.period = setArray(newState.searchVolume.items.length);
  newState.searchVolume.currentMonth = start.format('MMMM');
  newState.searchVolume.lastMonth = start.subtract(1, 'month').format('MMMM');
  newState.searchVolume.total = reduce(
    map(filterVolumes, item => item.volume),
    (prev, next) => prev + next
  );

  newState.searchVolume.average =
    newState.searchVolume.total / newState.searchVolume.items.length;

  const filterMesAnterior = volumes.filter(item => {
    return moment(item.searchDate).format('MMMM') == newState.searchVolume.lastMonth
  });

  const totalLastMonth = reduce(
    map(filterMesAnterior, item => item.volume),
    (prev, next) => prev + next
  );

  newState.searchVolume.averageLastMonth = totalLastMonth / filterMesAnterior.length;


  /**
   * VOLUME DO ANO ANTERIOR
   */
  const startAnterior = moment(rangeAnterior.startDate, 'MM/YYYY').startOf('month');
  const endAnterior = moment(rangeAnterior.endDate, 'MM/YYYY').endOf('month');
  const raAnterior = moment.range(startAnterior, endAnterior);

  const filterVolumesAnteriores = filter(volumesAnteriores, item =>
    raAnterior.contains(moment(item.searchDate))
  );

  console.log('FILTER VOLUMES ANO ANTERIOR', filterVolumesAnteriores);
  if (filterVolumesAnteriores.length > 0) {
    forEach(filterVolumesAnteriores, (item, index) => {
      newState.searchVolumeAnoAnterior.byIndex[index] = item;
    });
  }
  else {
    newState.searchVolumeAnoAnterior.byIndex = newState.searchVolume.byIndex;
  }


  newState.searchVolumeAnoAnterior.items = map(filterVolumesAnteriores, item => ({ y: item.volume }));
  newState.searchVolumeAnoAnterior.period = setArray(newState.searchVolumeAnoAnterior.items.length);
  newState.searchVolumeAnoAnterior.currentMonth = startAnterior.format('MMMM');
  newState.searchVolumeAnoAnterior.lastMonth = startAnterior.subtract(1, 'month').format('MMMM');
  newState.searchVolumeAnoAnterior.lastYear = startAnterior.subtract(1, 'month').format('YYYY');
  newState.searchVolumeAnoAnterior.total = reduce(
    map(filterVolumesAnteriores, item => item.volume),
    (prev, next) => prev + next
  );

  //Calculando direferença percentual entre os anos
  if (!newState.searchVolumeAnoAnterior.total) {
    if (!newState.searchVolume.total) {
      newState.searchVolumeAnoAnterior.diferenca_percent = "" + 0;
    }
    else {
      newState.searchVolumeAnoAnterior.diferenca_percent = "+" + 100;
    }
    newState.searchVolume.total = 0;
    newState.searchVolumeAnoAnterior.total = 0;
  }
  else {
    if (!newState.searchVolume.total)
      newState.searchVolume.total = 0;
    let diferenca = newState.searchVolume.total - newState.searchVolumeAnoAnterior.total;
    let decimal = diferenca / newState.searchVolumeAnoAnterior.total;
    let percentual = decimal * 100;
    newState.searchVolumeAnoAnterior.diferenca_percent = percentual > 0 ? "+" + percentual.toFixed(2) : percentual.toFixed(2);
  }


  return newState;
};

const close = () => {
  const newState = cloneDeep(INITIAL_STATE);
  return newState;
};

const getDetailsDayQuality = (state, { payload }) => {
  const newState = cloneDeep(INITIAL_STATE);
  const { qualities, type } = payload;
  if (qualities) {
    if (!qualities.length) {
      let arrayQuality = [];
      arrayQuality.push(qualities);

      newState.searchQuality.period = map(arrayQuality, item => item.period);

      /* forEach(arrayQuality, (item, index) => {
        console.log('sem cbt ' + index, item[type]);
      }); */


      newState.searchQuality.items = map(arrayQuality, item => ({
        y: item[type] ? parseInt(item[type]) : 0
      }));
      forEach(arrayQuality, (item, index) => {
        newState.searchQuality.byIndex[index] = item;
      });
    }
    else {
      newState.searchQuality.period = map(qualities, item => item.period);

      newState.searchQuality.items = map(qualities, item => ({
        y: item[type] ? parseInt(item[type]) : 0
      }));
      forEach(qualities, (item, index) => {
        newState.searchQuality.byIndex[index] = item;
      });
    }
  }
  return newState;
};

const getPriceData = (state, { payload }) => {
  const newState = cloneDeep(INITIAL_STATE);
  const { prices, range, year } = payload;
  console.log('PREÇOS POR PADRÃO', prices);
  const start = moment(range.startDate, 'MM/YYYY').startOf('month').format('YYYYMM');
  const end = moment(range.endDate, 'MM/YYYY').endOf('month').format('YYYYMM');
  const start2 = moment(range.startDate, 'MM/YYYY').startOf('month').format('YYYY-MM-DD');
  const end2 = moment(range.endDate, 'MM/YYYY').endOf('month').format('YYYY-MM-DD');

  console.log('START DATE', start);
  const ra = moment.range(start, end);
  console.log('PRICEEEEEES', prices);

  const filterPrices = filter(prices, item =>
    ra.contains(moment(item._id.slice(0, -30)))
  );

  const range2 = moment.range(start2, end2);

  for (let month of range2.by('month')) {
    month.format('YYYY-MM-DD');
  }
  
  const years = Array.from(range2.by('month'));
  let range2map = years.map(m => m.format('MMYYYY'));
  
  filterPrices.forEach(price => {
    price.y = price.price;
  });

  newState.searchPrice.filter = filterPrices;
  newState.searchPrice.items = map(range2map, (item, index) => {
    const findPrice = find(filterPrices, price => price.month+price.year === item);
    if (findPrice) {
      return { y: parseFloat(findPrice.price), ano: findPrice.year, anoMes: moment(findPrice.month+'/'+findPrice.year, 'MM/YYYY').format('MMMM/YYYY')};
    }
    return { y: 0, ano: item.toString().substr(2, 4), anoMes: moment(item.toString(), 'MM/YYYY').format('MMMM/YYYY')};
  });

  const periodo = filter(range2map, item =>
    range2.contains(moment(moment(item, 'MMYYYY').startOf('month').format('YYYY-MM-DD')))
  );

  newState.searchPrice.period = map(periodo, (item, index) =>
    moment()
      .month(moment(item, 'MMYYYY').format('MMMM'))
      .format('MMM')
  );

  forEach(newState.searchPrice.items, (item, index) => {
    newState.searchPrice.byIndex[index] = {
      ...item,
      period: item.anoMes
    };
  });

  if (__DEV__) console.log("researched.js - getPriceData", newState);

  return newState;
};

const getPriceCompareData = (state, { payload }) => {
  const newState = cloneDeep(INITIAL_STATE);
  const { prices, range, year, rangeAnterior, allPrices } = payload;
  console.log('PRICES COMPARAÇÃO', prices);
  console.log('RANGE COMPARAÇÃO', range);
  console.log('ANO COMPARAÇÃO', year);
  console.log('RANGE ANTERIOR COMPARAÇÃO', rangeAnterior);
  console.log('TODOS OS PREÇOS', allPrices);
  console.log('PRICE ANO ANTERIOR COMPARAÇÃO');
  
  return newState;
};


export const researched = (state = INITIAL_STATE, action) => {
  if (__DEV__) console.log("researched.js - action.type", action.type);
  switch (action.type) {
    case 'SEARCH_QUALITY':
      return getData(state, action);
    case 'SEARCH_VOLUME':
      return getVolumeData(state, action);
    case 'SEARCH_VOLUME_ANO_ANTERIOR':
      return getVolumeDataAnoAnterior(state, action);
    case 'DETAILS_DAY_QUALITY':
      return getDetailsDayQuality(state, action);
    case 'PRICES_YEAR':
      return getPriceData(state, action);
    case 'PRICES_YEAR_COMPARACAO':
      return getPriceCompareData(state, action);
    case 'CLOSE_QUALITY':
      return close();
    default:
      return state;
  }
};

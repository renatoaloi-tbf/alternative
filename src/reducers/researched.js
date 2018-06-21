import {cloneDeep, forEach, map, filter, reduce, find} from 'lodash';
import {dateDiffList} from '~/utils';
import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

const qualityConstant = {
  ccs: 0,
  code: 0,
  esd: 0,
  est: 0,
  factory: 0,
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
    total: 0,
    currentMonth: moment().format('MMMM')
  },
  searchVolume: {
    items: [],
    period: [],
    byIndex: {}
  },
  searchPrice: {
    items: [],
    period: [],
    byIndex: {}
  }
};

const getData = (state, {payload}) => {
  const newState = cloneDeep(INITIAL_STATE);
  const {qualities, range, type} = payload;
  const list = [];
  newState.searchQuality.period = dateDiffList(range.startDate, range.endDate);
  forEach(newState.searchQuality.period, (item, index) => {
    newState.searchQuality.byIndex[index] = item;
    console.log(item);
    if (qualities[item]) {
      list.push(qualities[item]);
    } else {
      list.push(qualityConstant);
    }
  });
  newState.searchQuality.items = map(list, item => ({y: item[type]}));
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

const getVolumeData = (state, {payload}) => {
  const newState = cloneDeep(INITIAL_STATE);
  const {range, volumes} = payload;
  const start = moment(range, 'MM/YYYY').startOf('month');
  const end = moment(range, 'MM/YYYY').endOf('month');
  const ra = moment.range(start, end);
  const filterVolumes = filter(volumes, item =>
    ra.contains(moment(item.searchDate))
  );
  forEach(filterVolumes, (item, index) => {
    newState.searchVolume.byIndex[index] = item;
  });
  newState.searchVolume.items = map(filterVolumes, item => ({y: item.volume}));
  newState.searchVolume.period = setArray(newState.searchVolume.items.length);
  newState.searchVolume.currentMonth = start.format('MMMM');
  newState.searchVolume.total = reduce(
    map(filterVolumes, item => item.volume),
    (prev, next) => prev + next
  );
  newState.searchVolume.average =
    newState.searchVolume.total / newState.searchVolume.items.length;
  return newState;
};

const close = () => {
  const newState = cloneDeep(INITIAL_STATE);
  return newState;
};
const getDetailsDayQuality = (state, {payload}) => {
  debugger;
  const newState = cloneDeep(INITIAL_STATE);
  const {qualities, type} = payload;
  newState.searchQuality.period = map(qualities, item => item.period);

  newState.searchQuality.items = map(qualities, item => ({
    y: parseInt(item[type])
  }));
  forEach(qualities, (item, index) => {
    newState.searchQuality.byIndex[index] = item;
  });
  return newState;
};

const getPriceData = (state, {payload}) => {
  const newState = cloneDeep(INITIAL_STATE);
  const {prices, year} = payload;
  const pricesYear = prices[year];
  // map(moment.months(), item => )

  newState.searchPrice.items = map(moment.months(), (item, index) => {
    debugger;
    const findPrice = find(pricesYear, item => item.month === index + 1);
    if (findPrice) {
      return {y: parseFloat(findPrice.price)};
    }
    return {y: 0};
  });
  newState.searchPrice.period = map(moment.months(), (item, index) =>
    moment()
      .month(index)
      .format('MMM')
  );
  forEach(newState.searchPrice.items, (item, index) => {
    newState.searchPrice.byIndex[index] = {
      ...item,
      period: `${moment()
        .month(index)
        .format('MMMM')}/${year}`
    };
  });
  console.log(newState);
  return newState;
};

export const researched = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SEARCH_QUALITY':
      return getData(state, action);
    case 'SEARCH_VOLUME':
      return getVolumeData(state, action);
      debugger;
    case 'DETAILS_DAY_QUALITY':
      return getDetailsDayQuality(state, action);
    case 'PRICES_YEAR':
      return getPriceData(state, action);
    case 'CLOSE_QUALITY':
      return close();
    default:
      return state;
  }
};

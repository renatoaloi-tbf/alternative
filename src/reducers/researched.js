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
  ufc: 0,
  cbt: 0
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
  searchQualityAnoAnterior: {
    items: [],
    period: [],
    byIndex: {},
    average: 0,
    averageLastMonth: 0,
    total: 0,
    currentMonth: moment().subtract(1, 'year').format('MMMM'),
    lastMonth: moment().subtract(1, 'month').subtract(1, 'year').format('MMMM')
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
  //if (__DEV__) console.log("researched.js - getData1", range);
  const list = [], mediaPeriodo = [];
  newState.searchQuality.period = dateDiffList(range.startDate, range.endDate);
  mediaPeriodo['fat'] = 0;
  mediaPeriodo['ccs'] = 0;
  mediaPeriodo['cbt'] = 0;
  mediaPeriodo['esd'] = 0;
  mediaPeriodo['est'] = 0;
  mediaPeriodo['lact'] = 0;
  mediaPeriodo['prot'] = 0;
  forEach(newState.searchQuality.period, (item, index) => {
    newState.searchQuality.byIndex[index] = item;
    if (qualities[item]) {
      /* INICIO DA ALTERAÇÃO DO MARCELO MURASHOVISK PARA MOSTRAR A MÉDIA DO PERIODO [RISCO DE VOLTAR ATRÁS] */
      mediaPeriodo['fat'] = mediaPeriodo['fat'] + qualities[item].fat;
      mediaPeriodo['ccs'] = mediaPeriodo['ccs'] + qualities[item].ccs;
      mediaPeriodo['cbt'] = mediaPeriodo['cbt'] + qualities[item].cbt;
      mediaPeriodo['esd'] = mediaPeriodo['esd'] + qualities[item].esd;
      mediaPeriodo['est'] = mediaPeriodo['est'] + qualities[item].est;
      mediaPeriodo['lact'] = mediaPeriodo['lact'] + qualities[item].lact;
      mediaPeriodo['prot'] = mediaPeriodo['prot'] + qualities[item].prot;
      console.log('QUALITIES[ITEM] GETDATA', qualities[item]);
      list.push(qualities[item]);
    } else {
      list.push(qualityConstant);
    }
  });

  mediaPeriodo['fat'] = mediaPeriodo['fat'] / newState.searchQuality.period.length;
  mediaPeriodo['ccs'] = parseInt(mediaPeriodo['ccs'] / newState.searchQuality.period.length);
  mediaPeriodo['cbt'] = parseInt(mediaPeriodo['cbt'] / newState.searchQuality.period.length);
  mediaPeriodo['esd'] = mediaPeriodo['esd'] / newState.searchQuality.period.length;
  mediaPeriodo['est'] = mediaPeriodo['est'] / newState.searchQuality.period.length;
  mediaPeriodo['lact'] = mediaPeriodo['lact'] / newState.searchQuality.period.length;
  mediaPeriodo['prot'] = mediaPeriodo['prot'] / newState.searchQuality.period.length;

  /* mediaPeriodo['ccs'] = reduce(
    map(qualities, item2 => {console.log('O VALOR DO FAT', item2.fat)}),
    (prev, next) => prev + next
  ); */

  //console.log('total recolhido', mediaPeriodo);
  newState.searchQuality.mediaPeriodo = mediaPeriodo;
  newState.searchQuality.items = map(list, item => ({ y: item[type] ? item[type] : 0 }));

  if (type != 'ccs')
  {
    newState.searchQuality.total = reduce(
      map(newState.searchQuality.items, item => item.y),
      (prev, next) => prev + next
    );
    newState.searchQuality.average = newState.searchQuality.total / newState.searchQuality.items.length;
  }
  //console.log('LIST GETDATA', list);
  //console.log('QUALITIES GETDATA', qualities);
  //console.log('TYPE GETDATA', type);
  //console.log('NEW STATE GETDATA', newState);
  return newState;
};


const getDataComparacaoAnoAnterior = (state, { payload }) => {
  const newState = cloneDeep(INITIAL_STATE);
  const { qualities, range, type, rangeAnterior } = payload;
  //if (__DEV__) console.log("researched.js - getData1", range);
  //if (__DEV__) console.log("researched.js - RANGE ANTERIOR", rangeAnterior);

  /** PESQUISA PERIODO ATUAL */
  const list = [], mediaPeriodo = [];
  newState.searchQuality.period = dateDiffList(range.startDate, range.endDate);
  mediaPeriodo['fat'] = 0;
  mediaPeriodo['ccs'] = 0;
  mediaPeriodo['cbt'] = 0;
  mediaPeriodo['esd'] = 0;
  mediaPeriodo['est'] = 0;
  mediaPeriodo['lact'] = 0;
  mediaPeriodo['prot'] = 0;

  //console.log('newState.searchQuality.period', newState.searchQuality.period);
  //console.log('qualities', qualities);
  forEach(newState.searchQuality.period, (item, index) => {
    newState.searchQuality.byIndex[index] = item;
    //console.log('Teste qualities item', item);
    if (qualities[item]) {
      list.push(qualities[item]);

      mediaPeriodo['fat'] = mediaPeriodo['fat'] + qualities[item].fat;
      mediaPeriodo['ccs'] = mediaPeriodo['ccs'] + qualities[item].ccs;
      mediaPeriodo['cbt'] = mediaPeriodo['cbt'] + qualities[item].cbt;
      mediaPeriodo['esd'] = mediaPeriodo['esd'] + qualities[item].esd;
      mediaPeriodo['est'] = mediaPeriodo['est'] + qualities[item].est;
      mediaPeriodo['lact'] = mediaPeriodo['lact'] + qualities[item].lact;
      mediaPeriodo['prot'] = mediaPeriodo['prot'] + qualities[item].prot;
      console.log('QUALITIES[ITEM] GETDATA', qualities[item]);
    } else {
      list.push(qualityConstant);
    }
  });
  mediaPeriodo['fat'] = mediaPeriodo['fat'] / newState.searchQuality.period.length;
  mediaPeriodo['ccs'] = parseInt(mediaPeriodo['ccs'] / newState.searchQuality.period.length);
  mediaPeriodo['cbt'] = parseInt(mediaPeriodo['cbt'] / newState.searchQuality.period.length);
  mediaPeriodo['esd'] = mediaPeriodo['esd'] / newState.searchQuality.period.length;
  mediaPeriodo['est'] = mediaPeriodo['est'] / newState.searchQuality.period.length;
  mediaPeriodo['lact'] = mediaPeriodo['lact'] / newState.searchQuality.period.length;
  mediaPeriodo['prot'] = mediaPeriodo['prot'] / newState.searchQuality.period.length;

  /* mediaPeriodo['ccs'] = reduce(
    map(qualities, item2 => {console.log('O VALOR DO FAT', item2.fat)}),
    (prev, next) => prev + next
  ); */

  //console.log('total recolhido', mediaPeriodo);
  newState.searchQuality.mediaPeriodo = mediaPeriodo;
  //console.log('ITEM TYPE', type);
  newState.searchQuality.items = map(list, item => ({ y: item[type] }));
  //if (__DEV__) console.log("researched.js - getData2", newState);
  //console.log('newState.searchQuality.items AAAAAAAAAAAAAAAAAAAA', newState.searchQuality.items);
  /** PESQUISA PERIODO ATUAL END */

  /** PESQUISA PERIODO ANTERIOR */
  const listAnoAnterior = [];
  newState.searchQualityAnoAnterior.period = dateDiffList(rangeAnterior.startDate, rangeAnterior.endDate);
  //console.log('newState.searchQualityAnoAnterior.period', newState.searchQuality.period);
  //console.log('qualitiesAnterior', qualities);
  forEach(newState.searchQualityAnoAnterior.period, (item, index) => {
    newState.searchQualityAnoAnterior.byIndex[index] = item;
    console.log('Teste qualities item', item);
    if (qualities[item]) {
      console.log('QUALITIES ITEM CADA', qualities[item]);
      listAnoAnterior.push(qualities[item]);
    } else {

      listAnoAnterior.push(qualityConstant);
    }
  });
  //console.log('LIST ANO ANTERIOR', listAnoAnterior);
  newState.searchQualityAnoAnterior.items = map(listAnoAnterior, item => ({ y: item[type] }));
  //console.log('newState.searchQualityAnoAnterior.items', newState.searchQualityAnoAnterior.items);
  /** PESQUISA PERIODO ANTERIOR END */

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

      newState.searchQuality.items = map(arrayQuality, item => ({
        y: item[type] ? parseInt(item[type]) : 0
      }));

      forEach(arrayQuality, (item, index) => {
        newState.searchQuality.byIndex[index] = item;
      });
    }
    else {
      //console.log('qualities', qualities);
      //console.log('qualities type', type);
      newState.searchQuality.period = map(qualities, item => item.period);
      newState.searchQuality.items = map(qualities, item => ({
        y: item[type] ? item[type] : 0
      }));
      //console.log('newState.searchQuality.items', newState.searchQuality.items);

      forEach(qualities, (item, index) => {
        newState.searchQuality.byIndex[index] = item;
      });
    }

    console.log('entrou ou não entrou, eis a questão', type);
    if (type != 'ccs')
    {
      newState.searchQuality.total = reduce(
        map(newState.searchQuality.items, item => item.y),
        (prev, next) => prev + next
      );
      newState.searchQuality.average =
        newState.searchQuality.total / newState.searchQuality.items.length;
    }
    //console.log('newState.searchQuality.total', newState.searchQuality.total);
    //console.log('newState.searchQuality.items.length', newState.searchQuality.items.length);
    //console.log('newState.searchQuality.average', newState.searchQuality.average);

  }
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
  console.log('nao passei aqui, talquei?');
  const newState = cloneDeep(INITIAL_STATE);
  const { range, volumes, primeiraVisao } = payload;
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

  newState.searchVolume.currentMonth = moment().format('MMMM/YYYY');
  const filterVolumesCurrentMonth = filterVolumes.filter(item => {
    return moment(item.searchDate).format('MMMM/YYYY') == newState.searchVolume.currentMonth
  });
  newState.searchVolume.total = reduce(
    map(filterVolumesCurrentMonth, item => item.volume),
    (prev, next) => prev + next
  );

  newState.searchVolume.lastMonth = moment().subtract(1, 'month').format('MMMM/YYYY');
  newState.searchVolume.average =
    newState.searchVolume.total / newState.searchVolume.items.length;
  const filterMesAnterior = volumes.filter(item => {
    return moment(item.searchDate).format('MMMM/YYYY') == newState.searchVolume.lastMonth
  });
  const totalLastMonth = reduce(
    map(filterMesAnterior, item => item.volume),
    (prev, next) => prev + next
  );
  newState.searchVolume.averageLastMonth = totalLastMonth / filterMesAnterior.length;
  return newState;
};


const getVolumeDataAnoAnterior = (state, { payload }) => {
  console.log('aqui eu passei');
  const newState = cloneDeep(INITIAL_STATE);
  const { range, volumes, rangeAnterior, volumesAnteriores } = payload;

  /**
   * VOLUME DO ANO ATUAL
   */
  const start = moment(range.startDate, 'MM/YYYY').startOf('month');
  const end = moment(range.endDate, 'MM/YYYY').endOf('month');
  const ra = moment.range(start, end);

  // Filtro Atual
  const filterVolumes = filter(volumes, item =>
    ra.contains(moment(item.searchDate))
  );
  forEach(filterVolumes, (item, index) => {
    newState.searchVolume.byIndex[index] = item;
  });
  newState.searchVolume.items = map(filterVolumes, item => ({ y: item.volume, searchDate: item.searchDate }));

  // Soma do total coletado no ano atual
  newState.searchVolume.totalAnoAtual = reduce(
    map(filterVolumes, item => item.volume),
    (prev, next) => prev + next
  );

  // Média do volume ano atual
  var meses = [];
  var countMes = 0;
  var somaMes = 0;
  console.log('newState.searchVolume.items', newState.searchVolume.items);
  newState.searchVolume.items.forEach((item, i) => {
    var mesValue = moment(item.searchDate).format('MMM');
    if (meses.indexOf(mesValue) == -1) {
      countMes++;
      meses.push(mesValue);
    }
    somaMes += item.y;
  });
  console.log('countMes', countMes);
  console.log('somaMes', somaMes);
  if (countMes > 1)
    newState.searchVolume.average = somaMes / countMes;
  else
    newState.searchVolume.average =
      newState.searchVolume.total / newState.searchVolume.items.length;

  // ???????????????
  newState.searchVolume.period = setArray(newState.searchVolume.items.length);

  // Conta do Total do Mês Corrente
  /* newState.searchVolume.currentMonth = moment().format('MMMM/YYYY');
  const filterVolumesCurrentMonth = filterVolumes.filter(item => {
    return moment(item.searchDate).format('MMMM/YYYY') == newState.searchVolume.currentMonth
  });
  newState.searchVolume.total = reduce(
    map(filterVolumesCurrentMonth, item => item.volume),
    (prev, next) => prev + next
  ); */
  newState.searchVolume.total = newState.searchVolume.totalAnoAtual;
  newState.searchVolume.currentMonth = 'período';

  // Conta da Média do Mês Anterior
  /* newState.searchVolume.lastMonth = moment().subtract(1, 'month').format('MMMM/YYYY');
  const filterMesAnterior = volumes.filter(item => {
    return moment(item.searchDate).format('MMMM/YYYY') == newState.searchVolume.lastMonth
  });
  const totalLastMonth = reduce(
    map(filterMesAnterior, item => item.volume),
    (prev, next) => prev + next
  ); */
  //newState.searchVolume.averageLastMonth = totalLastMonth / filterMesAnterior.length;
  newState.searchVolume.averageLastMonth = 
    newState.searchVolume.totalAnoAtual / newState.searchVolume.items.length;

  console.log('depois desses', newState.searchVolume);

  /**
   * VOLUME DO ANO ANTERIOR
   */


  // Range do ano anterior
  const startAnterior = moment(rangeAnterior.startDate, 'MM/YYYY').startOf('month');
  const endAnterior = moment(rangeAnterior.endDate, 'MM/YYYY').endOf('month');
  const raAnterior = moment.range(startAnterior, endAnterior);
  const filterVolumesAnteriores = filter(volumesAnteriores, item =>
    raAnterior.contains(moment(item.searchDate))
  );

  //console.log('FILTER VOLUMES ANO ANTERIOR', filterVolumesAnteriores);
  if (filterVolumesAnteriores.length > 0) {
    forEach(filterVolumesAnteriores, (item, index) => {
      newState.searchVolumeAnoAnterior.byIndex[index] = item;
    });
  }
  else {
    newState.searchVolumeAnoAnterior.byIndex = newState.searchVolume.byIndex;
  }

  newState.searchVolumeAnoAnterior.total = reduce(
    map(filterVolumesAnteriores, item => item.volume),
    (prev, next) => prev + next
  );


  newState.searchVolumeAnoAnterior.items = map(filterVolumesAnteriores, item => ({ y: item.volume, searchDate: item.searchDate }));
  newState.searchVolumeAnoAnterior.period = setArray(newState.searchVolumeAnoAnterior.items.length);
  newState.searchVolumeAnoAnterior.currentMonth = startAnterior.format('MMMM');
  newState.searchVolumeAnoAnterior.lastMonth = startAnterior.subtract(1, 'month').format('MMMM');

  newState.searchVolumeAnoAnterior.lastYear = moment(rangeAnterior.startDate, 'MM/YYYY').format('YYYY');


  //Calculando diferença percentual entre os anos
  if (!newState.searchVolumeAnoAnterior.total) {
    if (!newState.searchVolume.totalAnoAtual) {
      newState.searchVolumeAnoAnterior.diferenca_percent = "" + 0;
    }
    else {
      newState.searchVolumeAnoAnterior.diferenca_percent = "+" + 100;
    }
    newState.searchVolume.totalAnoAtual = 0;
    newState.searchVolumeAnoAnterior.total = 0;
  }
  else {
    if (!newState.searchVolume.totalAnoAtual)
      newState.searchVolume.totalAnoAtual = 0;
    let diferenca = newState.searchVolume.totalAnoAtual - newState.searchVolumeAnoAnterior.total;
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

const getPriceData = (state, { payload }) => {
  const newState = cloneDeep(INITIAL_STATE);
  const { prices, range, year } = payload;
  console.log('PREÇOS POR PADRÃO', prices);
  const start = moment(range.startDate, 'MM/YYYY').startOf('month').format('YYYYMM');
  const end = moment(range.endDate, 'MM/YYYY').endOf('month').format('YYYYMM');
  const start2 = moment(range.startDate, 'MM/YYYY').startOf('month').format('YYYY-MM-DD');
  const end2 = moment(range.endDate, 'MM/YYYY').endOf('month').format('YYYY-MM-DD');

  //console.log('START DATE', start);
  const ra = moment.range(start, end);
  //console.log('PRICEEEEEES', prices);

  const filterPrices = filter(prices, item =>
    ra.contains(moment(moment(item.period, 'MM/YYYY').format('YYYYMM')))
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
  console.log('FILTER PRICE', filterPrices);
  newState.searchPrice.items = map(range2map, (item, index) => {
    const findPrice = find(filterPrices, price => moment(price.period, 'MM/YYYY').format('MMYYYY') === item);
    if (findPrice) {
      //console.log('FIND PRICE:', { y: parseFloat(findPrice.price), ano: findPrice.year, anoMes: moment(findPrice.period, 'MM/YYYY').format('MMMM/YYYY')});
      return { y: parseFloat(findPrice.price), ano: findPrice.year, anoMes: moment(findPrice.period, 'MM/YYYY').format('MMMM/YYYY') };
    }
    return { y: 0, ano: moment(item.toString(), 'MM/YYYY').format('YYYY'), anoMes: moment(item.toString(), 'MM/YYYY').format('MMMM/YYYY') };
  });

  const periodo = filter(range2map, item =>
    range2.contains(moment(moment(item, 'MMYYYY').startOf('month').format('YYYY-MM-DD')))
  );

  newState.searchPrice.period = map(periodo, (item, index) =>
    moment()
      .month(moment(item, 'MMYYYY').format('MMMM'))
      .format('MMM')
  );


  console.log('PRICE PERIOD', newState.searchPrice.period);
  forEach(newState.searchPrice.items, (item, index) => {
    newState.searchPrice.byIndex[index] = {
      ...item,
      period: item.anoMes
    };
  });

  const totalPesquisa = reduce(
    map(newState.searchPrice.filter, item => item.price),
    (prev, next) => prev + next
  );

  newState.searchPrice.media = totalPesquisa / newState.searchPrice.filter.length;

  return newState;
};

const getPriceCompareData = (state, { payload }) => {
  const newState = cloneDeep(INITIAL_STATE);
  const { prices, range, year, rangeAnterior, allPrices } = payload;
  //console.log('PRICES COMPARAÇÃO', prices);
  //console.log('RANGE COMPARAÇÃO', range);
  //console.log('ANO COMPARAÇÃO', year);
  //console.log('RANGE ANTERIOR COMPARAÇÃO', rangeAnterior);
  //console.log('TODOS OS PREÇOS', allPrices);
  //console.log('PRICE ANO ANTERIOR COMPARAÇÃO');

  /**COMPARAÇÃO INICIO */
  /** RANGE ESCOLHIDO */
  //console.log('PREÇOS POR PADRÃO COMPARACAO', prices);
  const start = moment(range.startDate, 'MM/YYYY').startOf('month').format('YYYYMM');
  const end = moment(range.endDate, 'MM/YYYY').endOf('month').format('YYYYMM');
  const start2 = moment(range.startDate, 'MM/YYYY').startOf('month').format('YYYY-MM-DD');
  const end2 = moment(range.endDate, 'MM/YYYY').endOf('month').format('YYYY-MM-DD');

  //console.log('START DATE  COMPARACAO', start);
  const ra = moment.range(start, end);
  //console.log('PRICEEEEEES  COMPARACAO', prices);

  const filterPrices = filter(prices, item =>
    ra.contains(moment(moment(item.period, 'MM/YYYY').format('YYYYMM')))
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
  //console.log('FILTER PRICE  COMPARACAO', filterPrices);
  newState.searchPrice.items = map(range2map, (item, index) => {
    const findPrice = find(filterPrices, price => moment(price.period, 'MM/YYYY').format('MMYYYY') === item);
    if (findPrice) {
      return { y: parseFloat(findPrice.price), ano: findPrice.year, anoMes: moment(findPrice.period, 'MM/YYYY').format('MMMM/YYYY') };
    }
    return { y: 0, ano: moment(item.toString(), 'MM/YYYY').format('YYYY'), anoMes: moment(item.toString(), 'MM/YYYY').format('MMMM/YYYY') };
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


  /** PERIODO ANTERIOR */



  //console.log('PREÇOS POR PADRÃO COMPARACAO ANTERIOR', allPrices);
  const startrangeAnterior = moment(rangeAnterior.startDate, 'MM/YYYY').startOf('month').format('YYYYMM');
  const endrangeAnterior = moment(rangeAnterior.endDate, 'MM/YYYY').endOf('month').format('YYYYMM');
  const start2rangeAnterior = moment(rangeAnterior.startDate, 'MM/YYYY').startOf('month').format('YYYY-MM-DD');
  const end2rangeAnterior = moment(rangeAnterior.endDate, 'MM/YYYY').endOf('month').format('YYYY-MM-DD');

  //console.log('START DATE  COMPARACAO ANTERIOR', startrangeAnterior);
  const rarangeAnterior = moment.range(startrangeAnterior, endrangeAnterior);
  //console.log('PRICEEEEEES  COMPARACAO ANTERIOR', allPrices);

  const filterPricesrangeAnterior = filter(allPrices, item =>
    rarangeAnterior.contains(moment(moment(item.period, 'MM/YYYY').format('YYYYMM')))
  );

  const range2rangeAnterior = moment.range(start2rangeAnterior, end2rangeAnterior);

  for (let month of range2rangeAnterior.by('month')) {
    month.format('YYYY-MM-DD');
  }

  const yearsrangeAnterior = Array.from(range2rangeAnterior.by('month'));
  let range2rangeAnteriormap = yearsrangeAnterior.map(m => m.format('MMYYYY'));

  filterPricesrangeAnterior.forEach(price => {
    price.y = price.price;
  });

  newState.searchPriceAnoAnterior.filter = filterPricesrangeAnterior;
  //console.log('FILTER PRICE COMPARACAO ANTERIOR', filterPricesrangeAnterior);
  newState.searchPriceAnoAnterior.items = map(range2rangeAnteriormap, (item, index) => {
    const findPrice = find(filterPricesrangeAnterior, price => moment(price.period, 'MM/YYYY').format('MMYYYY') === item);
    if (findPrice) {
      return { y: parseFloat(findPrice.price), ano: findPrice.year, anoMes: moment(findPrice.period, 'MM/YYYY').format('MMMM/YYYY') };
    }
    return { y: 0, ano: moment(item.toString(), 'MM/YYYY').format('YYYY'), anoMes: moment(item.toString(), 'MM/YYYY').format('MMMM/YYYY') };
  });

  const periodorangeAnterior = filter(range2rangeAnteriormap, item =>
    range2rangeAnterior.contains(moment(moment(item, 'MMYYYY').startOf('month').format('YYYY-MM-DD')))
  );

  newState.searchPriceAnoAnterior.period = map(periodorangeAnterior, (item, index) =>
    moment()
      .month(moment(item, 'MMYYYY').format('MMMM'))
      .format('MMM')
  );

  forEach(newState.searchPriceAnoAnterior.items, (item, index) => {
    newState.searchPriceAnoAnterior.byIndex[index] = {
      ...item,
      period: item.anoMes
    };
  });

  //console.log('NEW STATE ANO ANTERIOR ANTERIOR', newState);

  return newState;
};


export const researched = (state = INITIAL_STATE, action) => {
  //if (__DEV__) console.log("researched.js - action.type", action.type);
  switch (action.type) {
    case 'SEARCH_QUALITY':
      return getData(state, action);
    case 'SEARCH_QUALITY_COMPARACAO':
      return getDataComparacaoAnoAnterior(state, action);
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
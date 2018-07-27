export const getSearchQuality = (range, qualities, type, user) => {
  return {
    type: 'SEARCH_QUALITY',
    payload: {
      range,
      qualities,
      type,
      user
    }
  };
};


export const getSearchQualityComparacao = (range, qualities, type, rangeAnterior, user) => {
  return {
    type: 'SEARCH_QUALITY_COMPARACAO',
    payload: {
      range,
      qualities,
      type,
      rangeAnterior,
      user
    }
  };
};

export const getDetailsDayQuality = (qualities, type, user) => {
  return {
    type: 'DETAILS_DAY_QUALITY',
    payload: {
      qualities,
      type,
      user
    }
  };
};

export const closeSearchQuality = () => {
  return {
    type: 'CLOSE_QUALITY'
  };
};

export const getSearchVolume = (range, volumes, primeiraVisao, user) => {
  return {
    type: 'SEARCH_VOLUME',
    payload: {
      range,
      volumes,
      primeiraVisao,
      user
    }
  };
};

export const getSearchVolumeAnoAnterior = (range, volumes, rangeAnterior, volumesAnteriores, user) => {
  return {
    type: 'SEARCH_VOLUME_ANO_ANTERIOR',
    payload: {
      range,
      volumes,
      rangeAnterior,
      volumesAnteriores,
      user
    }
  };
};

export const getPrices = (prices, range, year) => {
  return {
    type: 'PRICES_YEAR',
    payload: {
      prices,
      range, 
      year
    }
  };
};


export const getPriceCompareData = (prices, range, year, rangeAnterior, allPrices) => {
  return {
    type: 'PRICES_YEAR_COMPARACAO',
    payload: {
      prices,
      range, 
      year,
      rangeAnterior,
      allPrices
    }
  };
};

export const getStatements = (statements, period) => {
  return {
    type: 'GET_STATEMENTS',
    payload: {
      statements,
      period
    }
  };
};

export const getSearchQuality = (range, qualities, type) => {
  return {
    type: 'SEARCH_QUALITY',
    payload: {
      range,
      qualities,
      type
    }
  };
};

export const closeSearchQuality = () => {
  return {
    type: 'CLOSE_QUALITY'
  };
};

export const getSearchVolume = (range, volumes) => {
  return {
    type: 'SEARCH_VOLUME',
    payload: {
      range,
      volumes
    }
  };
};

export const getSearchVolumeAnoAnterior = (range, volumes, rangeAnterior, volumesAnteriores) => {
  return {
    type: 'SEARCH_VOLUME_ANO_ANTERIOR',
    payload: {
      range,
      volumes,
      rangeAnterior,
      volumesAnteriores
    }
  };
};

export const getDetailsDayQuality = (qualities, type) => {
  return {
    type: 'DETAILS_DAY_QUALITY',
    payload: {
      qualities,
      type
    }
  };
};

export const getPrices = (prices, year) => {
  return {
    type: 'PRICES_YEAR',
    payload: {
      prices,
      year
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

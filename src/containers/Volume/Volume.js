import React from 'react';
import styled from 'styled-components/native';
import {
  compose,
  withHandlers,
  withProps,
  setPropTypes,
  withState,
  lifecycle
} from 'recompose';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { size, isEmpty, filter, map, reduce } from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
// Local

import { FilterOneDatePicker } from '~/components/FilterOneDatePicker';
import { getSearchVolume, closeSearchQuality, getSearchVolumeAnoAnterior } from '~/actions';
import {
  Wrapper,
  TopBar,
  BackButton,
  Icon,
  DrawerButton,
  BarChart,
  ScrollWrapper,
  BarChartLine
} from '~/components/shared';

import { VolumeDetails, VolumeAverage } from '~/components/Volume';
import { FilterCore } from '~/components/FilterCore';

const enhance = compose(
  connect(
    ({ volume, researched }) => ({ volume, researched }),
    { getSearchVolume, getSearchVolumeAnoAnterior, closeSearchQuality }
  ),
  withState('range', 'setRange', {
    startDate: moment(), 
    endDate: moment()
  }),
  withState('rangeAnoAnterior', 'setRangeAnoAnterior', {
    startDate: moment().subtract(1, 'month').subtract(1, 'year'),
    endDate: moment().subtract(1, 'year')
  }),
  withState('details', 'setDetails', {}),
  withState('isFilter', 'setFilter', true),
  withState('isClose', 'setClose', false),
  withState('collected', 'setCollected', 0),
  withState('isCollected', 'setIsCollected', false),
  withState('isCompare', 'setIsCompare', false),
  withState('searchMonth', 'setSearchMonth', ''),
  withState('anoAnterior', 'setAnoAnterior', false),
  withState('changed', 'setChanged', { rangeAtual: null, rangeAnoAnterior: null }),
  withHandlers({
    handlerComparacao: ({
      setAnoAnterior,
      rangeAnoAnterior,
      volume,
      setRangeAnoAnterior,
      getSearchVolumeAnoAnterior,
      range,
      setRange,
      setIsCollected,
      changed,
      researched,
      setCollected,
      setIsCompare
    }) => (e) => {
      //console.log('éééééé', e);
      setIsCollected(e);
      setIsCompare(e);
      if (changed.rangeAtual != null && changed.rangeAnoAnterior != null) {
        setRange(changed.rangeAtual);
        setRangeAnoAnterior(changed.rangeAnoAnterior);
        setAnoAnterior(e);
        getSearchVolumeAnoAnterior(changed.rangeAtual, volume.all, changed.rangeAnoAnterior, volume.all);
      }
      else {
        setRange(range);
        setRangeAnoAnterior(rangeAnoAnterior);
        setAnoAnterior(e);
        getSearchVolumeAnoAnterior(range, volume.all, rangeAnoAnterior, volume.all);
      }
      setCollected(researched.searchVolume.totalAnoAtual);
    },
		close: ({
			setRange,
			setSearchMonth,
			setFilter,
      setClose,
      volume,
      setDetails,
      setIsCollected,
      getSearchVolume,
      setAnoAnterior,
      setRangeAnoAnterior,
      setIsCompare
		}) => () => {
      console.log('passei no close do Volume');
			setRange({});
      setClose(false);
      // reiniciando dados de comparação
      setAnoAnterior(false);
      setRangeAnoAnterior({});
      const range = {
        startDate: moment(), 
        endDate: moment()
      };
			const { startDate, endDate } = range;
        setSearchMonth(
          `${moment(startDate, 'MM/YYYY').format('MMMM/YYYY').charAt(0).toUpperCase() 
              + moment(startDate, 'MM/YYYY').format('MMMM/YYYY').slice(1)}`
        );
        getSearchVolume(range, volume.all, true);
        setRange({ ...range });
        setIsCollected(false);
        setIsCompare(false);
        setDetails({});
		},
    handlerClose: ({
      setDetails,
      closeSearchQuality,
      setIsCollected,
      setRange,
      setSearchMonth,
      volume,
      setClose,
      changed
    }) => () => {
      console.log('passei no handlerClose do Volume');
      setRange({});
      setClose(true);


      if (changed.rangeAtual) {
        setSearchMonth(
          `${moment(changed.rangeAtual.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(
            changed.rangeAtual.endDate,
            'MM/YYYY'
          ).format('MMM/YYYY')}`
        );
      }
      else {
        const { startDate } = range;
        setSearchMonth(
          `${moment(startDate, 'MM/YYYY').format('MMMM/YYYY').charAt(0).toUpperCase() 
              + moment(startDate, 'MM/YYYY').format('MMMM/YYYY').slice(1)}`
        );
      }

      /* setClose(false);
      const range = {
        startDate: moment(),
        endDate: moment()
      };
      if (changed.rangeAtual) {
        setSearchMonth(
          `${moment(changed.rangeAtual.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(
            changed.rangeAtual.endDate,
            'MM/YYYY'
          ).format('MMM/YYYY')}`
        );
        getSearchVolume(changed.rangeAtual, volume.all, false);
        setRange({ ...changed.rangeAtual });
        setClose(true);
      }
      else {
        const { startDate, endDate } = range;
        setSearchMonth(
          `${moment(startDate, 'MM/YYYY').format('MMMM/YYYY').charAt(0).toUpperCase() 
              + moment(startDate, 'MM/YYYY').format('MMMM/YYYY').slice(1)}`
        );
        getSearchVolume(range, volume.all, true);
        setRange({ ...range });
      }
      setIsCollected(false);
      setDetails({}); */
    },
    onChange: ({
      researched,
      setRange,
      getSearchVolume,
      volume,
      setFilter,
      anoAnterior,
      setRangeAnoAnterior,
      getSearchVolumeAnoAnterior,
      setChanged,
      setIsCollected,
      setCollected
    }) => async e => {
      if (size(e) === 2) {
        var rangeAnterior = {
          startDate: moment(e.startDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY'),
          endDate: moment(e.endDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY')
        }
        setChanged({ rangeAtual: e, rangeAnoAnterior: rangeAnterior });
        if (anoAnterior) {
          console.log('estou passando aqui mesmo?');
          setIsCollected(true);
          setRangeAnoAnterior(rangeAnterior);
        }
        else {
          setIsCollected(false);
          setRange(e);
        }
        await getSearchVolumeAnoAnterior(e, volume.all, rangeAnterior, volume.all);
        setCollected(researched.searchVolume.totalAnoAtual);
      }
    },
    onSelect: ({
      researched,
      setDetails,
      setRange,
      setCollected,
      setIsCollected,
      setClose,
      setSearchMonth,
      anoAnterior,
      volume,
      getSearchVolumeAnoAnterior,
      setIsCompare
    }) => e => {
      console.log('passei no onSelect do Volume', e);
      if (!isEmpty(e)) 
      {
        if (anoAnterior) 
        {
          console.log('entrei na parte do anoAnterior do onSelect');
          if (researched.searchVolumeAnoAnterior.items.length == 0) 
          {
            console.log('parte do if 1 do onSelect');
            if (researched.searchVolume.items.length == 0) 
            {
              researched.searchVolumeAnoAnterior.diferenca_percent = '0.00';
            }
            else 
            {
              researched.searchVolumeAnoAnterior.diferenca_percent = '+100';
            }
          }
          else 
          {
            const ex = Math.round(Math.abs(e.x));

            console.log('parte do else 1 do onSelect', ex);
            
            //if(researched.searchVolumeAnoAnterior.byIndex[ex])  
            //{
              console.log('parte do if 2 do onSelect Anterior', researched.searchVolumeAnoAnterior);
              console.log('parte do if 2 do onSelect', researched.searchVolume);

              var mesesAnoAtual = [];
              var mesesAnoAnterior = [];

              researched.searchVolume.items.forEach((item, idx) => {
                const mes = moment(item.searchDate).format('MM/YYYY');
                if (mesesAnoAtual.indexOf(mes) == -1)
                {
                  mesesAnoAtual.push(mes);
                }
              });

              researched.searchVolumeAnoAnterior.items.forEach((item, idx) => {
                const mes = moment(item.searchDate).format('MM/YYYY');
                if (mesesAnoAnterior.indexOf(mes) == -1)
                {
                  mesesAnoAnterior.push(mes);
                }
              });

              console.log('mesesAnoAtual[ex]', mesesAnoAtual);
              console.log('mesesAnoAnterior[ex]', mesesAnoAnterior);
              
              const mesAnoAtual = mesesAnoAtual[ex];
              const mesAnoAnterior = mesesAnoAnterior[ex];

              console.log('mesAnoAtual', mesAnoAtual);
              console.log('mesAnoAnterior', mesAnoAnterior);

              // Filtro Ano Atual
              const startAnoAtual = moment(mesAnoAtual, 'MM/YYYY').startOf('month');
              const endAnoAtual = moment(mesAnoAtual, 'MM/YYYY').endOf('month');
              const raAnoAtual = moment.range(startAnoAtual, endAnoAtual);
              // 
              const filterAnoAtual = filter(researched.searchVolume.items, item => raAnoAtual.contains(moment(item.searchDate)));
              // Soma do total coletado no mes do ano atual
              const totalAnoAtual = reduce(map(filterAnoAtual, item => item.y), (prev, next) => prev + next);

              console.log('totalAnoAtual', totalAnoAtual);

              // Filtro Ano Anterior
              const startAnoAnterior = moment(mesAnoAnterior, 'MM/YYYY').startOf('month');
              const endAnoAnterior = moment(mesAnoAnterior, 'MM/YYYY').endOf('month');
              const raAnoAnterior = moment.range(startAnoAnterior, endAnoAnterior);
              // 
              const filterAnoAnterior = filter(researched.searchVolumeAnoAnterior.items, item => raAnoAnterior.contains(moment(item.searchDate)));
              // Soma do total coletado no mes do ano atual
              const totalAnoAnterior = reduce(map(filterAnoAnterior, item => item.y), (prev, next) => prev + next);

              console.log('totalAnoAnterior', totalAnoAnterior);

              let diferenca = 0, decimal = 0, percentual = 0;
              if (totalAnoAnterior) 
              {
                researched.searchVolumeAnoAnterior.total = totalAnoAnterior;
                console.log('parte do if 3 do onSelect');
                diferenca = totalAnoAtual - totalAnoAnterior;
                decimal = diferenca / totalAnoAnterior;
                percentual = decimal * 100;
              }
              else 
              {
                researched.searchVolumeAnoAnterior.total = '000';
                console.log('parte do else 3 do onSelect');
                percentual = 0;
              }

              console.log('percentual', percentual);

              if (percentual > 0) 
              {
                console.log('parte do if 4 do onSelect');
                researched.searchVolumeAnoAnterior.diferenca_percent = '+' + percentual.toFixed(2);
              }
              else 
              {
                console.log('parte do else 4 do onSelect');
                researched.searchVolumeAnoAnterior.diferenca_percent = '' + percentual.toFixed(2);
              }
            /* }
            else 
            {
              console.log('parte do else 2 do onSelect');
              researched.searchVolumeAnoAnterior.diferenca_percent = '0.00';
            } */

            const mesFormatado = moment(mesAnoAnterior, 'MM/YYYY').format('MMM - YYYY').charAt(0).toUpperCase() 
                               + moment(mesAnoAnterior, 'MM/YYYY').format('MMM - YYYY').slice(1);
            researched.searchVolumeAnoAnterior.lastYear = mesFormatado;
            researched.searchVolume.totalAnoAtual = totalAnoAtual;
            setIsCompare(true);
            setIsCollected(true);
            setClose(true);
          }
        }
        else 
        {
          console.log('entrei na outra parte do onSelect');
          var arrayDate = [];
          var arrayCount = [];
          var countMes = 0;
          researched.searchVolume.items.forEach((item, i) => { 
              var mesValues = moment(item.searchDate).locale('pt-br').format('MMM').toUpperCase();
              if (arrayCount.indexOf(mesValues) == -1)
              {
                  countMes++;
                  arrayCount.push(mesValues);
                  arrayDate.push(moment(item.searchDate).format('MM/YYYY'));
              }
          }); 
          if (countMes > 1)
          {
            const mes = arrayDate[e.x];
            const range = {
                startDate: mes,
                endDate: mes
            };
            setSearchMonth(
              `${moment(mes, 'MM/YYYY').format('MMMM/YYYY').charAt(0).toUpperCase() 
                  + moment(mes, 'MM/YYYY').format('MMMM/YYYY').slice(1)}`
            );
            getSearchVolumeAnoAnterior(range, volume.all, range, volume.all);
          }
          else
          {
            let volumelocal = researched.searchVolume.byIndex[e.x];
            setIsCollected(false);
            setCollected(0);
            if (volumelocal) {
              setCollected(volumelocal.volume);
              setIsCollected(true);
              setSearchMonth(moment(volumelocal.start_date).format('LL'));
              const details = researched.searchVolume.byIndex[e.x];
              setDetails(details);
            }
            setIsCompare(false);
            setClose(true);
          }
        }
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      const { startDate, endDate } = this.props.range;
      this.props.setSearchMonth(
        `${moment(startDate, 'MM/YYYY').format('MMMM/YYYY').charAt(0).toUpperCase() 
            + moment(startDate, 'MM/YYYY').format('MMMM/YYYY').slice(1)}`
      );
      this.props.getSearchVolume(this.props.range, this.props.volume.all, true);
    }
  })
);

export const Volume = enhance(
  ({
    handlerClose,
    handlerChange,
    researched,
    onSelect,
    details,
    range,
    isFilter,
    collected,
    isCollected,
    onChange,
    isClose,
    searchMonth,
    handlerComparacao,
    anoAnterior,
    close,
    isCompare
  }) => {
    return (
      <Wrapper secondary>
        <TopBar
          title="Volume"
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<DrawerButton />}
        />
        <ScrollWrapperStyle>
          <WrapperHeader>
            <FilterCore
              onClose={handlerClose}
              value={range.label}
              onChange={onChange}
              isFilter={isFilter}
              isClose={isClose}
              apply={handlerClose}
              close={close}
              value={searchMonth}
              inverted={false}
              comparacao={handlerComparacao}
            />
          </WrapperHeader>
          <WrapperVolumeAverage>
            <VolumeAverage
              average={parseFloat(researched.searchVolume.averageLastMonth)}
              month={researched.searchVolume.currentMonth}
              lastMonth={researched.searchVolume.lastMonth}
              total={researched.searchVolume.total}
              collected={collected}
              totalAnoAtual={researched.searchVolume.totalAnoAtual}
              isCollected={isCollected}
              isCompare={isCompare}
              lastYear={researched.searchVolumeAnoAnterior.lastYear}
              percentual={researched.searchVolumeAnoAnterior.diferenca_percent}
              totalAnoAnterior={researched.searchVolumeAnoAnterior.total}
            />
          </WrapperVolumeAverage>
          <WrapperBar>
            <BarChartLine
              onSelect={onSelect}
              values={researched.searchVolume.items}
              valueFormatter={researched.searchVolume.period}
              valueFormatterIndex={researched.searchVolume.byIndex}
              media={300}
              tipo={"volume"}
              anoAnterior={anoAnterior}
              valuesAnoAnterior={researched.searchVolumeAnoAnterior.items}
            />
          </WrapperBar>
          <WrapperDetails>
            {!isEmpty(details) && <VolumeDetails details={details} />}
          </WrapperDetails>
        </ScrollWrapperStyle>
      </Wrapper>
    );
  }
);

const WrapperHeader = styled.View`
  padding-bottom: 2;
`;

const WrapperBar = styled.View`
  height: 250;
  background-color: ${props => props.theme.bg};
  padding-top: 1;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: 1px 0px 3px #0f0f0f;
  elevation: 3;
`;

const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;

const WrapperDetails = styled.View`
  flex: 1;
  padding-top: 3;
`;

const WrapperVolumeAverage = styled.View`
  height: 90;
  margin-bottom: 2;
`;
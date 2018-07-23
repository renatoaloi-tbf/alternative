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
    startDate: moment(), //.subtract(1, 'month'),
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
      setCollected
    }) => (e) => {
      console.log('VOLUME ALL', volume.all);
      console.log('CHANGED', changed);

      setIsCollected(e);
      
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
      setCollected(researched.searchVolume.total);
      console.log('RESEARCHED VOLUME', researched);
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
      setRangeAnoAnterior
		}) => () => {
			console.log('fechei 1');
			setRange({});
      setClose(false);
      // reiniciando dados de comparação
      setAnoAnterior(false);
      setRangeAnoAnterior({});
      const range = {
        startDate: moment(), //.subtract(1, 'month'),
        endDate: moment()
      };
			const { startDate, endDate } = range;
        setSearchMonth(
          `${moment(startDate, 'MM/YYYY').format('MMMM/YYYY').charAt(0).toUpperCase() 
              + moment(startDate, 'MM/YYYY').format('MMMM/YYYY').slice(1)}`
        );
        console.log('fechei 4');
        getSearchVolume(range, volume.all, true);
        console.log('fechei 5');
        setRange({ ...range });
        setIsCollected(false);
        setDetails({});
        console.log('fechei 6');
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
      console.log('CHANGED 2', changed);
      setRange({});
      setClose(false);
      const range = {
        startDate: moment(), //.subtract(1, 'month'),
        endDate: moment()
      };
      if (changed.rangeAtual) {
        console.log('OPA 1');
        setSearchMonth(
          `${moment(changed.rangeAtual.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(
            changed.rangeAtual.endDate,
            'MM/YYYY'
          ).format('MMM/YYYY')}`
        );
        console.log('OPA 2');
        getSearchVolume(changed.rangeAtual, volume.all, false);
        setRange({ ...changed.rangeAtual });
        console.log('OPA 3');
        setClose(true);
      }
      else {
        console.log('OPA 4');
        const { startDate, endDate } = range;
        setSearchMonth(
          `${moment(startDate, 'MM/YYYY').format('MMMM/YYYY').charAt(0).toUpperCase() 
              + moment(startDate, 'MM/YYYY').format('MMMM/YYYY').slice(1)}`
        );
        getSearchVolume(range, volume.all, true);
        /* setSearchMonth(
          `${moment(range.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(
            range.endDate,
            'MM/YYYY'
          ).format('MMM/YYYY')}`
        );
        console.log('OPA 5');
        getSearchVolume(range, volume.all, false); */
        setRange({ ...range });
        console.log('OPA 6');
      }
      setIsCollected(false);
      setDetails({});
    },
    onChange: ({
      setRange,
      getSearchVolume,
      volume,
      setFilter,
      anoAnterior,
      setRangeAnoAnterior,
      getSearchVolumeAnoAnterior,
      setChanged,
    }) => e => {
      if (size(e) === 2) {
        rangeAnterior = {
          startDate: moment(e.startDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY'),
          endDate: moment(e.endDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY')
        }
        setChanged({ rangeAtual: e, rangeAnoAnterior: rangeAnterior });
        if (anoAnterior) {
          setRangeAnoAnterior(rangeAnterior);
          //getSearchVolumeAnoAnterior(e, volume.all, rangeAnterior, volume.all);
          //console.log('RANGEEEE ATUAL NO ONCHANGE COM ANO ANTERIOR', rangeAnterior);
        }
        else {
          setRange(e);
          //getSearchVolumeAnoAnterior(e, volume.all, e, volume.all);
          //getSearchVolume(e, volume.all, false);
        }
        getSearchVolumeAnoAnterior(e, volume.all, rangeAnterior, volume.all, anoAnterior);
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
      anoAnterior
    }) => e => {
      console.log('TÁ CLICANDO e', e);
      if (!isEmpty(e)) {
        
        if (anoAnterior) {
          if (researched.searchVolumeAnoAnterior.items.length == 0) {
            if (researched.searchVolume.items.length == 0) {
              researched.searchVolumeAnoAnterior.diferenca_percent = '0.00';
            }
            else {
              researched.searchVolumeAnoAnterior.diferenca_percent = '+100';
            }
            
          }
          else {
            
            let mesTouchStart, mesTouchEnd, mesTouchStartAtual, mesTouchEndAtual;
            e.x = parseInt(e.x);
            
            if(researched.searchVolumeAnoAnterior.byIndex[e.x])  {
              
              mesTouchStart = moment(researched.searchVolumeAnoAnterior.byIndex[e.x].start_date).startOf('month').subtract(1, 'year').format('YYYY-MM-DD');
              mesTouchEnd = moment(researched.searchVolumeAnoAnterior.byIndex[e.x].start_date).endOf('month').subtract(1, 'year').format('YYYY-MM-DD');
              mesTouchStartAtual = moment(researched.searchVolume.byIndex[e.x].start_date).startOf('month').format('YYYY-MM-DD');
              mesTouchEndAtual = moment(researched.searchVolume.byIndex[e.x].start_date).endOf('month').format('YYYY-MM-DD');
              const ra = moment.range(mesTouchStart, mesTouchEnd);
              const raAtual = moment.range(mesTouchStartAtual, mesTouchEndAtual);
              
              const filterVolumesAnterior = filter(Object.values(researched.searchVolumeAnoAnterior.byIndex), item => 
                ra.contains(moment(item.start_date))
              );
              
              const filterVolumesAtual = filter(Object.values(researched.searchVolume.byIndex), item =>
                raAtual.contains(moment(item.start_date))
              );
              
              let totalAnterior = reduce(
                map(filterVolumesAnterior, item => item.volume),
                (prev, next) => prev + next
              );
              
              let totalAtual = reduce(
                map(filterVolumesAtual, item => item.volume),
                (prev, next) => prev + next
              );
              
              let diferenca, decimal, percentual;
              if (totalAnterior) {
                diferenca = totalAtual - totalAnterior;
                decimal = diferenca / totalAnterior;
                percentual = decimal * 100;
              }
              else {
                percentual = 0;
              }
              
              if (percentual > 0) {
                researched.searchVolumeAnoAnterior.diferenca_percent = '+'+percentual.toFixed(2);
              }
              else {
                researched.searchVolumeAnoAnterior.diferenca_percent = ''+percentual.toFixed(2);
              }
            }
            else {
              researched.searchVolumeAnoAnterior.diferenca_percent = '0.00';
            }
          }
        }

        console.log('researched.searchVolume.byIndex[e.x]', researched.searchVolume.byIndex[e.x]);
        let volume = researched.searchVolume.byIndex[e.x];
        
        if (volume) {
          setCollected(volume.volume);
        }
        else {
          setCollected(0);
        }
        setIsCollected(true);
        if (!anoAnterior && volume) {
          console.log('volume.start_date', volume);
          setSearchMonth(moment(volume.start_date).format('LL'));
          const details = researched.searchVolume.byIndex[e.x];
          setDetails(details);
        }
        
        setClose(true);
        
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
    close
  }) => {
    console.log('researched TESTE VOLUME ANTERIOR', researched.searchVolume.averageLastMonth);
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
              isCollected={isCollected}
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
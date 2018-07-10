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
import { size, isEmpty } from 'lodash';
import moment from 'moment';
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
import Intl from 'intl';
require('intl/locale-data/jsonp/pt');

const enhance = compose(
  connect(
    ({ volume, researched }) => ({ volume, researched }),
    { getSearchVolume, getSearchVolumeAnoAnterior, closeSearchQuality }
  ),
  withState('range', 'setRange', {
    startDate: moment().subtract(1, 'month'),
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
  withHandlers({
    handlerComparacao: ({
      setAnoAnterior,
      rangeAnoAnterior,
      volume,
      setRangeAnoAnterior,
      getSearchVolumeAnoAnterior,
      range,
      setRange,
      getSearchVolume
    }) => (e) => {
      setAnoAnterior(e);

      setRange(range);
      //getSearchVolume(range, volume.all);
      setRangeAnoAnterior(rangeAnoAnterior);
      getSearchVolumeAnoAnterior(range, volume.all, rangeAnoAnterior, volume.all);
    },
    handlerClose: ({
      setDetails,
      closeSearchQuality,
      setIsCollected,
      setRange,
      setSearchMonth,
      volume,
      setClose
    }) => () => {
      setRange({});
      setClose(false);
      const range = {
        startDate: moment().subtract(1, 'month'),
        endDate: moment()
      };
      setSearchMonth(
        `${moment(range.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(
          range.endDate,
          'MM/YYYY'
        ).format('MMM/YYYY')}`
      );
      getSearchVolume(range, volume.all);
      setRange({ ...range });
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
      getSearchVolumeAnoAnterior
    }) => e => {
      if (size(e) === 2) {
        if (anoAnterior) {
          rangeAnterior = {
            startDate: moment(e.startDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY'),
            endDate: moment(e.endDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY')
          }
          setRangeAnoAnterior(rangeAnterior);
          getSearchVolumeAnoAnterior(e, volume.all, rangeAnterior, volume.all);
          console.log('RANGEEEE ATUAL NO ONCHANGE COM ANO ANTERIOR', rangeAnterior);
        }
        else {
          setRange(e);
          getSearchVolume(e, volume.all);
        }

      }
    },
    onSelect: ({
      researched,
      setDetails,
      setRange,
      setCollected,
      setIsCollected,
      setClose,
      setSearchMonth
    }) => e => {
      if (!isEmpty(e)) {
        const volume = researched.searchVolume.byIndex[e.x];

        setCollected(volume.volume);
        setIsCollected(true);
        setSearchMonth(moment(volume.start_date).format('LL'));

        const details = researched.searchVolume.byIndex[e.x];
        setDetails(details);
        setClose(true);
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      const { startDate, endDate } = this.props.range;
      this.props.setSearchMonth(
        `${moment(startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(
          endDate,
          'MM/YYYY'
        ).format('MMM/YYYY')}`
      );
      this.props.getSearchVolume(this.props.range, this.props.volume.all);
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
    anoAnterior
  }) => {
    console.log('researched TESTE VOLUME ANTERIOR', researched);
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
              close={handlerClose}
              value={searchMonth}
              inverted={false}
              comparacao={handlerComparacao}
            />
          </WrapperHeader>
          <WrapperVolumeAverage>
            <VolumeAverage
              average={researched.searchVolume.averageLastMonth}
              month={researched.searchVolume.currentMonth}
              lastMonth={researched.searchVolume.lastMonth}
              total={researched.searchVolume.total}
              collected={collected}
              isCollected={isCollected}
            />
          </WrapperVolumeAverage>
          <WrapperBar>
            <BarChartLine
              onSelect={onSelect}
              values={researched.searchVolume.items}
              valueFormatter={researched.searchVolume.period}
              valueFormatterIndex={researched.searchVolume.byIndex}
              media={70}
              tipo={"volume"}
              anoAnterior={anoAnterior}
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

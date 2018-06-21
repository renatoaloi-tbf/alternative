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
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import {size, isEmpty} from 'lodash';
import moment from 'moment';
// Local

import {FilterOneDatePicker} from '~/components/FilterOneDatePicker';
import {getSearchVolume, closeSearchQuality} from '~/actions';
import {
  Wrapper,
  TopBar,
  BackButton,
  Icon,
  DrawerButton,
  BarChart,
  ScrollWrapper
} from '~/components/shared';
import {VolumeDetails, VolumeAverage} from '~/components/Volume';

const enhance = compose(
  connect(
    ({volume, researched}) => ({volume, researched}),
    {getSearchVolume, closeSearchQuality}
  ),
  withState('range', 'setRange', {}),
  withState('details', 'setDetails', {}),
  withState('isFilter', 'setFilter', false),
  withState('collected', 'setCollected', 0),
  withState('isCollected', 'setIsCollected', false),
  withHandlers({
    handlerClose: ({
      setFilter,
      setDetails,
      closeSearchQuality,
      setIsCollected
    }) => () => {
      closeSearchQuality();
      setFilter(false);
      setIsCollected(false);
      setDetails({});
    },
    handlerChange: ({setRange, getSearchVolume, volume, setFilter}) => e => {
      setRange(e);
      setFilter(true);
      getSearchVolume(e.value, volume.all);
    },
    onSelect: ({
      researched,
      setDetails,
      setRange,
      setCollected,
      setIsCollected
    }) => e => {
      if (!isEmpty(e)) {
        const volume = researched.searchVolume.byIndex[e.x];
        setCollected(volume.volume);
        setIsCollected(true);
        setRange({label: moment(volume.start_date).format('LL')});
        setDetails(researched.searchVolume.byIndex[e.x]);
      }
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
    isCollected
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
            <FilterOneDatePicker
              onClose={handlerClose}
              value={range.label}
              onPress={handlerChange}
              isFilter={isFilter}
            />
          </WrapperHeader>
          <WrapperVolumeAverage>
            <VolumeAverage
              average={researched.searchVolume.average}
              month={researched.searchVolume.currentMonth}
              total={researched.searchVolume.total}
              collected={collected}
              isCollected={isCollected}
            />
          </WrapperVolumeAverage>
          <WrapperBar>
            <BarChart
              onSelect={onSelect}
              values={researched.searchVolume.items}
              valueFormatter={researched.searchVolume.period}
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

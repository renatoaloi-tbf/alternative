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
import moment from 'moment';
import { FilterCore } from '~/components/FilterCore';
import { size, isEmpty } from 'lodash';
// import {LineChart} from 'react-native-charts-wrapper';
import { processColor } from 'react-native';
// Local
import {
  Wrapper,
  TopBar,
  DrawerButton,
  Icon,
  ScrollWrapper,
  LineChart
} from '~/components/shared';
import { FilterPrice } from '~/components/FilterPrice';
import { PriceDetails } from '~/components/Price';
import { getPrices } from '~/actions';

const enhance = compose(
  connect(
    ({ price, researched }) => ({ price, researched }),
    { getPrices }
  ),
  withState('year', 'setYear', moment().year()),
  withState('range', 'setRange', {
    startDate: moment().subtract(1, 'month'),
    endDate: moment()
  }),
  withState('details', 'setDetails', {}),
  withState('isFilter', 'setFilter', true),
  withState('isClose', 'setClose', false),
  withState('collected', 'setCollected', 0),
  withState('isCollected', 'setIsCollected', false),
  withState('searchMonth', 'setSearchMonth', ''),
  withState('prices', 'setPrices', []),
  withState('periodPrice', 'setPeriodPrice', ({ researched }) => {
    console.log('RESEARCHED PERIOD'. researched);
    return {
      pricePeriod: researched.searchPrice.byIndex[0],
      pricePeriodAfter: researched.searchPrice.byIndex[1]
    };
  }),
  lifecycle({
    async componentWillMount() {
      const { startDate, endDate } = this.props.range;
      console.log('PROPS', this.props);
      this.props.setSearchMonth(
        `${moment().startOf('year').format('MMM/YYYY')} - ${moment().endOf('year').format('MMM/YYYY')}`
      );
      const range = {
        startDate: moment().startOf('year'),
        endDate: moment().endOf('year')
      };
      let pricePeriod, pricePeriodAfter;
      pricePeriod = {y: 0, period: moment().startOf('year').format('MMMM/YYYY')};
      pricePeriodAfter = {y: 0, period: moment().endOf('year').format('MMMM/YYYY')};
      this.props.setPeriodPrice(
        {
          pricePeriod,
          pricePeriodAfter
        }
      )
      console.log('THIS PROPS ITENS', this.props.price)
      await this.props.getPrices(this.props.price.items, range, this.props.year);
    }
  }),

  withHandlers({
    handlersPress: ({
      setYear,
      getPrices,
      price,
      researched,
      setPeriodPrice,
      setSearchMonth,
      range
    }) => e => {
      setSearchMonth(
        `${moment(range.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(range.endDate, 'MM/YYYY').format('MMM/YYYY')}`
      );
      setYear(e);
      console.log('OPA', e);
      getPrices(researched.searchPrice.filter, range, moment().format('YYYY'));
      console.log('Teste researched', Object.values(researched.searchPrice.byIndex));
      let pricePeriod , pricePeriodAfter;

      let myArrayPeriod = Object.values(researched.searchPrice.byIndex);
      for (var i=0; i < myArrayPeriod.length; i++) {
        if (myArrayPeriod[i].period === moment(range.startDate, 'MM/YYYY').format('MMMM/YYYY')) {
            pricePeriod = myArrayPeriod[i];
        }
      }

      let myArrayPeriodAfter = Object.values(researched.searchPrice.byIndex);
      for (var i=0; i < myArrayPeriodAfter.length; i++) {
        if (myArrayPeriodAfter[i].period === moment(range.endDate, 'MM/YYYY').format('MMMM/YYYY')) {
          pricePeriodAfter = myArrayPeriodAfter[i];
        }
      }

      pricePeriod = pricePeriod ? pricePeriod : {y: 0, period: moment(range.startDate, 'MM/YYYY').format('MMMM/YYYY')};
      pricePeriodAfter = pricePeriodAfter ? pricePeriodAfter : { y: 'Previsão', period: moment(range.endDate, 'MM/YYYY').format('MMMM/YYYY') };
      
      setPeriodPrice({
        pricePeriod,
        pricePeriodAfter
      });
    },
    handlerClick: ({ researched, setPeriodPrice, year }) => e => {
      console.log('teste click', researched);
      const pricePeriod = researched.searchPrice.byIndex[e.x] ? researched.searchPrice.byIndex[e.x] : researched.searchPrice.byIndex[0];
      let pricePeriodAfter = researched.searchPrice.byIndex[e.x + 1] ? researched.searchPrice.byIndex[e.x + 1] : researched.searchPrice.byIndex[1];
      const pd = moment().month(e + 1);
      pricePeriodAfter = pricePeriodAfter
        ? pricePeriodAfter
        : { y: 'Previsão', period: pd.format('MMMM/YYYY') };

      setPeriodPrice({
        pricePeriod,
        pricePeriodAfter
      });
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
    onChange: ({ setRange, researched, setPeriodPrice, getPrices }) => e => {
      if (size(e) === 2) {
        setRange(e);
        const range = {
          startDate: e.startDate,
          endDate: e.endDate
        };
        getPrices(researched.searchPrice.filter, range, moment().format('YYYY'));
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
        // setRange({label: });
        const details = researched.searchVolume.byIndex[e.x];
        setDetails(details);
        setClose(true);
      }
    }
  })
);

export const Price = enhance(
  ({
    year,
    setYear,
    handlersPress,
    data,
    xAxis,
    researched,
    handlerClick,
    periodPrice,
    handlerClose,
    range,
    onChange,
    isFilter,
    isClose,
    searchMonth
  }) => {
    console.log('RESEARCH', researched);
    return (
      <Wrapper secondary>
        <TopBar
          title="Preço"
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<DrawerButton />}
        />
        <ScrollWrapperStyle>
          <WrapperHeader>
            <FilterCore
              onClose={handlersPress}
              onChange={onChange}
              isFilter={isFilter}
              isClose={isClose}
              close={handlersPress}
              apply={handlersPress}
              value={searchMonth}
              inverted={false}
            />
            {/* <FilterPrice value={year} onPress={handlersPress} /> */}
          </WrapperHeader>
          <WrapperPriceDetails>
            <PriceDetails
              pricePeriod={periodPrice.pricePeriod}
              pricePeriodAfter={periodPrice.pricePeriodAfter}
            />
          </WrapperPriceDetails>
          <WrapperBar>
            <LineChart
              values={researched.searchPrice.items}
              valueFormatter={researched.searchPrice.period}
              onSelect={handlerClick}
            />
          </WrapperBar>
        </ScrollWrapperStyle>
      </Wrapper>
    );
  }
);

const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;

const WrapperPriceDetails = styled.View`
  height: 90;
  margin-bottom: 2;
`;

const WrapperHeader = styled.View`
  padding-bottom: 2;
`;
const WrapperBar = styled.View`
  height: 350;
  background-color: ${props => props.theme.bg};
  padding-top: 1;
  border-radius: ${props => props.theme.borderRadius};
`;

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
  lifecycle({
    async componentWillMount() {
      const { startDate, endDate } = this.props.range;
      
      //this.props.getSearchVolume(this.props.range, this.props.volume.all);
      await this.props.getPrices(this.props.price.byYear, this.props.year);
    }
  }),
  withState('periodPrice', 'setPeriodPrice', ({ researched }) => {
    return {
      pricePeriod: researched.searchPrice.byIndex[0],
      pricePeriodAfter: researched.searchPrice.byIndex[1]
    };
  }),
  withHandlers({
    handlersPress: ({
      setYear,
      getPrices,
      price,
      researched,
      setPeriodPrice
    }) => e => {
      setYear(e);
      getPrices(price.byYear, e);
      const pricePeriod = researched.searchPrice.byIndex[0];
      let pricePeriodAfter = researched.searchPrice.byIndex[1];
      const pd = moment().month(1);
      pricePeriodAfter = pricePeriodAfter
        ? pricePeriodAfter
        : { y: 'Previsão', period: pd.format('MMMM/YYYY') };
      console.log('OPAAAAAA');
      setPeriodPrice({
        pricePeriod,
        pricePeriodAfter
      });
    },
    handlerClick: ({ researched, setPeriodPrice, year }) => e => {

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
    onChange: ({ setRange, researched, setPeriodPrice }) => e => {

      if (size(e) === 2) {
        setRange(e);
        
        var pricePeriodArray = Object.values(researched.searchPrice.byIndex).filter(function( obj ) {
          return obj.period == moment(e.startDate, 'MM/YYYY').format('MMMM/YYYY');
        });

        var pricePeriodAfterArray = Object.values(researched.searchPrice.byIndex).filter(function( obj ) {
          return obj.period == moment(e.endDate, 'MM/YYYY').format('MMMM/YYYY');
        });
        const pricePeriod = pricePeriodArray[0];
        let pricePeriodAfter = pricePeriodAfterArray[0];
        console.log('Price Period',pricePeriod[0]);
        console.log('Price After', pricePeriodAfter[0]);
        setPeriodPrice({
          pricePeriod,
          pricePeriodAfter
        });
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
              value={range.label}
              onChange={onChange}
              isFilter={isFilter}
              isClose={isClose}
              close={handlersPress}
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

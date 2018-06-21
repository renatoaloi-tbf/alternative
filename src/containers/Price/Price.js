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
import moment from 'moment';
// import {LineChart} from 'react-native-charts-wrapper';
import {processColor} from 'react-native';
// Local
import {
  Wrapper,
  TopBar,
  DrawerButton,
  Icon,
  ScrollWrapper,
  LineChart
} from '~/components/shared';
import {FilterPrice} from '~/components/FilterPrice';
import {PriceDetails} from '~/components/Price';
import {getPrices} from '~/actions';

const enhance = compose(
  connect(
    ({price, researched}) => ({price, researched}),
    {getPrices}
  ),
  withState('year', 'setYear', moment().year()),
  withState('periodPrice', 'setPeriodPrice', ({researched}) => ({
    pricePeriod: researched.searchPrice.byIndex[0],
    pricePeriodAfter: researched.searchPrice.byIndex[1]
  })),
  withHandlers({
    handlersPress: ({setYear, getPrices, price}) => e => {
      setYear(e);
      getPrices(price.byYear, e);
    },
    handlerClick: ({researched, setPeriodPrice, year}) => e => {
      const pricePeriod = researched.searchPrice.byIndex[e.x];
      let pricePeriodAfter = researched.searchPrice.byIndex[e.x + 1];
      const pd = moment().month(e + 1);
      pricePeriodAfter = pricePeriodAfter
        ? pricePeriodAfter
        : {y: 'Previsão', period: pd.format('MMMM/YYYY')};

      setPeriodPrice({
        pricePeriod,
        pricePeriodAfter
      });
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.getPrices(this.props.price.byYear, this.props.year);
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
    periodPrice
  }) => {
    return (
      <Wrapper secondary>
        <TopBar
          title="Price"
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<DrawerButton />}
        />
        <ScrollWrapperStyle>
          <WrapperHeader>
            <FilterPrice value={year} onPress={handlersPress} />
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
`;

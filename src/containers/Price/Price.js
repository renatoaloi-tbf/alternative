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
import { getPrices, getPriceCompareData } from '~/actions';
import { navigatorStyle } from '~/config';

const enhance = compose(
  connect(
    ({ price, researched }) => ({ price, researched }),
    { getPrices, getPriceCompareData }
  ),
  withState('year', 'setYear', moment().year()),
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
  withState('prices', 'setPrices', []),
  withState('changed', 'setChanged', { rangeAtual: null, rangeAnoAnterior: null }),
  withState('anoAnterior', 'setAnoAnterior', false),
  withState('allPrices', 'setAllPrices', null),
  withState('comparacao', 'setComparacao', false),
  withState('inverted', 'setInverted', false),
  withState('isLegenda', 'setIsLegenda', false),
	withState('anoAtualLegenda', 'setAnoAtualLegenda', 2002),
	withState('anoAnteriorLegenda', 'setAnoAnteriorLegenda', 2001),
  withState('periodPrice', 'setPeriodPrice', ({ researched }) => {
    return {
      pricePeriod: researched.searchPrice.byIndex[0],
      pricePeriodAfter: researched.searchPrice.byIndex[1]
    };
  }),
  lifecycle({
    async componentWillMount() {
      const { startDate, endDate } = this.props.range;

      this.props.setSearchMonth(
        `${moment().format('YYYY')}`
      );
      const range = {
        startDate: moment().startOf('month').subtract(11, 'month'),
        endDate: moment().startOf('month')
      };
      let pricePeriod, pricePeriodAfter, valorLtLeiteMesAnterior;

      valorLtLeiteMesAnterior = this.props.price.items.filter(function (item) {
        return item.period == moment().subtract(1, 'month').format('MM/YYYY');
      });

      console.log('PREÇO DO LEITE DO MES ANTERIOR', valorLtLeiteMesAnterior);

      pricePeriod = { y: valorLtLeiteMesAnterior[0].price, period: moment().subtract(1, 'month').format('MMMM/YYYY') };
      pricePeriodAfter = { y: 0, period: moment().format('MMMM/YYYY') };
      this.props.setPeriodPrice(
        {
          pricePeriod,
          pricePeriodAfter
        }
      )

      console.log('ITEM', this.props.price.items);
      console.log('ITEM PERIOD', this.props.price.period);
      await this.props.setAllPrices(this.props.price.items);
      await this.props.getPrices(this.props.price.items, range, this.props.year);
    }
  }),
  withHandlers({
    handlerComparacao: ({
      researched,
      changed,
      setRange,
      range,
      setRangeAnoAnterior,
      setAnoAnterior,
      getPriceCompareData,
      getPrices,
      allPrices,
      setComparacao,
      setIsLegenda,
      setAnoAtualLegenda,
      setAnoAnteriorLegenda,
      price
    }) => e => {
      if ((changed.rangeAtual != null && changed.rangeAnoAnterior != null) && e) {
        setIsLegenda(true);
        setAnoAtualLegenda(moment(changed.rangeAtual.startDate, "MM/YYYY").format('YYYY'));
        setAnoAnteriorLegenda(moment(changed.rangeAnoAnterior.startDate, "MM/YYYY").format('YYYY'));
        setRange(changed.rangeAtual);
        setRangeAnoAnterior(changed.rangeAnoAnterior);
        setAnoAnterior(e);
        getPriceCompareData(
          researched.searchPrice.filter,
          changed.rangeAtual,
          moment(range.startDate, 'MM/YYYY').format('YYYY'),
          changed.rangeAnoAnterior,
          allPrices
        );
        setComparacao(true);
      }
      else {
        setComparacao(false);
        setAnoAnterior(e);
        getPrices(
          price.items,
          changed.rangeAtual,
          moment(range.startDate, 'MM/YYYY').format('YYYY')
        );
      }
    },
    handlersPress: ({
      setYear,
      getPrices,
      price,
      researched,
      setPeriodPrice,
      setSearchMonth,
      range,
      allPrices,
      comparacao,
      changed,
      setFilter,
      setInverted,
      setClose
    }) => e => {
      setFilter(false);
      setInverted(true);
      setClose(true);
      
      setYear(moment().year());
      if (!comparacao) {
        getPrices(researched.searchPrice.filter, range, moment(range.startDate, 'MM/YYYY').format('YYYY'));
        setSearchMonth(
          `${moment(range.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(range.endDate, 'MM/YYYY').format('MMM/YYYY')}`
        );
      }
      else {
        getPriceCompareData(
          researched.searchPrice.filter,
          changed.rangeAtual,
          moment(range.startDate, 'MM/YYYY').format('YYYY'),
          changed.rangeAnoAnterior,
          allPrices
        );
        setSearchMonth(
          `(${moment(range.startDate, 'MM/YYYY').format('MMM/YY')} - ${moment(range.endDate, 'MM/YYYY').format('MMM/YY')})  (${moment(range.startDate, 'MM/YY').subtract(1, 'year').format('MMM/YYYY')} - ${moment(range.endDate, 'MM/YYYY').subtract(1, 'year').format('MMM/YY')})`
        );
      }


      let pricePeriod, pricePeriodAfter;
      let myArrayPeriod = Object.values(researched.searchPrice.byIndex);
      for (var i = 0; i < myArrayPeriod.length; i++) {
        if (myArrayPeriod[i].period === moment(range.startDate, 'MM/YYYY').format('MMMM/YYYY')) {
          pricePeriod = myArrayPeriod[i];
        }
      }

      let myArrayPeriodAfter = Object.values(researched.searchPrice.byIndex);
      for (var i = 0; i < myArrayPeriodAfter.length; i++) {
        if (myArrayPeriodAfter[i].period === moment(range.endDate, 'MM/YYYY').format('MMMM/YYYY')) {
          pricePeriodAfter = myArrayPeriodAfter[i];
        }
      }

      pricePeriod = pricePeriod ? pricePeriod : { y: 0, period: moment(range.startDate, 'MM/YYYY').format('MMMM/YYYY') };
      pricePeriodAfter = pricePeriodAfter ? pricePeriodAfter : { y: 0, period: moment(range.endDate, 'MM/YYYY').format('MMMM/YYYY') };

      /* setPeriodPrice({
        pricePeriod,
        pricePeriodAfter
      }); */


    },
    previsao: ({ navigator }) => e => {
      navigator.push({
        screen: 'PriceMinimum',
        navigatorStyle,

      });
    },
    handlerClick: ({ researched, setPeriodPrice, year }) => e => {
      const pricePeriod = researched.searchPrice.byIndex[e.x] ? researched.searchPrice.byIndex[e.x] : researched.searchPrice.byIndex[0];
      let pricePeriodAfter = researched.searchPrice.byIndex[e.x + 1] ? researched.searchPrice.byIndex[e.x + 1] : researched.searchPrice.byIndex[1];
      const pd = moment().month(e + 1);
      pricePeriodAfter = pricePeriodAfter
        ? pricePeriodAfter
        : { y: 'Previsão', period: pd.format('MMMM/YYYY') };

      /* setPeriodPrice({
        pricePeriod,
        pricePeriodAfter
      }); */
    },
    handlerClose: ({
      setDetails,
      closeSearchQuality,
      setIsCollected,
      setRange,
      setSearchMonth,
      volume,
      setClose,
      setFilter,
      setInverted,
      researched,
      setPeriodPrice,
      allPrices,
      getPrices,
      year,
      setComparacao,
      setIsLegenda
    }) => () => {
      setIsLegenda(false);
      setComparacao(false);
      setFilter(true);
      setInverted(false);
      setRange({});
      setClose(false);
      /* const range = {
        startDate: moment().subtract(1, 'month'),
        endDate: moment()
      };
      setSearchMonth(
        `${moment(range.startDate, 'MM/YYYY').format('MMM/YYYY')} - ${moment(
          range.endDate,
          'MM/YYYY'
        ).format('MMM/YYYY')}`
      ); */

      setSearchMonth(
        `${moment().format('YYYY')}`
      );
      const range = {
        startDate: moment().startOf('month').subtract(11, 'month'),
        endDate: moment().startOf('month')
      };
      /* let pricePeriod, pricePeriodAfter, valorLtLeiteMesAnterior;
      console.log('SEARCH PRICE', researched);
      valorLtLeiteMesAnterior = researched.searchPrice.items.filter(function (item) {
        return item.period == moment().subtract(1, 'month').format('MM/YYYY');
      });

      console.log('PREÇO DO LEITE DO MES ANTERIOR', valorLtLeiteMesAnterior);

      pricePeriod = { y: valorLtLeiteMesAnterior[0].price, period: moment().subtract(1, 'month').format('MMMM/YYYY') };
      pricePeriodAfter = { y: 0, period: moment().format('MMMM/YYYY') };
      setPeriodPrice(
        {
          pricePeriod,
          pricePeriodAfter
        }
      )
 */

      

      setRange({ ...range });
      setIsCollected(false);
      setDetails({});
      console.log('ALL PRICES', allPrices);
      console.log('RANGE', range);
      console.log('ANO', year);
      getPrices(allPrices, range, moment().format('YYYY'));
    },
    onChange: ({
      setRange,
      researched,
      setPeriodPrice,
      getPrices,
      setChanged,
      anoAnterior,
      getPriceCompareData,
      allPrices,
      changed
    }) => e => {
      
      const rangeAnterior = {
        startDate: moment(e.startDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY'),
        endDate: moment(e.endDate, 'MM/YYYY').subtract(1, 'year').format('MM/YYYY')
      };
      if (size(e) === 2) {
        setRange(e);
        if (anoAnterior) {
          getPriceCompareData(
            researched.searchPrice.filter,
            e,
            moment(e.startDate, 'MM/YYYY').format('YYYY'),
            rangeAnterior,
            allPrices
          );
        }
        else {
          getPrices(researched.searchPrice.filter, e, moment().format('YYYY'));         
        }

        let pricePeriod, pricePeriodAfter;
        let myArrayPeriod = Object.values(researched.searchPrice.byIndex);
        for (var i = 0; i < myArrayPeriod.length; i++) {
          if (myArrayPeriod[i].period === moment(e.startDate, 'MM/YYYY').format('MMMM/YYYY')) {
            pricePeriod = myArrayPeriod[i];
          }
        }

        let myArrayPeriodAfter = Object.values(researched.searchPrice.byIndex);
        for (var i = 0; i < myArrayPeriodAfter.length; i++) {
          if (myArrayPeriodAfter[i].period === moment(e.endDate, 'MM/YYYY').format('MMMM/YYYY')) {
            pricePeriodAfter = myArrayPeriodAfter[i];
          }
        }

        pricePeriod = pricePeriod ? pricePeriod : { y: 0, period: moment(e.startDate, 'MM/YYYY').format('MMMM/YYYY') };
        pricePeriodAfter = pricePeriodAfter ? pricePeriodAfter : { y: 0, period: moment(e.endDate, 'MM/YYYY').format('MMMM/YYYY') };
        setChanged({ rangeAtual: e, rangeAnoAnterior: rangeAnterior });

        /* setPeriodPrice({
          pricePeriod,
          pricePeriodAfter
        }); */
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
    searchMonth,
    handlerComparacao,
    comparacao,
    previsao,
    inverted,
    isLegenda,
		anoAtualLegenda,
		anoAnteriorLegenda
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
              close={handlerClose}
              apply={handlersPress}
              value={searchMonth}
              inverted={inverted}
              comparacao={handlerComparacao}
            />
            {/* <FilterPrice value={year} onPress={handlersPress} /> */}
          </WrapperHeader>
          <WrapperPriceDetails>
            <PriceDetails
              pricePeriod={periodPrice.pricePeriod}
              pricePeriodAfter={periodPrice.pricePeriodAfter}
              previsao={previsao}
            />
          </WrapperPriceDetails>
          <WrapperBar>
            <LineChart
              values={researched.searchPrice.items}
              valueFormatter={researched.searchPrice.period}
              onSelect={handlerClick}
              comparacao={comparacao}
              media={researched.searchPrice.media}
              valuesComparacao={researched.searchPriceAnoAnterior.items}
            />
            {isLegenda && (
							<ViewLegenda>
								<ViewBolinha><BolinhaAnoAnterior></BolinhaAnoAnterior><TextBola>{anoAnteriorLegenda}</TextBola></ViewBolinha>
								<ViewBolinha><BolinhaAnoAtual></BolinhaAnoAtual><TextBola>{anoAtualLegenda}</TextBola></ViewBolinha>
							</ViewLegenda>
						)}
          </WrapperBar>
        </ScrollWrapperStyle>
      </Wrapper>
    );
  }
);

const ViewBolinha = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  /* border: 1px solid green; */
  margin-left: 10;
  margin-right: 10;
`;

const ViewLegenda = styled.View`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 10;
  margin-bottom: 10;
`;

const TextBola = styled.Text`
  margin-left: 5;
  font-size: 10;
`;

const BolinhaAnoAnterior = styled.View`
  border-radius: 8;
  height: 15;
  width: 15;
  background-color: #00cdff;
`;

const BolinhaAnoAtual = styled.View`
  border-radius: 8;
  height: 15;
  width: 15;
  background-color: #0093ff;
`;

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
  box-shadow: 1px 0px 3px #0f0f0f;
  elevation: 3;
`;

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
import {reduce, map} from 'lodash';
import numeral from 'numeral';
import {
  Wrapper,
  TopBar,
  Icon,
  DrawerButton,
  ScrollWrapper
} from '~/components/shared';
import {FilterOneDatePicker} from '~/components/FilterOneDatePicker';
import {DocumentationItem} from '~/components/Documentation';
import {getStatements} from '~/actions';
import {isNumber} from '~/utils';

const enhance = compose(
  connect(
    ({statements, researched}) => ({statements, researched}),
    {getStatements}
  ),
  withState('count', 'setCount', ({statements}) => {
    const documetations = statements.byMonth[moment().format('MM/YYYY')];
    if (documetations && documetations.Items.length) {
      const qtaList = map(documetations.Items, item => item.qtd);
      const acount = reduce(qtaList, (previ, next) => previ + next);
      return `${isNumber(acount)} L`;
    }
    return `0 L`;
  }),
  withState('isFilter', 'setIsFilter', true),
  withState('isStatements', 'setStatements', true),
  withState('period', 'setPeriod', moment().format('MMMM [de] YYYY')),
  withState('searchPeriod', 'setSearchPeriod', moment().format('M/YYYY')),
  withHandlers({
    handlerClose: ({
      setIsFilter,
      setStatements,
      setPeriod,
      setSearchPeriod
    }) => () => {
      setIsFilter(true);
      setStatements(false);
      setPeriod(moment().format('MMMM [de] YYYY'));
      setSearchPeriod(moment().format('MMM/YYYY'));
    },
    handlerPress: ({
      setIsFilter,
      setStatements,
      statements,
      setPeriod,
      setSearchPeriod,
      setCount
    }) => e => {
      setIsFilter(false);
      setPeriod(moment(e.label, 'MMM/YYYY').format('MMMM [de] YYYY'));
      const documetations = statements.byMonth[e.value];
      if (documetations) {
        if (documetations && documetations.Items.length) {
          const qtaList = map(documetations.Items, item => item.qtd);
          const acount = reduce(qtaList, (previ, next) => previ + next);
          console.log("Documentation.js - handlePress", acount);
          setCount(`${isNumber(acount)} L`);
        }
        setStatements(true);
        setSearchPeriod(e.value);
      } else {
        setStatements(false);
      }
    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.setIsFilter(true);
      const now = moment().format('MM/YYYY');
      const isData = this.props.statements[now];
      if (isData) {
        this.props.setStatements(true);
        this.props.setSearchPeriod(now);
      } else {
        this.props.setStatements(false);
      }
    }
  })
);

export const Documentation = enhance(
  ({
    isFilter,
    handlerClose,
    handlerPress,
    period,
    isStatements,
    searchPeriod,
    count
  }) => {
    return (
      <Wrapper secondary>
        <TopBar
          title="Documentos"
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<DrawerButton />}
        />
        <ScrollWrapperStyle>
          <WrapperHeader>
            <FilterOneDatePicker
              onClose={handlerClose}
              value={period}
              onPress={handlerPress}
              isFilter={isFilter}
            />
          </WrapperHeader>
          <WrapperItem>
            {isStatements && (
              <DocumentationItem
                month={searchPeriod}
                info
                route="StatementOfPayment"
                icon="file-document-box"
                description="Demonstrativo de pagamento"
                value={count}
              />
            )}
            <DocumentationItem
              light
              route="PriceMinimum"
              icon="currency-usd"
              description="Preço minimo"
            />
            <DocumentationItem
              route="StatementOfPayment"
              success
              icon="onenote"
              description="Nota Fiscal"
            />
            <DocumentationItem
              warning
              route="StatementOfPayment"
              icon="note"
              description="Demonstrativo de imposto de renda"
            />
            <DocumentationItem
              warningLigth
              icon="alert"
              route="In62"
              description="Resultados fora do padrão - IN62"
            />
          </WrapperItem>
        </ScrollWrapperStyle>
      </Wrapper>
    );
  }
);

const WrapperHeader = styled.View`
  padding-bottom: 2;
`;

const ScrollWrapperStyle = ScrollWrapper.extend`
  padding-left: 8;
  padding-right: 8;
  padding-bottom: 8;
`;

const WrapperItem = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${props => props.theme.bg};
  padding-right: 8;
  padding-left: 8;
  padding-bottom: 8;
`;

const WrapperBody = styled.View`
  background-color: ${props => props.theme.bg};
  padding-right: 8;
  padding-left: 8;
`;

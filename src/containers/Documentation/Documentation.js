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
import { reduce, map } from 'lodash';
import numeral from 'numeral';
import {
  Wrapper,
  TopBar,
  Icon,
  DrawerButton,
  ScrollWrapper
} from '~/components/shared';
import { FilterOneDatePicker } from '~/components/FilterOneDatePicker';
import { DocumentationItem } from '~/components/Documentation';
import { getStatements } from '~/actions';
import { isNumber } from '~/utils';
import { BackHandler } from 'react-native';
import { navigatorStyle } from '~/config';
import Intl from 'intl';
require('intl/locale-data/jsonp/pt');

const enhance = compose(
  connect(
    ({ quality, statements, researched }) => ({ statements, researched, quality }),
    { getStatements }
  ),
  withState('count', 'setCount', ({ statements }) => {
    console.log('statements', statements);
    const documentations = statements.byMonth[moment().format('MM/YYYY')];
    console.log('documentations', documentations);
    if (documentations && documentations.items.length) {
      const qtaList = map(documentations.items, item => item.qtd);
      const acount = reduce(qtaList, (previ, next) => previ + next);
      if (isNumber(acount)) {
        return `${new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 0 }).format(acount)} L`;
      }
    }
    return `0 L`;
  }),
  withState('isFilter', 'setIsFilter', true),
  withState('isStatements', 'setStatements', true),
  withState('isIn62Data', 'setIsIn62Data', false),
  withState('period', 'setPeriod', moment().format('MMMM [de] YYYY')),
  withState('searchPeriod', 'setSearchPeriod', moment().format('MM/YYYY')),
  withState('valoresIN62', 'setValoresIN62', []),
  withState('valoresIN62Status', 'setValoresIN62Status', []),
  withState('valoresIN62Padrao', 'setValoresIN62Padrao', []),
  withState('periodoIn62', 'setPeriodoIn62', moment().format('MM/YYYY')),
  withState('backHandler', 'setBackHandler', null),
  withHandlers({
    handlerClose: ({
      setIsFilter,
      setStatements,
      setPeriod,
      setSearchPeriod,
      setIsIn62Data
    }) => () => {
      setIsFilter(true);
      setStatements(false);
      setIsIn62Data(false);
      setPeriod(moment().format('MMMM [de] YYYY'));
      setSearchPeriod(moment().format('MM/YYYY'));
    },
    handlerPress: ({
      setIsFilter,
      setStatements,
      statements,
      setPeriod,
      setSearchPeriod,
      setCount,
      setIsIn62Data,
      quality,
      setValoresIN62Status,
      setValoresIN62,
      setValoresIN62Padrao,
      setPeriodoIn62
    }) => e => {
      setIsFilter(false);
      setPeriod(moment(e.label, 'MMM/YYYY').format('MMMM [de] YYYY'));
      const documetations = statements.byMonth[e.value];
      if (documetations) {
        if (documetations && documetations.items.length) {
          const qtaList = map(documetations.items, item => item.qtd);
          const acount = reduce(qtaList, (previ, next) => previ + next);
          if (__DEV__) console.log("Documentation.js - handlePress", acount);
          if (isNumber(acount)) {
            setCount(`${new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 0 }).format(acount)} L`);
          }
          else {
            setCount(`0 L`);
          }
        }
        setStatements(true);
        setSearchPeriod(e.value);
      } else {
        setStatements(false);
      }

      const standards = quality.milkQualityStandards;
      setValoresIN62Padrao([standards.fat, standards.prot, standards.esd, standards.cbt, standards.est, standards.ccs]);


      let isIn62 = false;
      var valueExt = {};
      let arrayValoresIN62 = [0, 0, 0, 0, 0, 0];
      let arrayValoresIN62Status = [0, 0, 0, 0, 0, 0];
      let periodoIn62 = moment().format('MM/YYYY');

      quality.milkQualityReport.forEach(function (value, key) {
        if (value.period == e.value) {
          periodoIn62 = value.period;
          valueExt = value;
          isIn62 = true;
        }
      });
      if (valueExt.fat && isIn62) {
        arrayValoresIN62 = [valueExt.fat, valueExt.prot, valueExt.esd, valueExt.cbt, valueExt.est, valueExt.ccs];
        arrayValoresIN62Status = [valueExt.fatstatus, valueExt.protstatus, valueExt.esdstatus, valueExt.cbtstatus, valueExt.eststatus, valueExt.ccsstatus];
      }
      else {
        arrayValoresIN62 = [0, 0, 0, 0, 0, 0];
        arrayValoresIN62Status = [0, 0, 0, 0, 0, 0];
      }
      setPeriodoIn62(periodoIn62);
      setIsIn62Data(isIn62);
      setValoresIN62Status(arrayValoresIN62Status);
      setValoresIN62(arrayValoresIN62);

    }
  }),
  lifecycle({
    componentWillMount() {
      this.props.setIsFilter(true);
      const now = moment().format('MM/YYYY');
      const isData = this.props.statements.byMonth[now];


      const standards = this.props.quality.milkQualityStandards;
      this.props.setValoresIN62Padrao([standards.fat, standards.prot, standards.esd, standards.cbt, standards.est, standards.ccs]);


      let isIn62 = false;
      var valueExt = {};
      let arrayValoresIN62 = [0, 0, 0, 0, 0, 0];
      let arrayValoresIN62Status = [0, 0, 0, 0, 0, 0];
      let periodoIn62 = moment().format('MM/YYYY');

      this.props.quality.milkQualityReport.forEach(function (value, key) {
        if (value.period == now) {
          periodoIn62 = value.period;
          isIn62 = true;
          valueExt = value;
        }
      });

      if (valueExt.fat && isIn62) {
        arrayValoresIN62 = [valueExt.fat, valueExt.prot, valueExt.esd, valueExt.cbt, valueExt.est, valueExt.ccs];
        arrayValoresIN62Status = [valueExt.fatstatus, valueExt.protstatus, valueExt.esdstatus, valueExt.cbtstatus, valueExt.eststatus, valueExt.ccsstatus];
        isIn62 = true;
      }
      else {
        arrayValoresIN62 = [0, 0, 0, 0, 0, 0];
        arrayValoresIN62Status = [0, 0, 0, 0, 0, 0];
        isIn62 = false;
      }

      this.props.setPeriodoIn62(periodoIn62);
      this.props.setValoresIN62(arrayValoresIN62);
      this.props.setValoresIN62Status(arrayValoresIN62Status);
      this.props.setIsIn62Data(isIn62);

      if (isData) {
        this.props.setStatements(true);
        this.props.setSearchPeriod(now);
      } else {
        this.props.setStatements(false);
      }
    },
 
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
    count,
    isIn62Data,
    valoresIN62,
    valoresIN62Status,
    valoresIN62Padrao,
    periodoIn62
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
                icon="statement"
                description="Demonstrativo de pagamento"
                value={count}
                valores={valoresIN62}
                valoresStatus={valoresIN62Status}
                valoresPadrao={valoresIN62Padrao}
              />
            )}
            <DocumentationItem
              light
              route="PriceMinimum"
              icon="currency-usd"
              description="Preço mínimo"
              valores={valoresIN62}
              valoresStatus={valoresIN62Status}
              valoresPadrao={valoresIN62Padrao}
            />
            <DocumentationItem
              route="Blank"
              success
              icon="onenote"
              description="Nota Fiscal"
              month={searchPeriod}
              valores={valoresIN62}
              valoresStatus={valoresIN62Status}
              valoresPadrao={valoresIN62Padrao}
            />
            <DocumentationItem
              warning
              route="Blank"
              icon="note"
              description="Demonstrativo de imposto de renda"
              month={searchPeriod}
              valores={valoresIN62}
              valoresStatus={valoresIN62Status}
              valoresPadrao={valoresIN62Padrao}
            />
            {isIn62Data && (
              <DocumentationItem
                warningLigth
                icon="alert"
                route="In62"
                description="Resultados fora do padrão - IN62"
                valores={valoresIN62}
                valoresStatus={valoresIN62Status}
                valoresPadrao={valoresIN62Padrao}
                periodoIn62={periodoIn62}
              />
            )}

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
  border-radius: ${props => props.theme.borderRadius};
`;

const WrapperBody = styled.View`
  background-color: ${props => props.theme.bg};
  padding-right: 8;
  padding-left: 8;
`;

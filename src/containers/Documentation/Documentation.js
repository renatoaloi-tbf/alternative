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

const enhance = compose(
  connect(
    ({statements, researched}) => ({statements, researched}),
    {getStatements}
  ),
  withState('isFilter', 'setIsFilter', false),
  withState('isStatements', 'setStatements', true),
  withState(
    'period',
    'setPeriod',
    moment()
      .locale('pt-br')
      .format('MMM/YYYY')
  ),
  withState(
    'searchPeriod',
    'setSearchPeriod',
    moment()
      .locale('pt-br')
      .format('M/YYYY')
  ),
  withHandlers({
    handlerClose: ({setIsFilter, setStatements, setPeriod}) => () => {
      setIsFilter(false);
      setStatements(false);
      setPeriod(moment().format('MMM/YYYY'));
    },
    handlerPress: ({
      setIsFilter,
      setStatements,
      statements,
      setPeriod,
      setSearchPeriod
    }) => e => {
      setIsFilter(true);
      setPeriod(e.label);
      if (statements.byMonth[e.value]) {
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
    searchPeriod
  }) => {
    return (
      <Wrapper secondary>
        <TopBar
          title="Documentação"
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
              />
            )}
            <DocumentationItem
              light
              route="StatementOfPayment"
              icon="currency-usd"
              description="Preço minimo"
            />
            <DocumentationItem
              route="StatementOfPayment"
              success
              icon="onenote"
              description="Nota"
            />
            <DocumentationItem
              warning
              route="StatementOfPayment"
              icon="note"
              description="Demonstrativo de Imposto"
            />
            <DocumentationItem
              warningLigth
              icon="alert"
              route="StatementOfPayment"
              description="Resultado fora do pradão"
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

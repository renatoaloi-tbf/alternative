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
import {map} from 'lodash';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {ScrollView} from 'react-native';

import { getStatements } from '~/actions';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from 'react-native-table-component';

import {
  Wrapper,
  TopBar,
  Icon,
  BackButton,
  ScrollWrapper,
  Text
} from '~/components/shared';

const enhance = compose(
  connect(
    ({statements, researched}) => ({statements, researched}),
    { getStatements }
  ),
  withState('month', 'setMonth', '12/2017'),
  withState('header', 'setHeader', [
    'Descrição',
    'Qtde',
    'Valor Un.',
    'Valor Total',
    'Taxa',
    'Deduções Ali'
  ]),
  withProps(({statements, month}) => ({
    data: map(statements.byMonth[month].Items, item => {
      var qtd = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 0 }).format(item.qtd);
      // + item.un
      var vl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.vl);
      var total = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total);
      var tax = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(item.tax);
      var ded = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.ded);
      
      
      return [item.desc, qtd + 'L', vl, total, tax, ded];
    })
  })),
  withState('widthArr', 'setWidthArr', [150, 60, 80, 100, 120, 140]),
  lifecycle({
    componentWillMount() {
      this.props.setMonth(moment().subtract(1, 'M').format('MM/YYYY'));
      this.props.getStatements[this.props.month];
    }
  })
);

export const StatementOfPayment = enhance(
  ({statements, month, header, widthArr, data}) => {
    console.log("StatementOfPayment.js - statements", statements);
    console.log("StatementOfPayment.js - month", month);
    return (
      <Wrapper secondary>
        <TopBar
          title={statements.byMonthExt[month]}
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<BackButton />}
        />
        <ScrollWrapperState>
          <WrapperLocalidade>
              <WrapperText>
                <TextLeft size={13}>Localidade</TextLeft>
                <TextRight size={13}>{statements.byMonth[month].loc}</TextRight>
              </WrapperText>
              <WrapperText>
                <TextLeft size={13}>CNPJ/CPF</TextLeft>
                <TextRight size={13}>{statements.byMonth[month].cnpj}</TextRight>
              </WrapperText>
            </WrapperLocalidade>
            <WrapperDetails>
            <WrapperText>
              <TextLeft inverted size={13}>
                Fornecedor
              </TextLeft>
              <TextRight inverted size={13}>
                {statements.byMonth[month].cfop}
              </TextRight>
            </WrapperText>
            <WrapperText>
              <TextLeft inverted size={13}>
                Nome
              </TextLeft>
              <TextRight inverted size={13}>
                {statements.byMonth[month].name}
              </TextRight>
            </WrapperText>
            <WrapperText>
              <TextLeft inverted size={13}>
                CNPJ/CPF 
              </TextLeft>
              <TextRight inverted size={13}>
                {statements.byMonth[month].cpf_cnpj}
              </TextRight>
            </WrapperText>
            <WrapperText>
              <TextLeft inverted size={13}>
                Fazenda
              </TextLeft>
              <TextRight inverted size={13}>
                {statements.byMonth[month].farm_name}
              </TextRight>
            </WrapperText>
            <WrapperText>
              <TextLeft inverted size={13}>
                Município
              </TextLeft>
              <TextRight inverted size={12}>
                {statements.byMonth[month].city}
              </TextRight>
            </WrapperText>
            <WrapperText>
              <TextLeft inverted size={12}>
                Insc.
              </TextLeft>
              <TextRight inverted size={12}>
                {statements.byMonth[month].ie}
              </TextRight>
            </WrapperText>
            <WrapperText>
              <TextLeft inverted size={12}>
                Est.
              </TextLeft>
              <TextRight inverted size={12}>
                {statements.byMonth[month].ie}
              </TextRight>
            </WrapperText>
          </WrapperDetails>
          <WrapperBody>
            <ScrollWrapperState horizontal={true}>
              <View>
                <Table borderStyle={{borderColor: 'transparent'}}>
                  <Row
                    style={{height: 40, backgroundColor: 'transparent'}}
                    data={header}
                    textStyle={{margin: 6}}
                    widthArr={widthArr}
                  />
                </Table>
                <ScrollView style={{marginTop: -1}}>
                  <TableWrapper borderStyle={{borderColor: 'transparent'}}>
                    {map(data, (rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[
                          {height: 40, backgroundColor: '#DEDEDE'},
                          index % 2 && {backgroundColor: '#FFFFFF'}
                        ]}
                        textStyle={{textAlign: 'left', fontWeight: '100', marginLeft: 6}}
                      />
                    ))}
                  </TableWrapper>
                </ScrollView>
              </View>
            </ScrollWrapperState>
          </WrapperBody>
        </ScrollWrapperState>
      </Wrapper>
    );
  }
);

const WrapperBody = styled.View`
  background-color: ${props => props.theme.bg};
  flex: 5;
`;

const WrapperLocalidade = styled.View`
  background-color: #dedede;
  height: 80;
  padding-left: 20;
  padding-right: 20;
  padding-top: 20;
  padding-bottom: 8;
  border-radius: 5;
`;

const WrapperDetails = styled.View`
  margin-top: 8;
  background-color: #0096ff;
  height: 200;
  padding-left: 20;
  padding-right: 20;
  padding-top: 10;
  border-radius: 5;

  justify-content: center;
  align-items: center;
`;

const ScrollWrapperState = ScrollWrapper.extend`
  background-color: ${props => props.theme.bg};
  padding-left: 8;
  padding-right: 8;
  padding-top: 8;
`;

const WrapperText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20;
  padding-right: 20;
  padding-top: 12;
  padding-bottom: 10;
  width: 100%;
`;

const TextLeft = Text.extend`
  position: absolute;
  left: 0;
  width: 30%;
  font-weight: bold;
`;
const TextRight = Text.extend`
  position: absolute;
  right: 0;
  width: 70%;
`;

const View = styled.View``;

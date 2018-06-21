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
    null
  ),
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
      console.log(item);
      return [item.desc, item.qtd, item.un, item.total, item.tax, item.ded];
    })
  })),
  withState('widthArr', 'setWidthArr', [150, 60, 80, 100, 120, 140]),
  lifecycle({
    componentWillMount() {
      this.props.statements[this.props.month];
    }
  })
);

export const StatementOfPayment = enhance(
  ({statements, month, header, widthArr, data}) => {
    console.log(data, statements);
    return (
      <Wrapper secondary>
        <TopBar
          title={`${moment(month, 'MM/YYYY').format('MMM YYYY')}`}
          rightComponent={<Icon inverted name="bell" />}
          leftComponent={<BackButton />}
        />
        <ScrollWrapperState>
          <WrapperLocalidade>
            <WrapperTetx>
              <TextLeft size={13}>Localidade</TextLeft>
              <TextRight size={13}>{statements.byMonth[month].loc}</TextRight>
            </WrapperTetx>
            <WrapperTetx>
              <TextLeft size={13}>CNPF</TextLeft>
              <TextRight size={13}>{statements.byMonth[month].cnpj}</TextRight>
            </WrapperTetx>
          </WrapperLocalidade>
          <WrapperDetails>
            <WrapperTetx>
              <TextLeft inverted size={13}>
                Fornecedor
              </TextLeft>
              <TextRight inverted size={13}>
                {statements.byMonth[month].cfop}
              </TextRight>
            </WrapperTetx>
            <WrapperTetx>
              <TextLeft inverted size={13}>
                Nome
              </TextLeft>
              <TextRight inverted size={13}>
                {statements.byMonth[month].name}
              </TextRight>
            </WrapperTetx>
            <WrapperTetx>
              <TextLeft inverted size={13}>
                CNPJ/CPF
              </TextLeft>
              <TextRight inverted size={13}>
                {statements.byMonth[month].cpf_cnpj}
              </TextRight>
            </WrapperTetx>
            <WrapperTetx>
              <TextLeft inverted size={13}>
                Fazenda
              </TextLeft>
              <TextRight inverted size={13}>
                {statements.byMonth[month].farm_name}
              </TextRight>
            </WrapperTetx>
            <WrapperTetx>
              <TextLeft inverted size={13}>
                Município
              </TextLeft>
              <TextRight inverted size={12}>
                {statements.byMonth[month].city}
              </TextRight>
            </WrapperTetx>
            <WrapperTetx>
              <TextLeft inverted size={12}>
                Insc.
              </TextLeft>
              <TextRight inverted size={12}>
                {statements.byMonth[month].ie}
              </TextRight>
            </WrapperTetx>
            <WrapperTetx>
              <TextLeft inverted size={12}>
                Est.
              </TextLeft>
              <TextRight inverted size={12}>
                {statements.byMonth[month].ie}
              </TextRight>
            </WrapperTetx>
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
                        textStyle={{textAlign: 'center', fontWeight: '100'}}
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

const WrapperTetx = styled.View`
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
`;
const TextRight = Text.extend`
  position: absolute;
  right: 0;
  width: 70%;
`;

const View = styled.View``;

import React from 'react';
import styled from 'styled-components/native';
import {bool, string, func} from 'prop-types';
import {compose, withProps, setPropTypes, defaultProps} from 'recompose';
import {isArray} from 'lodash';
import {Text, Button, DatePicker, Modal} from '~/components/shared';

import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { Icon } from '../../components/shared/Icon';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


import Intl from 'intl';

require( 'intl/locale-data/jsonp/pt' );

const enhance = compose(
  setPropTypes({
    title: string,
    buttonText: string,
    open: func,
    close: func
  }),
  defaultProps({
    visible: false
  }),
  withProps(({close, setActive}) => ({
    onPress: e => {
      if (typeof close === 'function') {
        close(e);
      }
    }
  }))
);

export const DocumentationModal = enhance(
  ({title, onPress, buttonText, open, close, visible}) => {
      const tableData = {
          tableHead: [ 'Análise', 'Leite Fornecido', 'Padrão' ],
          tableRows: [
            [ 'Gordura', '3.94', 'L', '4.0' ],
              [ 'Proteína', '8.52', 'L', '5.0' ],
              [ 'ESD', '8.92', 'L', '-3.0' ],
              [ 'CBT', '392', 'L', '-2.9' ],
              [ 'EST', '12.86', 'L', '-8.4' ],
              [ 'CCS', '278', 'L', '-8.4' ]
          ]
      }
      //alignSelf: 'flex-end'
      const xizinho = <Icon style={{ color: '#6d6d6d' }} size={15} opacity={0.00} name="check" />;
    return (
      <Modal visible={visible} close={close}>
        <WrapperModal>

            <TopBar style={{ borderWidth: 0, borderColor: 'blue', borderStyle: 'solid' }}>
                <Icon size={100} opacity={0.00} color="#FFFFFF" name="alert" style={{ marginTop: 15, marginBottom: 15 }} />
            </TopBar>

            <Body style={{ borderWidth: 0, borderColor: 'green', borderStyle: 'solid' }}>
                <Titulo size={20} weight={'bold'}>Resultados de análises do leite fora das especificações</Titulo>
                <SubTitulo size={14} color={'#777777'}>Parâmetro da IN62 de Janeiro de 2018</SubTitulo>
                <View>
                  <Table borderStyle={{borderWidth: 0 }}>
                    <Row data={tableData.tableHead} style={{ marginBottom: 5 }} textStyle={{ color: '#000000', fontWeight: 'bold' }} />
                    {/* <Rows data={tableData.tableRows} style={{ marginBottom: 5 }} textStyle={{ color: '#777777' }} /> */}
                    {
                      tableData.tableRows.map((rowData, index) => (
                        <TableWrapper key={index} style={{ flexDirection: 'row' }} >
                          {
                            rowData.map((cellData, cellIndex) => {
                              let cell = '';
                              let cellval = 0;
                              switch(cellIndex)
                              {
                                case 1:
                                  cellval = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(cellData);
                                  cell = cellval;
                                  break;
                                case 2:
                                  cell = xizinho;
                                  break;
                                case 3:
                                  cellval = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(cellData > 0 ? cellData : (cellData * -1.0));
                                  cell = (cellData > 0 ? 'Máx ' + cellval : 'Min ' + cellval);
                                  break;
                                default:
                                  cell = cellData;
                              }                              
                              return (<Cell key={cellIndex} data={cell} textStyle={{ color: '#777777', marginTop: 5 }}/>);
                            })
                          }
                        </TableWrapper>
                      ))
                    }
                  </Table>
                </View>
                <Legenda size={14} color={'#777777'}>*(média do leite fornecido)</Legenda>
            </Body>


            <Footer style={{ borderWidth: 0, borderColor: 'purple', borderStyle: 'solid' }}>
              <BotaoEsquerda>
                <Text>Preencher checklist</Text>
              </BotaoEsquerda>
              <BotaoDireita>
                <Text>Estou ciente</Text>
              </BotaoDireita>
            </Footer>

         

          
          

        </WrapperModal>
      </Modal>
    );
  }
);

const BotaoEsquerda = styled.TouchableHighlight`
  padding-top: 10;
  width: 50%;
  border-top-color: #e6e6e6;
  border-top-width: 1;
  height: 50;
  flex-direction: row;
  justify-content: center;
`;

const BotaoDireita = styled.TouchableHighlight`
  padding-top: 10;
  width: 50%;
  border-left-color: #e6e6e6;
  border-left-width: 1;
  border-top-color: #e6e6e6;
  border-top-width: 1;
  height: 50;
  flex-direction: row;
  justify-content: center;
`;

const Footer = styled.View`
  margin-top: 10;
  flex-direction: row;
  justify-content: space-between;
`;

const WrapperModal = styled.View`
  background-color: ${props => props.theme.bg};
  width: 80%;
  height: 90%;
  border-radius: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0px solid red;
`;

const TopBar = styled.View`
  align-items: center;
  background-color: #febd00;
  padding: 0;
  width: 100%;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`;

const Body = styled.View`
  background-color: #ffffff;
  padding-top: 20;
  padding-left: 20;
  padding-right: 20;
`;

const Titulo = Text.extend`
  margin-bottom: 10;
`;

const SubTitulo = Text.extend`
  margin-bottom: 10;
`;

const Legenda = Text.extend`
  margin-top: 10;
  font-style: italic;
`;
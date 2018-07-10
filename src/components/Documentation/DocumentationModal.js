import React from 'react';
import styled from 'styled-components/native';
import {bool, string, func} from 'prop-types';
import {compose, withProps, setPropTypes, defaultProps} from 'recompose';
import {isArray} from 'lodash';
import {Text, Button, DatePicker, Modal} from '~/components/shared';

import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { Icon } from '../../components/shared/Icon';

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
              [ 'Gordura', '3,94', 'check', 'Máx 4,0' ]
          ]
      }
    return (
      <Modal visible={visible} close={close}>
        <WrapperModal>
          <Content>
            <TopBar>
                <Icon size={100} opacity={0.00} color="#FFFFFF" name="alert" style={{ marginTop: 15, marginBottom: 15 }} />
            </TopBar>
            <Body>
                <Titulo size={20} weight={'bold'}>Resultados de análises do leite fora das especificações</Titulo>
                <SubTitulo size={14} color={'#777777'}>Parâmetro da IN62 de Janeiro de 2018</SubTitulo>
            </Body>
          </Content>
        </WrapperModal>
      </Modal>
    );
  }
);

const WrapperModal = styled.View`
  background-color: ${props => props.theme.bg};
  width: 80%;
  height: 90%;
  border-radius: 10;
`;

const Content = styled.View`
  padding: 0;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
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
  padding-top: 30;
  padding-left: 20;
  padding-right: 20;
`;

const Titulo = Text.extend`
  margin-bottom: 10;
`;

const SubTitulo = Text.extend`
  margin-bottom: 10;
`;

const styles = StyleSheet.create({
    modal1: {
        alignItems: 'center',
        backgroundColor: '#ffbd00',
        paddingTop: 20,
        paddingBottom: 20,
        borderTopWidth: 20,
        borderTopColor: 'rgba(52, 52, 52, 0.8)',
        borderRightWidth: 20,
        borderRightColor: 'rgba(52, 52, 52, 0.8)',
        borderLeftWidth: 20,
        borderLeftColor: 'rgba(52, 52, 52, 0.8)'
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    },
    modal2: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 30,
        borderRightWidth: 20,
        borderRightColor: 'rgba(52, 52, 52, 0.8)',
        borderLeftWidth: 20,
        borderLeftColor: 'rgba(52, 52, 52, 0.8)',
        height: 50
    },
    title: {
        fontSize: 15,
        fontWeight: "900",
        color: "#000000"
    },
    subTitle: {
        marginTop: 10,
        fontSize: 10
    },
    gridHead: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    gridHeadTextView: { width: 80, height: 40 },
    gridHeadText: { color: "#000000" },

    gridBody: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    gridBodyTextView: { width: 80, height: 15 },
    styleIcon: { alignSelf: 'flex-end', color: '#6d6d6d' },
    alertColor: { color: '#ffbd00' },

    bottomView: {
        width: '100%',
        height: 190,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 500,
        flexDirection: 'row',
        borderRightWidth: 20,
        borderRightColor: 'rgba(52, 52, 52, 0.8)',
        borderLeftWidth: 20,
        borderLeftColor: 'rgba(52, 52, 52, 0.8)',
        borderBottomWidth: 130,
        borderBottomColor: 'rgba(52, 52, 52, 0.8)'
    },
    buttonStyle: {
        backgroundColor: '#ffffff',
        width: 160,
        borderTopWidth: 1,
        borderColor: '#efefef',
        borderRightWidth: 2,
        alignItems: 'center',
        paddingTop: 15,
    }

})
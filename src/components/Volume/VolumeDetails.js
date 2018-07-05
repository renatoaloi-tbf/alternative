import React from 'react';
import {isEqual} from 'lodash';
import styled from 'styled-components/native';
import {object, func} from 'prop-types';
import {
  compose,
  setPropTypes,
  withProps,
  withHandlers,
  shouldUpdate,
  pure
} from 'recompose';
import moment from 'moment';
import Intl from 'intl';
require( 'intl/locale-data/jsonp/pt' );

// locals
import {getNavigatorContext} from '~/enhancers';
import {Text} from '~/components/shared';

const enhance = compose(
  setPropTypes({
    details: object.isRequired
  }),
  withProps(({onPress, type}) => ({
    onPress: e => {
      if (typeof onPress === 'function') {
        onPress(type);
      }
    }
  }))
);

export const VolumeDetails = enhance(({details}) => {
  return (
    <Wrapper>
      <WrapperTetx>
        <TextLeft size={12} secondary>
          Inicio da Coleta
        </TextLeft>
        <TextRight size={12} secondary>
          {moment(details.searchDate)
            .locale('pt-br')
            .format('DD/MM/YY')}{' '}
          - {details.start_time}
        </TextRight>
      </WrapperTetx>
      <WrapperTetx>
        <TextLeft size={12} secondary>
          Volume Coletado
        </TextLeft>
        <TextRight size={12} secondary>
          {details.volume ? new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(details.volume) : 0} L
        </TextRight>
      </WrapperTetx>
      <WrapperTetx>
        <TextLeft size={12} secondary>
          Temperatura
        </TextLeft>
        <TextRight size={12} secondary>
          {details.temperature ? new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 4 }).format(details.temperature) : 0}
        </TextRight>
      </WrapperTetx>
      <WrapperTetx>
        <TextLeft size={12} secondary>
          Rota
        </TextLeft>
        <TextRight size={12} secondary>
          {details.route ? details.route : ''} {details.ra ? details.ra : ''}
        </TextRight>
      </WrapperTetx>
      <WrapperTetx>
        <TextLeft size={12} secondary>
          Transportadora
        </TextLeft>
        <TextRight size={12} secondary>
          {details.trans ? details.trans : ''}
        </TextRight>
      </WrapperTetx>
      <WrapperTetx>
        <TextLeft size={12} secondary>
          Código Equipamento
        </TextLeft>
        <TextRight size={12} secondary>
          {details.device ? details.device : ''}
        </TextRight>
      </WrapperTetx>
      <WrapperTetx>
        <TextLeft size={12} secondary>
          Motorista
        </TextLeft>
        <TextRight size={12} secondary>
          {details.driver ? details.driver : ''}
        </TextRight>
      </WrapperTetx>
      <WrapperTetx>
        <TextLeft size={12} secondary>
          Total Volume Rejeitado
        </TextLeft>
        <TextRight size={12} secondary>
          {details.rejected_volume ? Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(details.rejected_volume) : 0} L
        </TextRight>
      </WrapperTetx>
    </Wrapper>
  );
});

const Wrapper = styled.View`
  background-color: ${props => props.theme.bg};
  padding-left: 20;
  padding-right: 20;
  padding-top: 20;
  padding-bottom: 20;
`;

const WrapperTetx = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 20;
  padding-right: 20;
  padding-top: 12;
  padding-bottom: 12;
  width: 100%;
`;

const TextLeft = Text.extend`
  position: absolute;
  left: 0;
  width: 50%;
`;
const TextRight = Text.extend`
  position: absolute;
  right: 0;
  width: 50%;
`;

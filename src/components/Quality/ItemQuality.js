import React from 'react';
import { isEqual } from 'lodash';
import styled, { css } from "styled-components/native";
import { object, func, number, bool } from 'prop-types';
import {
  compose,
  setPropTypes,
  withProps,
  withHandlers,
  shouldUpdate,
  pure
} from 'recompose';
import { TouchableOpacity, View } from 'react-native';
// locals
import { getNavigatorContext } from '~/enhancers';
import { Text } from '~/components/shared';

const enhance = compose(
  setPropTypes({
    type: object.isRequired,
    onPress: func.isRequired,
    anoAnterior: bool
  }),
  withProps(({ onPress, type, value }) => ({
    onPress: e => {
      if (typeof onPress === 'function') {
        onPress(type);
      }
    }
  }))
);

export const ItemQuality = enhance(({ type, onPress, anoAnterior }) => {
  let valor, percentual;
  if (type.valor != null) {
    valor = type.valor;
  }
  else {
    valor = 0;
  }
  if (type.percentual != null) {
    if (type.percentual > 0) {
      
      percentual = '+' + type.percentual.toFixed(2);
    }
    else {
      
      percentual = '' + type.percentual.toFixed(2);
    }
    
  }
  else {
    percentual = 0;
  }
  return (
    <Wrapper selected={type.selected}>
      {!type.selected && (
        <WrapperContent onPress={onPress}>
          <WrapperDescription>
            <Text size={12}>{type.name}</Text>
            <DescriptioType secondary size={12}>
              {type.measure}
            </DescriptioType>
          </WrapperDescription>
          {!anoAnterior && (
            <WrapperValue>
              <Text size={30}>{valor}</Text>
            </WrapperValue>
          )}
          {anoAnterior && (
            <WrapperValueAnoAnterior>
              <View>
                <Text size={30}>{percentual}%</Text>
                <Text size={12} secondary>{valor}</Text>
              </View>
            </WrapperValueAnoAnterior>
          )}

        </WrapperContent>
      )}
      {type.selected && (
        <WrapperContentSelected>
          <WrapperDescription>
            <Text inverted size={12}>
              {type.name}
            </Text>
            <DescriptioType inverted size={12}>
              {type.measure}
            </DescriptioType>
          </WrapperDescription>
          {!anoAnterior && (
            <WrapperValue>
              <Text inverted size={30}>{valor}</Text>
            </WrapperValue>
          )}
          {anoAnterior && (
            <WrapperValueAnoAnterior>
              <View>
                <Text inverted size={30}>{percentual}%</Text>
                <Text inverted size={12}>{valor}</Text>
              </View>
            </WrapperValueAnoAnterior>
          )}
        </WrapperContentSelected>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.View`
  background-color: ${props => props.theme.bg};
  ${props =>
    props.selected &&
    css`
    background-color: ${props => props.theme.info};
  `};
  height: 90;
`;

const WrapperContentSelected = styled.View`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
`;

const WrapperContent = styled.TouchableOpacity`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
`;

const WrapperDescription = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 10;
  padding-right: 10;
`;
const WrapperValue = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-top: 10;
`;
const WrapperValueAnoAnterior = styled.View`
  padding-left: 10;
  padding-right: 10;
  padding-top: 0;
`;

const DescriptioType = Text.extend`
  padding-left: 5;
`;

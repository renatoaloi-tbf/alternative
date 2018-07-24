import React from 'react';
import {isEqual} from 'lodash';
import styled from 'styled-components/native';
import {object, func, number} from 'prop-types';
import {
  compose,
  setPropTypes,
  withProps,
  withHandlers,
  shouldUpdate,
  pure
} from 'recompose';
import {TouchableOpacity} from 'react-native';
// locals
import {getNavigatorContext} from '~/enhancers';
import {Text} from '~/components/shared';

const enhance = compose(
  setPropTypes({
    type: object.isRequired,
    onPress: func.isRequired
  }),
  withProps(({onPress, type, value}) => ({
    onPress: e => {
      if (typeof onPress === 'function') {
        onPress(type);
      }
    }
  }))
);

export const ItemQuality = enhance(({type, onPress}) => {
  let valor;
  if (type.valor != null) {
    valor = type.valor;
  }
  else {
    valor = 0;
  }
  return (
    <Wrapper>
      {!type.selected && (
        <WrapperContent onPress={onPress}>
          <WrapperDescription>
            <Text size={12}>{type.name}</Text>
            <DescriptioType secondary size={12}>
              {type.measure}
            </DescriptioType>
          </WrapperDescription>
          <WrapperValue>
            <Text size={30}>{valor}</Text>
          </WrapperValue>
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
          <WrapperValue>
            <Text inverted size={30}>
            {valor}
            </Text>
          </WrapperValue>
        </WrapperContentSelected>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.View`
  background-color: ${props => props.theme.bg};
  height: 90;
`;

const WrapperContentSelected = styled.View`
  background-color: ${props => props.theme.info};
  padding-top: 15;
  padding-bottom: 10;
  padding-left: 15;
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

const DescriptioType = Text.extend`
  padding-left: 5;
`;

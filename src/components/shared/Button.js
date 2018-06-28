import React from 'react';
import styled, {css} from 'styled-components/native';
import {isNumber} from 'lodash';
import {compose, withProps, pure} from 'recompose';
import {TouchableOpacity} from 'react-native';

const enhancedButton = compose(
  withProps(({onPress}) => ({
    onPress: e => {
      e.persist();
      if (typeof onPress === 'function') {
        requestAnimationFrame(() => {
          onPress(e);
        });
      }
    }
  })),
  pure
)(props => {
  return <TouchableOpacity {...props} />;
});

export const Button = styled(enhancedButton)`
  background: ${props => props.background || 'rgba(0,0,0,0)'};
  border-radius: ${props =>
    isNumber(props.borderRadius)
      ? props.borderRadius
      : props.theme.borderRadius};
  align-items: center;
  justify-content: center;
  padding-top: 18;
  padding-bottom: 18;
  padding-right: 10;
  padding-left: 10;
  flex-direction: row;

  ${props =>
    props.success &&
    css`
      background: ${props => props.theme.success};
    `}

  ${props =>
    props.danger &&
    css`
      background: ${props => props.theme.danger};
    `}

  ${props =>
    props.warning &&
    css`
      background: ${props => props.theme.warning};
    `}

  ${props =>
    props.info &&
    css`
      background: ${props => props.theme.info};
    `}
  
  ${props =>
    props.icon &&
    css`
      padding-top: 0;
      padding-right: 0;
      padding-left: 0;
      padding-bottom: 0;
      margin-horizontal: 0;
    `}
`;

import React from 'react';
import styled, {css} from 'styled-components/native';
import {default as NativeIcon} from 'react-native-vector-icons/MaterialCommunityIcons';
import {compose, setPropTypes, withProps, pure} from 'recompose';
import {string} from 'prop-types';
import {Platform} from 'react-native';

const enhancedIcon = compose(
  setPropTypes({
    name: string,
    iosName: string,
    androidName: string
  }),
  withProps(({name, iosName, androidName}) => ({
    name: name || (Platform.OS === 'ios' ? iosName : androidName)
  })),
  pure
)(props => <NativeIcon {...props} />);

export const Icon = styled(enhancedIcon).attrs({
  size: props => props.size || 25,
  color: props => props.color || props.theme.text,
  opacity: props => props.opacity || 1
})`
  color: ${props => props.color};
  opacity: ${props => props.opacity};
  ${props =>
    props.success &&
    css`
      color: ${props => props.theme.success};
    `}

  ${props =>
    props.inverted &&
    css`
      color: ${props => props.theme.textInverted};
    `}

  ${props =>
    props.danger &&
    css`
      color: ${props => props.theme.danger};
    `}

  ${props =>
    props.warning &&
    css`
      color: ${props => props.theme.warning};
    `}

  ${props =>
    props.secondary &&
    css`
      color: ${props => props.theme.textSecondary};
    `}
`;

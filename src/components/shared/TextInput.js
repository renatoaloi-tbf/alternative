import React from 'react';
import {findNodeHandle} from 'react-native';
import styled, {css} from 'styled-components/native';
import TextInputReset from 'react-native-text-input-reset';
import {string} from 'prop-types';
import {TextInput as NativeTextInput, Platform} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {
  compose,
  withProps,
  pure,
  setPropTypes,
  branch,
  renderComponent
} from 'recompose';

const enhancedInput = compose(
  setPropTypes({
    name: string
  }),
  withProps(({innerRef, name, onChangeText, onEndEditing, value}) => {
    const ref = {};

    return {
      handleMaskChangeText: text => {
        if (ref.input && Platform.OS === 'android') {
          TextInputReset.resetKeyboardInput(findNodeHandle(ref.input));
        }

        if (typeof onChangeText === 'function') {
          onChangeText(text, name);
        }
      },
      onChangeText: text => {
        if (typeof onChangeText === 'function') {
          onChangeText(text, name);
        }
      },
      onEndEditing: () => {
        const newValue = value && value.trim();

        if (typeof onEndEditing === 'function') {
          onEndEditing();
        }

        if (typeof onChangeText === 'function') {
          onChangeText(newValue, name);
        }
      },
      registerRef: element => {
        ref.input = element;

        if (typeof innerRef === 'function') {
          innerRef(element);
        }
      }
    };
  }),
  pure
)(props => {
  return <NativeTextInput {...props} ref={props.registerRef} />;
});

export const TextInput = styled(NativeTextInput).attrs({
  autoCapitalize: props => props.autoCapitalize || 'none',
  autoCorrect: props => props.autoCorrect || false,
  underlineColorAndroid: props =>
    props.underlineColorAndroid || 'rgba(0,0,0,0)',
  color: props => props.color || props.theme.text,
  borderRadius: props => props.borderRadius || props.theme.borderRadius,
  size: props => props.size || '15',
  background: props => props.background || props.theme.bgSecondary,
  weight: props => props.weight || 'normal'
})`
  color: ${props => props.color};
  border-radius: ${props => props.borderRadius};
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  background: #FAFAFA;
  height: ${props => (props.multiline ? props.numberOfLines * 20 : 'auto')};
  padding-top: 18;
  padding-bottom: 18;
  padding-left: 10;
  text-align-vertical: ${props => (props.multiline ? 'top' : 'center')};
  padding-right: 10;
  

  ${props =>
    props.danger &&
    css`
      border: 1px solid ${props => props.theme.danger};
    `}

  ${props =>
    props.success &&
    css`
      border: 1px solid ${props => props.theme.success};
    `}

  ${props =>
    props.warning &&
    css`
      border: 1px solid ${props => props.theme.warning};
    `}
`;

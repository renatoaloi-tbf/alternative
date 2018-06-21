import React from 'react';
import styled, {css} from 'styled-components/native';
// import {default as NativeIcon} from 'react-native-vector-icons/Ionicons';
import {compose, setPropTypes, withProps} from 'recompose';
import {string} from 'prop-types';
import {Platform, Image} from 'react-native';

import {ImagesApp} from '~/config';

const enhancedIcon = compose(
  setPropTypes({
    name: string
  }),
  withProps(({name}) => ({
    source: ImagesApp[name]
  }))
)(props => <Image {...props} />);

export const IconUri = styled(enhancedIcon).attrs({
  size: props => props.size || 25,
  color: props => props.color || props.theme.text,
  resizeMethod: 'resize'
})`
  height: ${props => props.size};
  width: ${props => props.size};
`;
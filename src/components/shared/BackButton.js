import React from 'react';
import {bool, string} from 'prop-types';
import {
  compose,
  withHandlers,
  defaultProps,
  setPropTypes,
  pure
} from 'recompose';

// Locals
import {Icon} from './Icon';
import {Button} from './Button';
import {getNavigatorContext} from '../../enhancers';
import {navigatorStyle} from '../../config';

export const BackButton = compose(
  setPropTypes({
    modal: bool,
    icon: string,
    screen: string
  }),
  getNavigatorContext,
  withHandlers({
    onPress: ({navigator, modal, screen}) => () => {
      if (modal && !screen) {
        navigator.dismissModal();
      } else if (screen) {
        navigator.push({
          screen,
          navigatorStyle,
          overrideBackPress: true,
          animationType: 'pop'
        });
      } else {
        navigator.pop();
      }
    }
  }),
  defaultProps({
    icon: 'arrow-left'
  }),
  pure
)(({onPress, icon}) => {
  return (
    <Button icon onPress={onPress}>
      <Icon inverted name={icon} />
    </Button>
  );
});

import React from 'react';
import {bool, string} from 'prop-types';
import {compose, withHandlers, defaultProps, pure} from 'recompose';

// Locals
import {Icon} from './Icon';
import {Button} from './Button';
import {getNavigatorContext} from '~/enhancers';
import {navigatorStyle} from '~/config';

export const DrawerButton = compose(
  getNavigatorContext,
  withHandlers({
    onPress: ({navigator}) => () => {
      navigator.toggleDrawer({
        side: 'left',
        animated: true,
        screen: 'Menu'
      });
    }
  }),
  defaultProps({
    icon: 'menu'
  }),
  pure
)(({onPress, icon}) => {
  return (
    <Button icon onPress={onPress}>
      <Icon inverted name={icon} />
    </Button>
  );
});

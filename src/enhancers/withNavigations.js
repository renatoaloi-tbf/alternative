import {object} from 'prop-types';
import {compose, withProps, lifecycle, pure} from 'recompose';
import {navigatorStyle, drawer} from '~/config';

export const withNavigations = compose(
  lifecycle({
    componentWillMount() {
      console.log(this);
      this.props.navigator.setOnNavigatorEvent(
        this.onNavigatorEvent.bind(this)
      );
    },
    onNavigatorEvent(event) {
      if (event.type === 'DeepLink') {
        this.props.navigator.resetTo({
          screen: event.link,
          navigatorStyle
        });
      }
    }
  }),
  pure
);

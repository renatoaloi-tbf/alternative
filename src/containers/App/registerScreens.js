import {Navigation} from 'react-native-navigation';
import {withNavigatorContext, withNavigations} from '~/enhancers';
import {Login} from '~/containers/Login';
import {Filter} from '~/containers/Filter';
import {Home, HomeRedirect} from '~/containers/Home';
import {Documentation, StatementOfPayment} from '~/containers/Documentation';
import {Price} from '~/containers/Price';
import {Volume} from '~/containers/Volume';
import {Quality} from '~/containers/Quality';
import {Menu} from '~/containers/Menu';
import {NotificationModal} from '~/components/shared';

export const registeredScreens = [];

export const registerScreens = (store, Provider) => {
  registerComponent('Login', Login);
  registerComponent('Filter', Filter);
  registerComponent('Home', Home);
  registerComponent('NotificationModal', NotificationModal);
  registerComponent('Documentation', Documentation);
  registerComponent('Price', Price);
  registerComponent('Volume', Volume);
  registerComponent('Quality', Quality);
  registerComponent('Menu', Menu);
  registerComponent('StatementOfPayment', StatementOfPayment);

  function registerComponent(name, screen) {
    // TODO: remover isso
    const screenComponent =
      name !== 'Login' || name !== 'Menu'
        ? withNavigations(withNavigatorContext(screen))
        : withNavigatorContext(screen);
    Navigation.registerComponent(name, () => screenComponent, store, Provider);
    registeredScreens.push(name);
  }
};

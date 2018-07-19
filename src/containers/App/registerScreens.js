import {Navigation} from 'react-native-navigation';
import {withNavigatorContext, withNavigations} from '~/enhancers';
import {Login} from '~/containers/Login';
import {Filter} from '~/containers/Filter';
import {Home, HomeRedirect} from '~/containers/Home';
import {Documentation, StatementOfPayment, Blank} from '~/containers/Documentation';
import {Price} from '~/containers/Price';
import {Volume} from '~/containers/Volume';
import {Quality} from '~/containers/Quality';
import {Menu} from '~/containers/Menu';
import {NotificationModal} from '~/components/shared';
import In62 from '../In62/In62';
import {PriceMinimum} from '../PriceMinimum/PriceMinimum';
import UseTerms from '../UseTerms/UseTerms';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import GraficoTeste from '../GraficoTeste/GraficoTeste';
import {Password} from '~/containers/Password';

export const registeredScreens = [];

export const registerScreens = (store, Provider) => {
  registerComponent('Login', Login);
  registerComponent('Filter', Filter);
  registerComponent('Home', Home);
  registerComponent('NotificationModal', NotificationModal);
  registerComponent('Documentation', Documentation);
  registerComponent('Blank', Blank);
  registerComponent('Price', Price);
  registerComponent('Volume', Volume);
  registerComponent('Quality', Quality);
  registerComponent('Menu', Menu);
  registerComponent('StatementOfPayment', StatementOfPayment);
  registerComponent('In62', In62);
  registerComponent('PriceMinimum', PriceMinimum);
  registerComponent('UseTerms', UseTerms);
  registerComponent('PrivacyPolicy', PrivacyPolicy);
  registerComponent('GraficoTeste', GraficoTeste)
  registerComponent('Password', Password);

  function registerComponent(name, screen) {
    // TODO: remover isso

    Navigation.registerComponent(
      name,
      () => withNavigatorContext(screen),
      store,
      Provider
    );
    registeredScreens.push(name);
  }
};

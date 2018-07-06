import {Navigation} from 'react-native-navigation';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/pt-br';
//local
import {
    registerScreens,
    registerScreenVisibilityListener
} from './registerScreens';
import {Provider} from './Provider';
import {configureStore} from '~/store/configureStore';
import {navigatorStyle} from '~/config';
import {fetchLogger} from '~/utils';

export class AppSrc {
    constructor() {
        const {store, persistor} = configureStore();
        this.store = store;
        registerScreens(this.store, Provider(persistor));
        this.startApp();
        fetchLogger();
        moment.locale('pt-BR');
    }

    startApp() {
        Navigation.startSingleScreenApp({
            screen: {
<<<<<<< HEAD
                screen: `${ __DEV__ ? 'Login' : 'Login' }`,
=======
                screen: `${ __DEV__ ? 'Documentation' : 'Login' }`,
>>>>>>> 58095086766da190bbd38ae72cad50bbf9a63cf0
                navigatorStyle: navigatorStyle
            }
        });
        // Navigation.startSingleScreenApp({
        //     screen: {
        //         screen: 'Home',
        //         navigatorStyle: navigatorStyle
        //     },
        //     drawer: {
        //         left: {
        //             screen: 'Menu'
        //         },
        //         style: {
        //             drawerShadow: false,
        //             contentOverlayColor: 'rgba(0,0,0,0.20)'
        //         },
        //         type: 'MMDrawer',
        //         animationType: 'parallax'
        //     }
        // });
    }
}

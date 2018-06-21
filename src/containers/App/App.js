import {Navigation} from 'react-native-navigation';
import moment from 'moment/min/moment-with-locales';

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
        const Store = configureStore();
        // console.log(persistor);
        this.store = Store.store;
        registerScreens(this.store, Provider);
        this.startApp();
        fetchLogger();
        moment.locale('es');
    }

    startApp() {
        // console.log(this.store.getState());
        // Navigation.startSingleScreenApp({
        //     screen: {
        //         screen: 'Login',
        //         navigatorStyle: navigatorStyle
        //     }
        // });
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Home',
                navigatorStyle: navigatorStyle
            },
            drawer: {
                left: {
                    screen: 'Menu'
                },
                style: {
                    drawerShadow: false,
                    contentOverlayColor: 'rgba(0,0,0,0.20)'
                },
                type: 'MMDrawer',
                animationType: 'parallax'
            }
        });
    }
}

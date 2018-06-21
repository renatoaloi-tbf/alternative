import {
    Navigation
} from 'react-native-navigation';

//local
import {navigatorStyle} from '../../config';

export class HomeRedirect {
    constructor() {
        this.startApp();
    }

    startApp() {
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
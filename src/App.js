/**
 * @flow
 */
import { Navigation } from 'react-native-navigation';

import { registerScreens } from "./screens/";
registerScreens();


Navigation.startSingleScreenApp({
    screen: {
        screen: 'MainScreen',
        title: 'Hoteles',
        navigatorStyle: {
            navBarBackgroundColor: '#df6800',
            navBarTextColor: '#ffffff',
            navBarSubtitleTextColor: '#ffffff',
            navBarButtonColor: '#ffffff',
            statusBarTextColorScheme: 'light',
            statusBarColor: '#df6800',
            navBarTitleTextCentered: true,
        }
    }
});



import { Navigation } from 'react-native-navigation';

// screens
import MainScreen from './Main';
import HotelScreen from './HotelDetail';

// Register screens
export const registerScreens = () => {
    Navigation.registerComponent('MainScreen', () => MainScreen);
    Navigation.registerComponent('HotelScreen', () => HotelScreen);
};


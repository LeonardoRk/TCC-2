/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {Navigation} from 'react-native-navigation';
import App from './src/App';
//import {name as appName} from './app.json';

//AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent(`App`, () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "App"
      }
    }
  });
});

/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {Navigation} from 'react-native-navigation';
import App from './src/App';
import ModoDeJogo from './src/screens/ModoDeJogo';
import ModoClassificacao from './src/screens/ModoClassificacao';
import ModoResolucao from './src/screens/ModoResolucao';
import Mundo from './src/screens/Mundo';
import Mail from './src/Mail';

//AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent('App', () => App);
Navigation.registerComponent('ModoDeJogo', () => ModoDeJogo);
Navigation.registerComponent('ModoClassificacao', () => ModoClassificacao);
Navigation.registerComponent('ModoResolucao', () => ModoResolucao);
Navigation.registerComponent('Mundo', () => Mundo );
Navigation.registerComponent('Mail', () => Mail);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
          stack: {
            id: 'App',
            children: [
              {
                component: {
                  name: 'ModoResolucao',
                },
                component: {
                  name: 'App',
                  id:'App'
                },
                component:{
                  name:'Mundo',
                  id:'Mundo'
                },
                component: {
                  name: 'ModoClassificacao',
                  id:'ModoClassificacao'
                },
                component: {
                  name: 'ModoDeJogo',
                  id: 'ModoDeJogo'
                },
                component: {
                  name: 'Mail',
                  id: 'Mail'
                },
              }
            ],
          }
        }
      })
});

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    animate: false,
  }
});

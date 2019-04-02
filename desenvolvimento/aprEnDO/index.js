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
import MundoResolucao from './src/screens/MundoResolucao';

//AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent('App', () => App);
Navigation.registerComponent('ModoDeJogo', () => ModoDeJogo);
Navigation.registerComponent('ModoClassificacao', () => ModoClassificacao);
Navigation.registerComponent('ModoResolucao', () => ModoResolucao);
Navigation.registerComponent('Mundo', () => Mundo );
Navigation.registerComponent('Mail', () => Mail);
Navigation.registerComponent('MundoResolucao', ()=> MundoResolucao);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
          stack: {
            id: 'App',
            children: [
              {
                component: {
                  name: 'App',
                  id:'App'
                },
                component:{
                  name:'MundoResolucao',
                  id:'MundoResolucao'
                },
                component:{
                  name:'Mundo',
                  id:'Mundo'
                },
                component: {
                  name: 'ModoResolucao',
                  id: 'ModoResolucao'
                },
                component: {
                  name: 'ModoClassificacao',
                  id:'ModoClassificacao'
                },
                component: {
                  name: 'ModoDeJogo',
                  id: 'ModoDeJogo'
                },
              }
            ],
          }
        },
        layout: {
          orientation: ['portrait']
        }
      })
});

Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    drawBehind: true,
    animate: false,
  },
  layout: {
    orientation: ['portrait']
  }
});

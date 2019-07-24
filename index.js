/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import Landing from './landing';
import {ImageEditor} from './imageEditor';

Navigation.registerComponent('example.FirstScreen', () => App);
Navigation.registerComponent('example.Landing', () => Landing);
Navigation.registerComponent('example.ImageEditor', () => ImageEditor);
Navigation.registerComponent('navigation.playground.WelcomeScreen', () => App);
Navigation.setDefaultOptions({
  topBar: {
    visible: false,
    height: 0,
  },

  statusBar: {
    style: 'light',
    drawBehind: false,
  },
  layout: {
    orientation: ['portrait'],
  },
  bottomTabs: {
    titleDisplayMode: 'alwaysHide',
    animate: true,
  },

  blurOnUnmount: true,
  bottomTab: {
    textColor: 'gray',
    selectedTextColor: '#3C5898',
    iconColor: 'gray',
    selectedIconColor: '#3C5898',
  },
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'example.FirstScreen',
            },
          },
        ],
      },
    },
  });
});

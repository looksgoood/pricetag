/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import App from './App';
import Login from './login';
import Landing from './landing';
import UserProfile from './userProfile';

import ImageUpload from './imageUpload';
import CustomizeImage from './customizeImage';
import ImageEditor from './imageEditor';
import PrintOrPost from './printOrPost';
import SharePost from './sharePost';
import PrintBrandTag from './printBrandTag';

Navigation.registerComponent('example.FirstScreen', () => App);
Navigation.registerComponent('example.Login', () => Login);
Navigation.registerComponent('example.Landing', () => Landing);
Navigation.registerComponent('example.UserProfile', () => UserProfile);
Navigation.registerComponent('example.ImageUpload', () => ImageUpload);
Navigation.registerComponent('example.CustomizeImage', () => CustomizeImage);
Navigation.registerComponent('example.ImageEditor', () => ImageEditor);
Navigation.registerComponent('example.PrintOrPost', () => PrintOrPost);
Navigation.registerComponent('example.SharePost', () => SharePost);
Navigation.registerComponent('example.PrintBrandTag', () => PrintBrandTag);

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

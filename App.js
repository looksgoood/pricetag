import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import ImageIntent from 'react-native-image-intent';
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  state = {
    isLoaded: false,
    isLogin: false,
    imageUris:[],
  };

  _loadLogin = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'example.Login',
        passProps: {
          images: this.state.imageUris,
        },
      },
    });
  }

  _loadLanding = () => {
    Navigation.setStackRoot(this.props.componentId,
    {
      component: {
          name: 'example.Landing',
          passProps: {
            images: this.state.images,
            token: this.state.token,
          },
        },
        options: {
          animations: {
            setStackRoot: {
              enabled: true,
            },
          },
        },
    });
  };

  checkLogin = async () => {
    const value = await AsyncStorage.getItem('@haetae:profile');
    if (value !== null) {
      console.log("login data exist");
      this.checkImageIntent(true);
    }
    else {
      this.checkImageIntent(false);
    }
  }

  checkImageIntent = (loginFlag) => {
    ImageIntent.getImageIntentUrl().then((url) => {
      this.setState({
        isLogin: loginFlag,
        isLoaded: true,
        imageUris: url,
      });
    }).catch(e => {
      setTimeout(() => {
        this.setState({
          isLogin: loginFlag,
          isLoaded: true,
        });
      }, 1000);
    });
  }

  componentDidMount() {
    this.checkLogin();
  }

  render() {
    const splash = (
      <ImageBackground
        style={styles.splashBackground}
        resizeMode="cover"
        source={require('./assets/haetae_Splash_BG.jpg')}>
      </ImageBackground>
    );
    return (
      <View style={styles.container}>
        {this.state.isLoaded ? 
          this.state.isLogin ? this._loadLanding() :
            this._loadLogin() :
          splash}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  splashBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  splashImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 6,
  },
  splashLogo: {
    backgroundColor: 'transparent',
    width: 190,
    height: 62,
  },
  splashLine: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: 260,
  },
  splashText: {
    marginTop: 3,
    color: 'white',
    fontWeight: 'bold',
  },
});

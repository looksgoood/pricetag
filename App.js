import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import ImageIntent from 'react-native-image-intent';
import { Navigation } from 'react-native-navigation';

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

  componentDidMount() {
    ImageIntent.getImageIntentUrl().then((url) => {
      this.setState({
        isLoaded: true,
        imageUris: url,
      });
    }).catch(e => {
      setTimeout(() => {
        this.setState({
          isLoaded: true,
        });
      }, 1000);
    });

  }

  render() {
    const splash = (
      <ImageBackground
        style={styles.splashBackground}
        resizeMode="cover"
        source={require('./assets/haetae_Splash_BG.png')}>
        <View style={styles.splashImageContainer}>
          <Image
            style={styles.splashLogo}
            source={require('./assets/HaeTae_Logo_white.png')}
            resizeMode="contain"
          />
          <View style={styles.splashLine}/>
          <Text style={styles.splashText}>SAMSUNG</Text>
          <Text style={styles.splashText}>OneWeek in Thailand</Text>
        </View>
      </ImageBackground>
    );
    return (
      <View style={styles.container}>
        {this.state.isLoaded ? this._loadLogin() : splash}
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

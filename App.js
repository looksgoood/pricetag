import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Image, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class App extends Component {
  state = {
    isLoaded: false,
  };

  _loadLanding = () => {
    Navigation.setStackRoot(this.props.componentId,
      {
      component: {
            name: 'example.Landing',
          },
      }
    );
  };

  componentDidMount() {
    // TODO
    setTimeout(() => {
      this.setState({
        isLoaded: true,
      });
    }, 1000);
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
        </View>
      </ImageBackground>
    );
    return (
      <View style={styles.container}>
        {this.state.isLoaded ? this._loadLanding() : splash}
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
  splashButtonContainer: {
    flex: 1,
  },
  splashLogo: {
    backgroundColor: 'transparent',
    width: 120,
    height: 90,
  },
});

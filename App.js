import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Image, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class App extends Component {
  _loadLanding = () => {
    Navigation.setStackRoot(this.props.componentId,
      {
      component: {
            name: 'example.Landing',
          },
      }
    );
  };

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
         <Button
          style={styles.splashButtonContainer}
          onPress={this._loadLanding}
          title="Let's go"
          color="#841584"
        />
      </ImageBackground>
    );
    return (
      <View style={styles.container}>
        {splash}
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

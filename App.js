import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Button } from 'react-native';
import Landing from './landing';

const temp_image = './assets/photo.jpg'

export default class App extends Component {
  state = {
    isLoaded: false
  };

  onPressButton = () => {
    this.setState({
      isLoaded: true
    })
  };

  render() {
    const splash = (
      <ImageBackground
        style={styles.splashBackground} 
        resizeMode='cover' 
        source={require('./assets/haetae_Splash_BG.png')}>
        <View style={styles.splashImageContainer}>
          <Image
            style={styles.splashLogo}
            source={require('./assets/HaeTae_Logo_white.png')}
            resizeMode='contain'
          />
        </View>
        <Button
          style={styles.splashButtonContainer}
          onPress={this.onPressButton}
          title="Let's go"
          color="#841584"
        />
      </ImageBackground>
    );

    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
        {isLoaded ? <Landing path={temp_image}/> : splash}
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
    flexWrap: 'wrap'
  },
  splashBackground: {
    width: '100%',
    height: '100%',
    flex: 1 
  },
  splashImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 6
  },
  splashButtonContainer: {
    flex: 1
  },
  splashLogo: {
    backgroundColor: "transparent",
    width: 120,
    height: 90
  }
});

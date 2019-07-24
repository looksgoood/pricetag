import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';


class Landing extends Component  {
  constructor(props) {
    super(props);
  }
  onPressLogo = () => {
    console.log('onPressLogo pressed');
  }

  onPressMore = () => {
    console.log('onPressMore pressed');
  }

  onPressOnReady = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'example.ImageEditor',
      },
    });
  }

  render = () => {
    const title = (
      <View style={styles.title}>
        <TouchableOpacity style={styles.logoButton} onPress={this.onPressLogo}>
          <Image
            style={styles.logoButton}
            source={require('./assets/HaeTae_Logo_Black.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton} onPress={this.onPressMore}>
          <Text style={styles.moreButton}>...</Text>
        </TouchableOpacity>
      </View>
    );

    const content = (
      <View style={styles.content}>
        <Image
          style={styles.profileImage}
          source={require('./assets/hmong_profile.png')}
          resizeMode="contain"
        />
        <Text style={styles.contentTitle}>Hello Jenny,</Text>
        <Text style={styles.contentDescription}>
          Group, customive your photos in your own way.
        </Text>
        <View style={styles.onReadyContainer}>
          <TouchableOpacity style={styles.onReadyTitle} onPress={this.onPressOnReady}>
            <Text style={styles.onReadyTitle}>On Ready ></Text>
          </TouchableOpacity>
          <Text style={styles.onReadyDescription}>
            5 photos are ready to upload
          </Text>
          <View style={styles.onReadyImageContainer}>
            <Image
              style={styles.onReadyImage}
              source={require('./assets/photo.jpg')}  // TODO
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    );
    console.log(this.props);
    return (
    <View style={styles.container}>
      {title}
      {content}
    </View>);
  }
}

export default Landing;



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoButton: {
    width: 100,
    height: '100%',
  },
  moreButton: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    fontSize: 36,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  content: {
    flex: 9,
  },
  profileImage: {
    marginTop: 20,
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  contentTitle: {
    marginLeft: 10,
    fontSize: 34,
    fontWeight: 'bold',
  },
  contentDescription: {
    marginLeft: 10,
    fontSize: 18,
    width: 250,
  },
  onReadyContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
    backgroundColor: '#221147',
    borderRadius: 30,
    height: 300,
    justifyContent: 'flex-start',
  },
  onReadyTitle: {
    fontSize: 40,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  onReadyDescription: {
    marginLeft: 15,
    fontSize: 18,
    color: 'white',
  },
  onReadyImage: {
    marginTop: 10,
    marginLeft: 10,
    width: 100,
    height: 100,
    borderRadius: 30,
    overflow: 'hidden',
  },
});

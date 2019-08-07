import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';

let screanItemSize = (Dimensions.get('window').width - 150) / 3;

class Landing extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      profileImage: '',
      name: '',
    };
  }

  state = {
    profileImage: '',
    name: '',
  }

  chooseFile = () => {
    // TODO: multi file select logic
    ImagePicker.openPicker({
      multiple: true,
      forceJpg: true,
    }).then(images => {
      this.setState({
        images: images.map(i => {
          return i.path.substring(7);
        }),
      });
    }).catch(e => alert(e));
  }

  onPressLogo = () => {
    console.log('onPressLogo pressed');
  }

  onPressMore = () => {
    console.log('onPressMore pressed');
  }

  onPressProfile = () => {
    console.log('onPressProfile pressed');
    Navigation.push(this.props.componentId, {
      component: {
        name: 'example.UserProfile',
      },
    });
  }

  onPressOnReady = () => {
    if (this.state.images.length > 0) {
      Navigation.push(this.props.componentId, {
        component: {
          name: 'example.ImageUpload',
          passProps: {
            images: this.state.images,
          },
        },
      });
    } else {
      this.chooseFile();
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@haetae:userInfo');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  checkUserInfo = async () => {
    console.log("checkUserInfo");
    const value = await AsyncStorage.getItem('@haetae:userInfo');
    if (value !== null) {
      console.log("userInfo data exist");
      let stateDB = JSON.parse(value);
      console.log('storeDB: ' + stateDB);
      this.setState({
        profileImage: stateDB.profileImage,
        name: stateDB.firstName,
      });
    }
    else {
      console.log("user info data not exist");
      this.setState({
        profileImage: '',
        name: 'Anonymous',
      });
      this.onPressProfile();
    }
  }

  componentDidMount() {
    this.checkUserInfo();
  }

  render = () => {
    const title = (
      <View style={styles.title}>
        <TouchableOpacity onPress={this.onPressLogo}>
          <Image
            style={styles.logoButton}
            source={require('./assets/HaeTae_Logo_Black.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressMore}>
          <Text style={styles.moreButton}>...</Text>
        </TouchableOpacity>
      </View>
    );
      
    const addImages = (
      <View style={styles.cardContainer}>
        <Text style={styles.onReadyTitle}>
          Make your{'\n'}
          Brand Identity{'\n'}
          to your product
        </Text>
        <Text style={styles.onReadyDescription}>
          A Simple Process to design your own{'\n'}
          Branding to your product
        </Text>
        <View style={styles.moreContainer}>
          <TouchableOpacity
            onPress={this.onPressOnReady}
          >
            <Image
              style={styles.plusButton}
              source={require('./assets/more_button.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );

    const onReadyImages = (
      <View style={styles.cardContainer}>
        <Text style={styles.onReadyTitle}>On Ready</Text>
        <Text style={styles.onReadyDescription}>
          {this.state.images.length} photos are ready to upload
        </Text>
        <TouchableOpacity 
          style={styles.startButton}
          onPress = {this.onPressOnReady}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
        <View style={styles.onReadyImageContainer}>
          {this.state.images.map((curImage, i) => {
            console.log('image: ', curImage);
            return (
              <Image
                style={styles.onReadyImage}
                source={{uri: 'file://' + curImage}}
                resizeMode="cover"
                key={i}
              />
            );
          })}
        </View>
      </View>
    );

    const content = (
      <View style={styles.content}>
        <ScrollView>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity 
              style={styles.profileImage}
              onPress={this.onPressProfile}>
              {this.state.profileImage.length > 0 ?
                <Image
                  style={styles.profileImage}
                  source={{uri: this.state.profileImage.indexOf("://") == -1 ?
                            'file://' + this.state.profileImage :
                            this.state.profileImage}}
                  resizeMode="cover"
                /> :
                <Image
                  style={styles.profileImage}
                  source={require('./assets/dummy_face.png')}
                  resizeMode="cover"
                />
              }
            </TouchableOpacity>
          </View>
          <Text style={styles.contentTitle}>Hello</Text>
          <Text style={styles.contentTitle}>{this.state.name}</Text>
          <View style={styles.empty}/>
          {this.state.images.length > 0 ? onReadyImages : addImages}
          <View style={styles.copyright}>
            <Text style={styles.copyrightTitle}>
              Copyright © 2019 by Samsung OneWeek
            </Text>
            <Text style={styles.copyrightDesc}>
              All rights reserved. This book or any portion thereof{'\n'}
              may not be reproduced or used in any manner whatsoever{'\n'}
              without the express written permission of the publisher
            </Text>
          </View>
        </ScrollView>
      </View>
    );
    
    return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={require('./assets/Haetae_Landing_BG.jpg')}>
        {title}
        {content}
      </ImageBackground>
    </View>);
  }
}

const propTypes = {
    images: PropTypes.array,
};

const defaultProps = {
    images: [],
};

Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  title: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoButton: {
    marginLeft: 10,
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
    transform: [{
      rotate: '90deg',
    }],
  },
  content: {
    flex: 1,
  },
  profileImageContainer: {
    marginTop: 20,
    paddingLeft: 8,
  },
  profileImage: {
    height: 67,
    width: 67,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  contentTitle: {
    marginLeft: 10,
    fontSize: 34,
    fontWeight: 'bold',
  },
  contentDescription: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    width: 250,
  },
  empty: {
    height: 100,
  },
  cardContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 40,
    minHeight: 240,
    justifyContent: 'flex-start',
  },
  onReadyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  onReadyDescription: {
    marginTop: 12,
    fontSize: 15,
    color: 'black',
  },
  onReadyImageContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  onReadyImage: {
    marginTop: 10,
    marginRight: 15,
    width: screanItemSize,
    height: screanItemSize,
    borderRadius: 10,
    overflow: 'hidden',
  },
  startButton: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'black',
    borderRadius: 30,
    overflow: 'hidden',
    width: 100,
    height: 28,
  },
  startButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
  },
  moreContainer: {
    marginTop: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    marginTop: 10,
    width: 65,
    height: 65,
  },
  copyright: {
    marginTop: 30,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  copyrightTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  copyrightDesc: {
    fontSize: 10,
    textAlign: 'center',
  },
});

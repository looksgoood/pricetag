import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';

class Landing extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
    };
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

    const IntentImages = (
      <View>
        <Text style={styles.onReadyDescription}>
          {this.state.images.length} photos are ready to upload
        </Text>
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
        <Image
          style={styles.profileImage}
          source={require('./assets/hmong_profile.png')}
          resizeMode="contain"
        />
        <Text style={styles.contentTitle}>Hello</Text>
        <Text style={styles.contentTitle}> Thatthiang,</Text>
        <Text style={styles.contentDescription}>
          You've got 1 task to proceed
        </Text>
        <LinearGradient style={styles.onReadyContainer} colors={['#fcfcfc', '#cccccc']}>
          <TouchableOpacity style={styles.onReadyTitle} onPress={this.onPressOnReady}>
            {
              this.state.images.length > 0 ?
                <Text style={styles.onReadyTitle}>On Ready ></Text> :
                <Text style={styles.onReadyTitle}>Upload Start ></Text>
            }
            
          </TouchableOpacity>
          {this.state.images.length > 0 ? IntentImages : null}
        </LinearGradient>
      </View>
    );
    return (
    <View style={styles.container}>
      {title}
      {content}
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
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    width: 250,
  },
  onReadyContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    backgroundColor: 'white',
    borderRadius: 30,
    height: 300,
    justifyContent: 'flex-start',
    shadowColor: "black",
    elevation: 3,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  onReadyTitle: {
    fontSize: 30,
    marginTop: 12,
    marginLeft: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  onReadyDescription: {
    marginLeft: 30,
    marginTop: 12,
    fontSize: 18,
    color: 'black',
  },
  onReadyImageContainer: {
    marginLeft: 10,
    marginRight: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  onReadyImage: {
    marginTop: 10,
    marginLeft: 10,
    width: 80,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

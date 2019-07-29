import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';

class ImageUpload extends Component  {
  constructor(props) {
    super(props);
  }

  onPressBack = () => {
    Navigation.popToRoot(this.props.componentId);
  }

  onPressNext = () => {
    console.log('onPressNext');
  }

  onPressImage = (image) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'example.ImageEditor',
        passProps: {
          image: image,
        },
      },
    });
    console.log('onPressImage => ', image);
  }

  onPressApplyAll = () => {
    console.log('onPressApplyAll');
  }

  render = () => {
    const title = (
      <View style={styles.title}>
        <TouchableOpacity style={styles.backButton} onPress={this.onPressBack}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={this.onPressNext}>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>
    );

    const content = (
      <View style={styles.content}>
      <Text style={styles.contentTitle}>Customize</Text>
      <Text style={styles.contentTitle}>Your Image</Text>
        <Text style={styles.contentDescription}>
          {this.props.images.length} photos are selected to upload
        </Text>
        <Text style={styles.contentDescription2}>
          You can attach your own decription, watermark, brand logo, signature and so on.
        </Text>
        <View style={styles.imageContainer}>
          {this.props.images.map((curImage, i) => {
            console.log('image: ', curImage);
            return (
              <TouchableOpacity
                style={styles.imageItem}
                onPress={() => this.onPressImage(curImage)}
                key={i}
              >
                <Image
                  style={styles.imageItem}
                  source={{uri: 'file://' + curImage}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.applyAllButtonContainer}>
        <TouchableOpacity 
          style={styles.applyAllButton}
          onPress = {this.onPressApplyAll}
        >
          <Text style={styles.applyAllButtonText}>Apply to All</Text>
        </TouchableOpacity>
        </View>
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
    images: ['./assets/photo.jpg'],
};

ImageUpload.propTypes = propTypes;
ImageUpload.defaultProps = defaultProps;

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
    width: 50,
    fontSize: 24,
    height: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  nextButton: {
    width: 100,
    height: '100%',
    alignItems: 'center',
    fontSize: 24,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'blue',
  },
  content: {
    flex: 9,
  },
  contentTitle: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentDescription: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 18,
    width: 250,
  },
  contentDescription2: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 18,
    width: 280,
  },
  imageContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageItem: {
    marginTop: 10,
    width: 120,
    height: 120,
  },
  applyAllButtonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyAllButton: {
    backgroundColor: '#14A1DC',
    borderRadius: 30,
    overflow: 'hidden',
    width: 205,
    height: 28,
  },
  applyAllButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});

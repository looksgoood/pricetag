import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import {setI18nConfig, translate } from './contentGetters';
let screanItemSize = (Dimensions.get('window').width - 50) / 3;

class ImageUpload extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      selectedImage: props.images[0],
    };
    setI18nConfig();
  }

  state = {
    images: [],
    selectedImage: '',
  }

  onPressBack = () => {
    Navigation.popToRoot(this.props.componentId);
  }

  onPressNext = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'example.CustomizeImage',
        passProps: {
          images: this.state.images,
        },
      },
    });
  }

  onPressImage = (image) => {
    this.setState({
      selectedImage: image,
    })
  }

  onPressMore = () => {
    ImagePicker.openPicker({
      multiple: true,
      forceJpg: true,
    }).then(newImages => {
      this.setState({
        images: this.state.images.concat(newImages.map(i => {
          return i.path.substring(7);
        })),
      });
    }).catch(e => alert(e));
  }

  render = () => {
    const title = (
      <View style={styles.title}>
        <TouchableOpacity style={styles.backButton} onPress={this.onPressBack}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={this.onPressNext}>
          <Text style={styles.nextButton}>{translate("next")}</Text>
        </TouchableOpacity>
      </View>
    );

    const view = (
      <View style={styles.view}>
        <Image
          style={styles.viewItem}
          source={{uri: 'file://' + this.state.selectedImage}}
          resizeMode="cover"
        />
      </View>
    )

    const content = (
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.contentTitle}>{translate("upload-image-para-1")}</Text>
          <Text style={styles.contentDescription}>
            {this.state.images.length} {translate("upload-image-para-2")}
          </Text>
          <View style={styles.imageContainer}>
            {this.state.images.map((curImage, i) => {
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
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={styles.moreItem}
              onPress={this.onPressMore}
            >
              <Image
                style={styles.moreButton}
                source={require('./assets/more_button.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  return (
    <View style={styles.container}>
      {title}
      {view}
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
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
    width: 50,
    height: '100%',
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  nextButton: {
    width: 100,
    height: '100%',
    alignItems: 'center',
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'black',
  },
  view: {
    flex: 1,
  },
  viewItem: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
  },
  contentTitle: {
    marginLeft: 15,
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentDescription: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 18,
    width: 250,
  },
  imageContainer: {
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 30,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageItem: {
    marginTop: 10,
    marginRight: 10,
    width: screanItemSize,
    height: screanItemSize,
    borderRadius: 20,
  },
  moreItem: {
    marginTop: 10,
    marginRight: 10,
    width: screanItemSize,
    height: screanItemSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    marginTop: 10,
    width: 65,
    height: 65,
  },
});

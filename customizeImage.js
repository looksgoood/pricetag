import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';

let screanItemSize = (Dimensions.get('window').width - 50) / 3;

class CustomizeImage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      selectedImage: props.images[0],
    };
  }

  state = {
    images: [],
    selectedImage: '',
  }

  onPressBack = () => {
    Navigation.pop(this.props.componentId);
  }

  onPressNext = () => {
    console.log('onPressNext');
    Navigation.showModal({
      component: {
        name: 'example.PrintOrPost',
        passProps: {
          images: this.state.images,
        },
        options: {
          screenBackgroundColor: 'transparent',
          modalPresentationStyle: 'overCurrentContext',
          topBar: {
            visible: false,
            drawBehind: true,
          },
        },
      },
    });
  }

  onPressEdit = (image) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'example.ImageEditor',
        passProps: {
          image: image,
        },
      },
    });
  }

  onPressImage = (image) => {
    this.setState({
      selectedImage: image,
    })
  }

  onPressApplyAll = () => {
    console.log('onPressApplyAll');
  }

  render = () => {
    const title = (
      <View style={styles.title}>
        <TouchableOpacity style={styles.backButton} onPress={this.onPressBack}>
          <Text style={styles.backButton}>{'Previous'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={this.onPressNext}>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>
    );

    const view = (
      <View style={styles.view}>
        <ImageBackground
          style={styles.viewItem}
          source={{uri: 'file://' + this.state.selectedImage}}
          resizeMode="cover"
        >
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => this.onPressEdit(this.state.selectedImage)}
          >
            <Image
              style={styles.editButton}
              source={require('./assets/edit_button.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )

    const content = (
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.contentTitle}>Customize{'\n'}Your Image</Text>
          <Text style={styles.contentDescription}>
            You can attach your own{'\n'}decription, watermark, brand logo,{'\n'}signature and so on.
          </Text>
          <View style={styles.imageContainer}>
            {this.props.images.map((curImage, i) => {
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
          </View>
          <View style={styles.applyAllButtonContainer}>
            <TouchableOpacity 
              style={styles.applyAllButton}
              onPress = {this.onPressApplyAll}
            >
              <Text style={styles.applyAllButtonText}>Apply to All</Text>
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

CustomizeImage.propTypes = propTypes;
CustomizeImage.defaultProps = defaultProps;

export default CustomizeImage;

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
    marginLeft: 15,
    marginRight: 10,
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
    flexDirection: 'row-reverse',
    alignItems: 'flex-end'
  },
  editButton: {
    marginBottom: 10,
    marginRight: 10,
    width: 65,
    height: 65,
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
  applyAllButtonContainer: {
    marginTop: 30,
    marginBottom: 30,
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

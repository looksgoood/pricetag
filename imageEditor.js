
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import { RNPhotoEditor } from 'react-native-photo-editor';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';

class ImageEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: props.image
    };
  }

  _onPress(path) {
    let filter;
    if (Platform.OS === 'ios') {
      filter = [];
    } else if (Platform.OS === 'android') {
      filter = '.*\\.*';
    }

    RNPhotoEditor.Edit({
      path: path,
      stickers: [
        'sticker0',
        'sticker1',
        'sticker2',
        'sticker3',
        'sticker4',
        'sticker5',
        'sticker6',
        'sticker7',
        'sticker8',
        'sticker9',
        'sticker10',
      ],
      hiddenControls: [],
      colors: undefined,
      onDone: () => {
        console.log('on done');
        Navigation.pop(this.props.componentId);
      },
      onCancel: () => {
        console.log('on cancel');
        Navigation.pop(this.props.componentId);
      },
    });
  }

  render() {
    return (<View style={styles.container}>
      {
        this._onPress(this.state.image)
      }
    </View>);
  }
}

const propTypes = {
    image: PropTypes.string,
};

const defaultProps = {
    image: './assets/photo.jpg',
};

ImageEditor.propTypes = propTypes;
ImageEditor.defaultProps = defaultProps;

export default ImageEditor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Button,
  StyleSheet,
  View,
} from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import { RNPhotoEditor } from 'react-native-photo-editor';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { Navigation } from 'react-native-navigation';

import photo from './assets/photo.jpg';

export class ImageEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      isSelected: false,
    };
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
          isSelected:true,
        });

      }

    });
  };
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

  componentDidMount() {

    let photoPath = RNFS.DocumentDirectoryPath + '/photo.jpg';
    console.log(photoPath);
    let binaryFile = resolveAssetSource(photo);
    console.log(binaryFile);
    RNFetchBlob.config({ fileCache: true })
      .fetch('GET', binaryFile.uri)
      .then(resp => {
        RNFS.moveFile(resp.path(), photoPath)
          .then(success => {
            console.log('FILE WRITTEN!');
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  render() {
    const { isSelected } = this.state;
    console.log('state = ', this.state);
    return (<View style={styles.container}>
      {
        isSelected ? this._onPress(this.state.filePath.path) : this.chooseFile()
      }
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { Navigation } from 'react-native-navigation';

class ImageSeletor extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        // TODO: multi file selec logic
        let filePath = response.path
        Navigation.push(this.props.componentId, {
          component: {
            name: 'example.ImageUpload',
            passProps: {
              images: [
                  filePath,
              ],
            },
          },
        });
      }
    });
  };

  render() {
    return (<View style={styles.container}>
      {
        this.chooseFile()
      }
    </View>);
  }
}

export default ImageSeletor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

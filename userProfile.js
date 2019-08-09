import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import {setI18nConfig, translate } from './contentGetters'
import PropTypes from 'prop-types';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

class UserProfile extends Component  {
  constructor(props) {
    super(props);
    setI18nConfig();

    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.onSubmitName = this.onSubmitName.bind(this);
    this.onSubmitThaiName = this.onSubmitThaiName.bind(this);
    this.onSubmitPhoneNumber = this.onSubmitPhoneNumber.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitWebsite = this.onSubmitWebsite.bind(this);
    this.onSubmitGood = this.onSubmitGood.bind(this);

    this.nameRef = this.updateRef.bind(this, 'name');
    this.thaiNameRef = this.updateRef.bind(this, 'thaiName');
    this.phoneNumberRef = this.updateRef.bind(this, 'phoneNumber');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.websiteRef = this.updateRef.bind(this, 'website');
    this.goodRef = this.updateRef.bind(this, 'good');
  }

  state = {
    profileImage: '',
    name: '',
    thaiName: '',
    phoneNumber: '',
    email: '',
    website: '',
    good: '',
  }

  onPressBack = () => {
    Navigation.popToRoot(this.props.componentId);
  }

  onSaveDB = async () => {
    await AsyncStorage.setItem("@haetae:userInfo", JSON.stringify(this.state));
    Navigation.setStackRoot(this.props.componentId,
    {
      component: {
          name: 'example.Landing',
        },
        options: {
          animations: {
            setStackRoot: {
              enabled: true,
            },
          },
        },
    });
    Navigation.popToRoot(this.props.componentId);
  }

  onPressSave = () => {
    console.log("onPressSave");

    let errors = {};

    ['name', 'phoneNumber', 'email']
      .forEach((name) => {
        let value = this[name].value();

        if (!value) {
          errors[name] = 'Should not be empty';
        }
      }
    );

    if (this.state.profileImage.length == 0) {
      errors["profileImage"] = 'Should not be empty';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      this.onSaveDB();
    }
  }

  onPressEdit = () => {
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

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let filePath = response.path
        console.log('filePath: ' + filePath);
        this.setState({
          profileImage: filePath,
        });
      }
    });
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let name in errors) {
      let ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({ errors });
  }

  onChangeText = (text) => {
    ['name', 'thaiName', 'phoneNumber', 'email', 'website', 'good']
    .map((name) => ({ name, ref: this[name] }))
    .forEach(({ name, ref }) => {
      if (ref && ref.isFocused()) {
        this.setState({ [name]: text });
      }
    });
  }

  onSubmitName() {
    this.thaiName.focus();
  }

  onSubmitThaiName() {
    this.phoneNumber.focus();
  }

  onSubmitPhoneNumber() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.website.focus();
  }

  onSubmitWebsite() {
    this.good.focus();
  }

  onSubmitGood() {
    console.log("onSubmitGood");
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  checkDB = async () => {
    const value = await AsyncStorage.getItem('@haetae:userInfo');
    if (value !== null) {
      console.log("user info data exist");      
      let stateDB = JSON.parse(value);
      this.setState({
        profileImage: stateDB.profileImage,
        name: stateDB.name,
        thaiName: stateDB.thaiName,
        phoneNumber: stateDB.phoneNumber,
        email: stateDB.email,
        website: stateDB.website,
        good: stateDB.good,
      });
    } else {
      console.log("user info data not exist");
      const value = await AsyncStorage.getItem('@haetae:profile');
      if (value !== null) {
        console.log("profile data exist");      
        let profileDB = JSON.parse(value);
        this.setState({
          profileImage: profileDB.profileUri,
          name: profileDB.name,
          email: profileDB.email,
        });
      }
    }
  }

  componentDidMount() {
    this.checkDB();
  }

  render = () => {
    let { errors = {}, ...data } = this.state;
    let { firstname = 'name', lastname = 'house' } = data;
    let defaultEmail = `${firstname}@${lastname}.com`
      .replace(/\s+/g, '_')
      .toLowerCase();

    const title = (
      <View style={styles.title}>
        <TouchableOpacity style={styles.backButton} onPress={this.onPressBack}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={this.onPressSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
    );

    const content = (
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.contentHeader}>
            {translate("profile-para-1")}
          </Text>
          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
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
              <View style={styles.editButtonContainer}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress = {this.onPressEdit}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.textContainer}>
              <TextField
                ref={this.nameRef}
                value={data.name}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitName}
                returnKeyType='next'
                label={translate("profile-para-2")}
                error={errors.name}
              />
              <TextField
                ref={this.thaiNameRef}
                value={data.thaiName}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitThaiName}
                returnKeyType='next'
                label={translate("profile-para-3")}
                error={errors.thaiName}
              />
              <TextField
                ref={this.phoneNumberRef}
                value={data.phoneNumber}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPhoneNumber}
                returnKeyType='next'
                label={translate("profile-para-4")}
                error={errors.phoneNumber}
              />
              <TextField
                ref={this.emailRef}
                value={data.email}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                returnKeyType='next'
                label={translate("profile-para-5")}
                error={errors.email}
              />
              <TextField
                ref={this.websiteRef}
                value={data.website}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitWebsite}
                returnKeyType='next'
                label={translate("profile-para-6")}
                error={errors.website}
              />
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.goodTitle}>{translate("profile-para-8")}</Text>
            <Text style={styles.goodContent}>
              {translate("profile-para-9")}
            </Text>
            <TextField
              ref={this.goodRef}
              value={data.good}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitGood}
              returnKeyType='next'
              label={translate("profile-para-10")}
              error={errors.good}
            />
          </View>
        </ScrollView>
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

UserProfile.propTypes = propTypes;
UserProfile.defaultProps = defaultProps;

export default UserProfile;

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
  saveButton: {
    width: 100,
    height: '100%',
    alignItems: 'center',
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'black',
  },
  content: {
    marginBottom: 10,
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  contentHeader: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'SamsungOne',
    width: 163,
  },
  profileContainer: {
    marginBottom: 30,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
  },
  profileImage: {
    marginTop: 20,
    height: 67,
    width: 67,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  editButtonContainer: {
    marginTop: 15,
  },
  editButton: {
    backgroundColor: '#C4C4C4',
    borderRadius: 30,
    overflow: 'hidden',
    width: 67,
    height: 28,
  },
  editButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  textContainer: {
    flex: 3,
  },
  itemContainer: {
    marginBottom: 30,
  },
  goodTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  goodContent: {
    marginTop: 5,
    fontSize: 12,
  },
});

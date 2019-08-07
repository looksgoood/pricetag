import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TextField } from 'react-native-material-textfield';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';

import { YellowBox } from 'react-native';

let screanItemSize = (Dimensions.get('window').width - 30) / 3;

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Module RCTImageLoader requires',
]);

class UserProfile extends Component  {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onSubmitNickName = this.onSubmitNickName.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitGood = this.onSubmitGood.bind(this);
    this.onSubmitStory = this.onSubmitStory.bind(this);

    this.firstNameRef = this.updateRef.bind(this, 'firstName');
    this.lastNameRef = this.updateRef.bind(this, 'lastName');
    this.nickNameRef = this.updateRef.bind(this, 'nickName');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.goodRef = this.updateRef.bind(this, 'good');
    this.storyRef = this.updateRef.bind(this, 'story');
  }

  state = {
    profileImage: '',
    firstName: '',
    lastName: '',
    nickName: '',
    email: '',
    good: '',
    story: '',
  }

  onPressBack = () => {
    Navigation.popToRoot(this.props.componentId);
  }

  onSaveDB = async () => {
    await AsyncStorage.setItem("@haetae:userInfo", JSON.stringify(this.state));
    Navigation.popToRoot(this.props.componentId);
  }

  onPressSave = () => {
    console.log("onPressSave");

    let errors = {};

    ['firstName', 'lastName', 'email']
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
    ['firstName', 'lastName', 'nickName', 'email', 'good', 'story']
    .map((name) => ({ name, ref: this[name] }))
    .forEach(({ name, ref }) => {
      if (ref && ref.isFocused()) {
        this.setState({ [name]: text });
      }
    });
  }

  onSubmitFirstName() {
    this.lastName.focus();
  }

  onSubmitLastName() {
    this.nickName.focus();
  }

  onSubmitNickName() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.good.focus();
  }

  onSubmitGood() {
    console.log("onSubmitGood");
  }

  onSubmitStory() {
    console.log("onSubmitStory");
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
        firstName: stateDB.firstName,
        lastName: stateDB.lastName,
        nickName: stateDB.nickName,
        email: stateDB.email,
        good: stateDB.good,
        story: stateDB.story,
      });
    } else {
      console.log("user info data not exist");
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
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={this.onPressSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>
    );

    const content = (
      <View style={styles.content}>
        <ScrollView>
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
                  source={require('./assets/hmong_profile.png')}
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
                ref={this.firstNameRef}
                value={data.firstName}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitFirstName}
                returnKeyType='next'
                label='First Name'
                error={errors.firstName}
              />
              <TextField
                ref={this.lastNameRef}
                value={data.lastName}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitLastName}
                returnKeyType='next'
                label='Last Name'
                error={errors.lastName}
              />
              <TextField
                ref={this.nickNameRef}
                value={data.nickName}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitNickName}
                returnKeyType='next'
                label='How do I call you?'
                error={errors.nickName}
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
                label='Email'
                error={errors.email}
              />
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.goodTitle}>You're good at</Text>
            <Text style={styles.goodContent}>
              Just name a simple few words to describe{'\n'}
              what you’re good at. (100 word max.)
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
              label='e.g. Traditional Weagving, Wood Carving'
              error={errors.good}
            />
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.goodTitle}>Tell us about your story</Text>
            <Text style={styles.goodContent}>
              Just name a simple few words to describe{'\n'}
              what you’re good at.(....??????)
            </Text>
            <TextInput
              ref={this.storyRef}
              value={data.story}
              editable = {true}
              multiline = {true}
              numberOfLines = {4}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitStory}
              blurOnSubmit={false}
              style={styles.storyText}
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
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
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
  storyText: {
    borderColor: 'gray',
    borderWidth: 0.5,
    textAlignVertical: 'top',
  },
});

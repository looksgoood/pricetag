import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TextField } from 'react-native-material-textfield';
import PropTypes from 'prop-types';

let screanItemSize = (Dimensions.get('window').width - 30) / 3;

class UserProfile extends Component  {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);

    this.firstNameRef = this.updateRef.bind(this, 'firstName');
    this.lastNameRef = this.updateRef.bind(this, 'lastName');
    this.nickNameRef = this.updateRef.bind(this, 'nickName');
    this.emailRef = this.updateRef.bind(this, 'email');
    this.goodRef = this.updateRef.bind(this, 'good');
    this.storyRef = this.updateRef.bind(this, 'story');
  }

  state = {
    firstName: '',
    lastName: '',
    nickName: '',
    email: '',
    good: '',
    story: '',
    logo: '',
  }

  onPressBack = () => {
    Navigation.popToRoot(this.props.componentId);
  }

  onPressSave = () => {
    console.log("onPressSave");
  }

  onPressEdit = () => {
    console.log("onPressEdit");
  }

  onPressLogo = () => {
    console.log("onPressEdit");
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

  onSubmitNastName() {
    this.nickName.focus();
  }

  onSubmitNickName() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.good.focus();
  }

  onSubmitGood() {
    this.story.focus();
  }

  onSubmitStory() {
    console.log("onSubmitStory");
  }

  updateRef(name, ref) {
    this[name] = ref;
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
              <Image
                style={styles.profileImage}
                source={require('./assets/hmong_profile.png')}
                resizeMode="contain"
              />
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
            <TextField
              ref={this.storyRef}
              value={data.story}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onFocus={this.onFocus}
              onChangeText={this.onChangeText}
              onSubmitEditing={this.onSubmitStory}
              returnKeyType='next'
              multiline={true}
              lineWidth={0}
              error={errors.story}
              containerStyle={styles.storyContainer}
              style={styles.storyText}
            />
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.goodTitle}>Upload your logo for editing</Text>
            <Text style={styles.goodContent}>
              Just name a simple few words to describe{'\n'}
              what you’re good at.(....??????)
            </Text>
            <View style={styles.logoImageContainer}>
              <TouchableOpacity
                onPress={this.onPressLogo()}
              >
                {this.state.logo.length > 0 ? 
                <Image
                  style={styles.logoImageItem}
                  source={{uri: 'file://' + this.state.logo}}
                  resizeMode="cover"
                /> :
                <Image
                  style={styles.moreButton}
                  source={require('./assets/more_button.png')}
                  resizeMode="contain"
                />}
              </TouchableOpacity>
            </View>
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
  storyContainer: {
    marginTop: 15,
    marginBottom: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    minHeight: 116,
  },
  storyText: {
    textAlignVertical: 'top',
  },
  logoImageContainer: {
    height: 103,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
  },
  logoImageItem: {
    width: screanItemSize,
    height: screanItemSize,
    borderRadius: 20,
  },
  moreItem: {
    width: screanItemSize,
    height: screanItemSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    width: 65,
    height: 65,
  },
});

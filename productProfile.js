import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TextField } from 'react-native-material-textfield';
import {setI18nConfig, translate } from './contentGetters';
import PropTypes from 'prop-types';

class ProductProfile extends Component  {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.onSubmitProductName = this.onSubmitProductName.bind(this);
    this.onSubmitProductThaiName = this.onSubmitProductThaiName.bind(this);
    this.onSubmitStory = this.onSubmitStory.bind(this);

    this.productNameRef = this.updateRef.bind(this, 'productName');
    this.productThaiNameRef = this.updateRef.bind(this, 'productThaiName');
    this.storyRef = this.updateRef.bind(this, 'story');
    setI18nConfig();
  }

  state = {
    productName: '',
    productThaiName: '',
    story: '',
  }

  onPressBack = () => {
    console.log("onPressBack");
    Navigation.pop(this.props.componentId);
  }

  onPressNext = () => {
    let { errors = {} } = this.state;

    console.log("Print out as a brand tag");
    
    // if (!this.state.productName) {
    //   errors['productName'] = 'Should not be empty';
    // }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    Navigation.push(this.props.componentId, {
      component: {
        name: 'example.PrintBrandTag',
      },
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
    ['productName', 'productThaiName', 'story']
    .map((name) => ({ name, ref: this[name] }))
    .forEach(({ name, ref }) => {
      if (ref && ref.isFocused()) {
        this.setState({ [name]: text });
      }
    });
  }

  onSubmitProductName() {
    this.productThaiName.focus();
  }

  onSubmitProductThaiName() {
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
        <Text style={styles.contentTitle}>
          {translate("product-profile-para-1")}
        </Text>
        <View style={styles.itemContainer}>
          <TextField
            ref={this.productNameRef}
            value={data.productName}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitProductName}
            returnKeyType='next'
            label={translate("product-profile-para-2")}
            error={errors.productName}
          />
          <TextField
            ref={this.productThaiNameRef}
            value={data.productThaiName}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.onSubmitProductThaiName}
            returnKeyType='next'
            label={translate("product-profile-para-3")}
            error={errors.productThaiName}
          />
          <View style={styles.itemContainer}>
            <Text style={styles.storyTitle}>{translate("product-profile-para-4")}</Text>
            <Text style={styles.storyContent}>
              {translate("product-profile-para-5")}
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
        </View>
      </View>
    )

    return (
      <View style={styles.container}>
        {title}
        <View style={styles.body}>
          <ScrollView>
            <Image
              style={styles.viewItem}
              source={require('./assets/product_information.png')}
              resizeMode="cover"
            />
            {content}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const propTypes = {
    images: PropTypes.array,
};

const defaultProps = {
    images: [],
};

ProductProfile.propTypes = propTypes;
ProductProfile.defaultProps = defaultProps;

export default ProductProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
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
  },
  body: {
    flex: 1,
  },
  viewItem: {
    height: 290,
    width: '100%'
  },
  content: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'SamsungOne',
    width: 180,
  },
  itemContainer: {
    marginBottom: 30,
  },
  storyTitle: {
    fontFamily: 'SamsungOne',
    fontSize: 24,
    fontWeight: 'bold',
  },
  storyContent: {
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'SamsungOne',
    marginTop: 5,
    fontSize: 12,
  },
  storyText: {
    borderColor: 'gray',
    borderWidth: 0.5,
    textAlignVertical: 'top',
  },
});

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';
import Share from 'react-native-share';
import {setI18nConfig, translate } from './contentGetters';

class SharePost extends Component  {
  constructor(props) {
    super(props);
    setI18nConfig();
  }

  onPressBack = () => {
    console.log("onPressBack");
    Navigation.dismissModal(this.props.componentId);
  }

  onPressEmpty = () => {
    console.log("onPressEmpty");
    Navigation.dismissAllModals();
  }

  onPressFB = () => {
    const shareOptions = {
      url: 'https://dummyimage.com/600x400/000/fff',
      social: Share.Social.FACEBOOK
    };
    
    Share.shareSingle(shareOptions)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
  }

  onPressShare = () => {
    const shareOptions = {
      urls: ['https://dummyimage.com/600x400/000/fff',]
    };
    
    Share.open(shareOptions)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
  }
  onPressInsta = () => {
    const shareOptions = {
      url: 'https://dummyimage.com/600x400/000/fff',
      social: Share.Social.INSTAGRAM
    };
    
    Share.shareSingle(shareOptions)
    .then((res) => { console.log(res) })
    .catch((err) => { err && console.log(err); });
  }

  onPressLine = () => {
    console.log("onPressLine");
  }

  render = () => {
    const title = (
      <View style={styles.title}>
        <TouchableOpacity style={styles.backButton} onPress={this.onPressBack}>
          <Text style={styles.backButton}>Previous</Text>
        </TouchableOpacity>
      </View>
    );

    const content = (
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.contentTitle}>
            {translate("share-image-para-1")}
          </Text>
          <Text style={styles.contentDescription}>
            {translate("share-image-para-2")}
          </Text>
          <View style={styles.share}>
            <Text style={styles.shareTitle}>
              {translate("share-image-para-3")}
            </Text>
            <View style={styles.shareContainer}>
              <TouchableOpacity
                style={styles.shareImage}
                onPress={this.onPressFB}
              >
                <Image
                  style={styles.shareImage}
                  source={require('./assets/share_fb.png')}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View style={styles.padding}/>
              <TouchableOpacity
                style={styles.shareImage}
                onPress={this.onPressInsta}
              >
                <Image
                  style={styles.shareImage}
                  source={require('./assets/share_insta.png')}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View style={styles.padding}/>
              <TouchableOpacity
                style={styles.shareImage}
                onPress={this.onPressLine}
              >
                <Image
                  style={styles.shareImage}
                  source={require('./assets/share_line.png')}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.dashLine}/>
            <View style={styles.shareContainer}>
              <View stlye={styles.shareImageTextContainer}>
                <TouchableOpacity
                  style={styles.shareImage}
                  onPress={this.onPressLine}
                >
                  <Image
                    style={styles.shareImage}
                    source={require('./assets/save_image.png')}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <Text style={styles.shareText}>{translate("share-image-para-4")}</Text>
              </View>
              <View style={styles.padding}/>
              <View stlye={styles.shareImageTextContainer}>
                <TouchableOpacity
                  style={styles.shareImage}
                  onPress={this.onPressShare}
                >
                  <Image
                    style={styles.shareImage}
                    source={require('./assets/share_common.png')}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <Text style={styles.shareText}>{translate("share-image-para-5")}</Text>
              </View>
            </View>
          </View>
          
        </ScrollView>
      </View>
    )

    return (
    <View style={styles.container}>
      {title}
      <TouchableOpacity
        style={styles.empty} 
        onPress = {this.onPressEmpty}
      />
      {content}
    </View>);
  }
}

const propTypes = {
    images: PropTypes.array,
};

const defaultProps = {
    images: [],
};

SharePost.propTypes = propTypes;
SharePost.defaultProps = defaultProps;

export default SharePost;

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
  empty: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentDescription: {
    marginTop: 10,
    fontSize: 18,
  },
  share: {
    marginBottom: 30,
  },
  shareTitle: {
    marginTop: 40,
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  shareContainer: {
    flexDirection: 'row'
  },
  shareImage: {
    width: 48,
    height: 48
  },
  padding: {
    width: 48,
    height: 48,
  },
  dashLine: {
    marginTop: 15,
    marginBottom: 15,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    width: 365,
  },
  shareImageTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareText: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

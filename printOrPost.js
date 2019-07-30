import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import PropTypes from 'prop-types';

class PrintOrPost extends Component  {
  constructor(props) {
    super(props);
  }

  state = {
    postingChecked: false,
  }

  onPressPosting = () => {
    console.log("onPressPosting");
    this.setState({
      postingChecked: true,
    });
  }

  onPressPriceTag = () => {
    console.log("onPressPriceTag");
    this.setState({
      postingChecked: false,
    });
  }

  onPressOK = () => {
    console.log("onPressOK");
    if (this.state.postingChecked) {
      console.log("posting to SNS");
    } else {
      console.log("Print out as a brand tag");
    }
  }

  render = () => {
    const content = (
      <View style={styles.content}>
        <Text style={styles.contentTitle}>POST Or Print Out</Text>
        <Text style={styles.contentDescription}>
          You can either post your edited image on online or print it out as a Brand Tag.
        </Text>
        <View style={styles.contentChoiceContainer}>
          <View style={styles.contentChoiceItemContainer}>
            <TouchableOpacity 
              style={styles.contentChoiceImage}
              onPress = {this.onPressPosting}
            >
              <View style={styles.contentChoiceCover}>
                <Image
                  style={styles.contentChoiceImage}
                  source={require('./assets/Posting.png')}
                  resizeMode='center'
                />
              </View>
              <View style={styles.contentChoiceCover}>
                <Text style={styles.contentChoiceText}>Posting this edit on Online</Text>
              </View>
              <View style={styles.contentChoiceCover}>
                {this.state.postingChecked ? 
                  <Image
                    style={styles.contentChoiceButton}
                    source={require('./assets/radio_select.png')}
                    resizeMode='center'
                  /> :
                  <Image
                    style={styles.contentChoiceButton}
                    source={require('./assets/radio_unselect.png')}
                    resizeMode='center'
                  />
                }
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentChoiceItemContainerLeft}>
            <TouchableOpacity 
              style={styles.contentChoiceImage}
              onPress = {this.onPressPriceTag}
            >
              <View style={styles.contentChoiceCover}>
                <Image
                  style={styles.contentChoiceImage}
                  source={require('./assets/PriceTag.png')}
                  resizeMode='center'
                />
              </View>
              <View style={styles.contentChoiceCover}>
                <Text style={styles.contentChoiceText}>Print out as a Brand Tag</Text>
              </View>
              <View style={styles.contentChoiceCover}>
                {!this.state.postingChecked ? 
                  <Image
                    style={styles.contentChoiceButton}
                    source={require('./assets/radio_select.png')}
                    resizeMode='center'
                  /> :
                  <Image
                    style={styles.contentChoiceButton}
                    source={require('./assets/radio_unselect.png')}
                    resizeMode='center'
                  />
                }
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.okButtonContainer}>
          <TouchableOpacity 
            style={styles.okButton}
            onPress = {this.onPressOK}
          >
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    )

    return (
    <View style={styles.container}>
      <View style={styles.title}></View>
      {content}
    </View>);
  }
}

const propTypes = {
    images: PropTypes.array,
};

const defaultProps = {
    image: [],
};

PrintOrPost.propTypes = propTypes;
PrintOrPost.defaultProps = defaultProps;

export default PrintOrPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    flex: 4,
  },
  content: {
    flex: 6,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  contentTitle: {
    marginLeft: 10,
    fontSize: 30,
    fontWeight: 'bold',
    width: 150,
  },
  contentDescription: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    width: 300,
  },
  contentChoiceContainer: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentChoiceItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: '50%'
  },
  contentChoiceItemContainerLeft: {
    marginLeft: 10,
    width: '50%',
  },
  contentChoiceCover: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentChoiceImage: {
    width: 50,
    height: 80,
  },
  contentChoiceText: {
    width: 80,
    fontSize: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contentChoiceButton: {
    marginTop: 5,
    width: 15,
    height: 15,
  },
  okButtonContainer: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  okButton: {
    backgroundColor: '#14A1DC',
    borderRadius: 30,
    overflow: 'hidden',
    width: 205,
    height: 28,
  },
  okButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});

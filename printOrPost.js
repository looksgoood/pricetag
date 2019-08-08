import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Dialog, { DialogTitle, DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';

class PrintOrPost extends Component  {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.setState({images:this.props.images});
  }
  state = {
    postingChecked: false,
    dialogVisible: false,
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

  onPressBack = () => {
    console.log("onPressBack");
    Navigation.dismissModal(this.props.componentId);
  }

  onPressNext = () => {
    console.log("onPressNext");
    if (this.state.postingChecked) {
      console.log("posting to SNS");
      Navigation.showModal({
        component: {
          name: 'example.SharePost',
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
    } else {
      console.log("Print out as a brand tag");
      Navigation.showModal({
        component: {
          name: 'example.PrintBrandTag',
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
  }
  
  onPressBrandTagInfo = () => {
    console.log("onPressBrandTagInfo");
    this.setState({ dialogVisible: true });
  }

  render = () => {
    const title = (
      <View style={styles.title}>
        <TouchableOpacity style={styles.backButton} onPress={this.onPressBack}>
          <Text style={styles.backButton}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={this.onPressNext}>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>
    );

    const content = (
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.contentTitle}>POST or{'\n'}Print Out</Text>
          <Text style={styles.contentDescription}>
            You can either post your edited{'\n'}image on online or print it out as a{'\n'}Brand Tag.
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
          <View style={styles.brandTagContainer}>
            <Text
              style={styles.brandTagText}
              onPress={this.onPressBrandTagInfo}
            >
              What is Printing Out as{'\n'}
              a Brand Tag?
            </Text>
            <Dialog
              visible={this.state.dialogVisible}
              onTouchOutside={() => {
                this.setState({ dialogVisible: false });
              }}
              width={0.9}
              dialogTitle={<DialogTitle title="What is Printing Out as a Brand Tag?" />}
              footer={
                <DialogFooter>
                  <DialogButton text="OK" onPress={() => {
                    this.setState({ dialogVisible: false });
                  }}/>
                </DialogFooter>
              }
            >
              <DialogContent>
                <Text>
                  blahblahblahblahblahblahblahblahblah{'\n'}
                  blahblahblahblahblahblahblahblahblah{'\n'}
                  blahblahblahblahblahblahblahblahblah{'\n'}
                  blahblahblahblahblahblahblahblahblah{'\n'}
                  blahblahblahblahblahblahblahblahblah{'\n'}
                  blahblahblahblahblahblahblahblahblah{'\n'}
                  blahblahblahblahblahblahblahblahblah{'\n'}
                  blahblahblahblahblahblahblahblahblah{'\n'}
                </Text>
              </DialogContent>
            </Dialog>
          </View>
        </ScrollView>
      </View>
    )

    return (
    <View style={styles.container}>
      {title}
      <TouchableOpacity
        style={styles.empty} 
        onPress = {this.onPressBack}
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

PrintOrPost.propTypes = propTypes;
PrintOrPost.defaultProps = defaultProps;

export default PrintOrPost;

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
    color: 'black',
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
    width: 300,
  },
  contentChoiceContainer: {
    marginTop: 10,
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
  brandTagContainer: {
    marginTop: 70,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTagText: {
    color: '#2C85FF',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  dialog: {
    marginLeft: 20,
    marginRight: 20,
  }
});

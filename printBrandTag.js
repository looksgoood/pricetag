import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Dialog, { DialogTitle, DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';

class PrintBrandTag extends Component  {
  constructor(props) {
    super(props);
  }

  state = {
    dialogVisible: false,
  }

  onPressBack = () => {
    console.log("onPressBack");
    Navigation.dismissModal(this.props.componentId);
  }

  onPressPrint = () => {
    console.log("onPressPrint");
    this.setState({ dialogVisible: true });
  }

  onPressEmpty = () => {
    console.log("onPressEmpty");
    Navigation.dismissAllModals();
  }

  // TODO
  onPressPrintBrandTag = () => {
    console.log("onPressPrintBrandTag");
  }

  render = () => {
    const title = (
      <View style={styles.title}>
        <TouchableOpacity style={styles.backButton} onPress={this.onPressBack}>
          <Text style={styles.backButton}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.printButton} onPress={this.onPressPrint}>
          <Text style={styles.printButton}>Print</Text>
        </TouchableOpacity>
        <Dialog
          visible={this.state.dialogVisible}
          onTouchOutside={() => {
            this.setState({ dialogVisible: false });
          }}
          width={0.9}
          dialogTitle={<DialogTitle title="Are Your sure to print this design out in a brand tag?" />}
          footer={
            <DialogFooter>
              <DialogButton text="Cancel" onPress={() => {
                this.setState({ dialogVisible: false });
              }}/>
              <DialogButton text="Print" onPress={() => {
                this.setState({ dialogVisible: false });
                this.onPressPrintBrandTag();
              }}/>
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>
              If you checked the design{'\n'}
              and want to proceed{'\n'}
              printing, press “Print”.
            </Text>
          </DialogContent>
        </Dialog>
      </View>
    );

    const content = (
      <View style={styles.content}>
        <Text style={styles.contentTitle}>
          Print Out{'\n'}As a Brand Tag
        </Text>
        <Text style={styles.contentDescription}>
        With your customized edit,{'\n'}make your own Brand Tag for your{'\n'}product sale.
        </Text>
        <View style={styles.brandTag}>
          <Text style={styles.brandTagTitle}>
            Preview
          </Text>
          <View style={styles.previewLine}/>
          <ScrollView horizontal={true}>
            <View style={styles.brandTagContainer}>
              <View style={styles.brandTagItem}>
                <Image
                  style={styles.brandTagImage}
                  source={require('./assets/brandTag_front.png')}
                  resizeMode="cover"
                />
                <Text style={styles.brandTagText}>Front</Text>
              </View>
            </View>
            <View style={styles.padding}/>
            <View style={styles.brandTagContainer}>
              <View style={styles.brandTagItem}>
                <Image
                  style={styles.brandTagImage}
                  source={require('./assets/brandTag_back.png')}
                  resizeMode="cover"
                />
                <Text style={styles.brandTagText}>Back</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.editButtonContainer}>
            <TouchableOpacity 
              style={styles.editButton}
              onPress = {this.onPressApplyAll}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.brandTagInfoContainer}>
            <Text style={styles.brandTagInfoText}>
              * A brand Tag is basically printed in a way of{'\n'}
              a template with Tutorial guide.
            </Text>
          </View>
        </View>
      </View>
    )

    return (
    <View style={styles.container}>
      {title}
      <View style={styles.body}>
        <ScrollView>
          <TouchableOpacity
            style={styles.empty} 
            onPress = {this.onPressBack}
          />
          {content}
        </ScrollView>
      </View>
    </View>);
  }
}

const propTypes = {
    images: PropTypes.array,
};

const defaultProps = {
    images: [],
};

PrintBrandTag.propTypes = propTypes;
PrintBrandTag.defaultProps = defaultProps;

export default PrintBrandTag;

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
  printButton: {
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
  empty: {
    height: 270,
  },
  content: {
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
  brandTag: {
    marginBottom: 30,
  },
  brandTagTitle: {
    marginTop: 40,
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  previewLine: {
    marginTop: 10,
    marginBottom: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: 365,
  },
  brandTagContainer: {
    flexDirection: 'row'
  },
  brandTagItem: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  brandTagImage: {
    width: 240,
    height: 450,
  },
  brandTagText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButtonContainer: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#14A1DC',
    borderRadius: 30,
    overflow: 'hidden',
    width: 205,
    height: 28,
  },
  editButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  padding: {
    width: 48,
  },
  brandTagInfoContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTagInfoText: {
    fontSize: 15,
  }
});

import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import LineLogin from 'react-native-line-sdk';

import PropTypes from 'prop-types';

class Login extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
    };
  }

  FBGraphRequest = async (fields, callback) => {
    const accessData = await AccessToken.getCurrentAccessToken();
    // Create a graph request asking for user information
    const infoRequest = new GraphRequest('/me', {
      accessToken: accessData.accessToken,
      parameters: {
        fields: {
          string: fields
        }
      }
    }, callback.bind(this));
    // Execute the graph request created above
    new GraphRequestManager().addRequest(infoRequest).start();
  };
  _FBLoginCallback = async (err, ret) => {
    if (err) {
      
    } else {
      try {
        await this._storeData('@haetae:profile', ret);
        this._loadLanding();
      }
      catch (err) {
        // Error saving data
      }
    }
  } ;
  _loadLanding = () => {
    Navigation.setStackRoot(this.props.componentId,
    {
      component: {
          name: 'example.Landing',
          passProps: {
            images: this.state.images,
            token: this.state.token,
          },
        },
        options: {
          animations: {
            setStackRoot: {
              enabled: true,
            },
          },
        },
    });
  };

  onPressFacebook = () => {
    console.log('onPressFacebook');
    this._loadLanding();
  }
  _storeData = async (key, data)=> {
    try {
      ret = new Object();
      if(data.profile !== undefined) {
        ret.profileUri = data.profile.pictureURL;
        ret.name = data.openId.name ? data.openId.name : data.profile.displayName;
        ret.email = data.openId.email ? data.openId.email : '';
      }
      else {
        // FB
      }
      await AsyncStorage.setItem(key, JSON.stringify(ret));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  
  onPressLine = () => {
    LineLogin.login()
    .then((user) => {
      this._storeData('@haetae:profile', user);
      this._loadLanding();
    })
    .catch((err) => {
      console.log(err)
    })
    
  }

  onPressInstagram = () => {
    console.log('onPressInstagram');
    this._loadLanding();
  }

  render = () => {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.loginBackground}
          resizeMode="cover"
          source={require('./assets/login_BG.png')}>
          <View style={styles.loginTextContainer}>
            <Image
              style={styles.loginTextImage}
              source={require('./assets/HaeTae_Logo_white.png')}
              resizeMode="contain"
            />
            <Text style={styles.loginTextSubtitle}>
              A convenient way to enhance your brand identity
            </Text>
            <Text style={styles.loginTextDescription}>
            Start to Effectively make your products stand out in On/Off-line market by designing your own brand identity and applying it to the product.
            </Text>
          </View>
          <View style={styles.loginButtonContainer}>
            <View style={styles.loginLineContainer}>
              <View style={styles.loginLine}/>
              <Text style={styles.loginButtonText}>
                Log in with
              </Text>
              <View style={styles.loginLine}/>
            </View>
            <View style={styles.loginButtonImageContainer}>
              <LoginButton
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      console.log('login has error: ' + result.error);
                    } else if (result.isCancelled) {
                      console.log('login is cancelled.');
                    } else {
                      this.FBGraphRequest('id, email, name, picture.type(large)', 
                      this._FBLoginCallback);
                    }
                  }
                }
                onLogoutFinished={() => console.log('logout.')}/>
              <TouchableOpacity
                style={styles.loginButtonImage}
                onPress={this.onPressLine}
              >
                <Image
                  style={styles.loginButtonImage}
                  source={require('./assets/login_google_button.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButtonImage}
                onPress={this.onPressInstagram}
              >
                <Image
                  style={styles.loginButtonImage}
                  source={require('./assets/login_insta_button.png')}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}


const defaultProps = {
};

Login.defaultProps = defaultProps;

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loginTextContainer: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 35,
  },
  loginTextImage: {
    marginLeft: -20,
    backgroundColor: 'transparent',
    width: 190,
    height: 62,
  },
  loginTextSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    width: 250,
  },
  loginTextDescription: {
    marginTop: 30,
    fontSize: 18,
    lineHeight: 18 * 1.5,
    color: 'white',
    width: 330,
  },
  loginButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginLineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginLine: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: 100,
  },
  loginButtonText: {
    marginRight: 15,
    marginLeft: 15,
    color: 'white',
    fontSize: 24,
  },
  loginButtonImageContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonImage: {
    marginBottom: 5,
    width: 200,
    height: 35,
  },
});

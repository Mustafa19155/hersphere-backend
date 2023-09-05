import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {axiosClient} from '../../api/axios';

export default function SocialConnect({
  isValidStep,
  setisValidStep,
  setuserType,
}) {
  const handleGoogleSignin = async index => {
    try {
      await GoogleSignin.hasPlayServices();

      await GoogleSignin.addScopes({
        scopes: [
          'profile',
          'email',
          'https://www.googleapis.com/auth/youtube',
          'https://www.googleapis.com/auth/youtube.upload',
        ],
      });

      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();

      axiosClient
        .get(`/user/youtube-details?access_token=${tokens.accessToken}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      setaccountTypes(
        accountTypes.map((type, ind) => {
          if (ind == index) {
            return {
              ...type,
              connected: true,
            };
          }
          return type;
        }),
      );
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleInstagramLogin = index => {
    LoginManager.logInWithPermissions([
      'instagram_basic',
      'instagram_content_publish',
      'instagram_manage_comments',
      'instagram_manage_insights',
      // 'pages_show_list',
      'pages_read_engagement',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            axios
              .get('http://192.168.18.60:3001/api/user/facebook-pages')
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
            setaccountTypes(
              accountTypes.map((type, ind) => {
                if (ind == index) {
                  return {
                    ...type,
                    connected: true,
                  };
                }
                return type;
              }),
            );
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const handleFacebookLogin = index => {
    LoginManager.logInWithPermissions([
      'user_friends',
      'manage_pages',
      'publish_to_groups',
      'pages_manage_posts',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            axios
              .get('http://192.168.18.60:3001/api/user/facebook-pages')
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              });
            setaccountTypes(
              accountTypes.map((type, ind) => {
                if (ind == index) {
                  return {
                    ...type,
                    connected: true,
                  };
                }
                return type;
              }),
            );
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const [accountTypes, setaccountTypes] = useState([
    {
      name: 'youtube',
      icon: 'logo-youtube',
      color: '#FF0000',
      connected: false,
      clickHandler: handleGoogleSignin,
    },
    {
      name: 'facebook',
      icon: 'logo-facebook',
      color: '#4267B2',
      connected: false,
      clickHandler: handleFacebookLogin,
    },
    {
      name: 'instagram',
      icon: 'logo-instagram',
      color: '#bc2a8d',
      connected: false,
      clickHandler: handleInstagramLogin,
    },
  ]);

  useEffect(() => {
    accountTypes.map(type => {
      if (type.connected) {
        setisValidStep(true);
      }
    });
  }, [accountTypes]);

  return (
    <View>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Social Accounts Connect</Text>
        <Text style={styles.subheading}>
          Connect your social media accounts with our app.
        </Text>
      </View>
      <View style={styles.typesWrapper}>
        {accountTypes.map((type, index) => (
          <View key={index}>
            <TouchableWithoutFeedback
              style={styles.button}
              onPress={() =>
                type.connected ? null : type.clickHandler(index)
              }>
              <View style={{marginTop: 7}}>
                <Icon name={type.icon} size={30} color={type.color} />
              </View>
              {type.connected ? (
                <Text style={styles.activeText}>Connected</Text>
              ) : (
                <Text style={styles.inactiveText}>{type.name}</Text>
              )}
            </TouchableWithoutFeedback>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inactiveText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
  },
  activeText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize: 20,
    color: 'gray',
  },
  typesWrapper: {
    gap: 30,
    marginTop: 20,
  },
  button: {
    paddingLeft: '30%',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 20,
    paddingVertical: 7,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  headingWrapper: {
    flexDirection: 'column',
    gap: 7,
    marginBottom: 20,
  },
  heading: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
    color: 'gray',
  },
});

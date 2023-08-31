import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function App() {
  const handleFacebookLogin = () => {
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
            console.log(data.accessToken.toString());
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const handleGoogleSignin = async () => {
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
      console.log(userInfo);
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

  return (
    <View>
      <Button onPress={handleFacebookLogin} title="login with facebook" />
      {/* <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      /> */}

      <Button title="LOGIN WITH GOOGLE" onPress={handleGoogleSignin} />
    </View>
  );
}

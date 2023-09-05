/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Settings} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {PaperProvider, DefaultTheme} from 'react-native-paper';

Settings.initializeSDK();

GoogleSignin.configure({
  //   webClientId:
  //     '417688593234-8m330cnb15cqh4cks8lpnun441hsuf9e.apps.googleusercontent.com',
});

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

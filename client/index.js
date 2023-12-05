/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Settings} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {PaperProvider, DefaultTheme} from 'react-native-paper';
import AuthProvider from './contexts/userContext';
import {NavigationContainer} from '@react-navigation/native';
import SearchProvider from './contexts/searchContext';
import RequestProvider from './contexts/requestContext';

Settings.initializeSDK();

GoogleSignin.configure({
  //   webClientId:
  //     '417688593234-8m330cnb15cqh4cks8lpnun441hsuf9e.apps.googleusercontent.com',
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export default function Main() {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthProvider>
        <SearchProvider>
          <RequestProvider>
            <PaperProvider>
              <App />
            </PaperProvider>
          </RequestProvider>
        </SearchProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);

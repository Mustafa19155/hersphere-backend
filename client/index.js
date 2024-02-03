/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Image, View} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Settings} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {PaperProvider, DefaultTheme, Text} from 'react-native-paper';
import AuthProvider from './contexts/userContext';
import {NavigationContainer} from '@react-navigation/native';
import SearchProvider from './contexts/searchContext';
import RequestProvider from './contexts/requestContext';
import {ToastProvider} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PostCreatorProvider from './contexts/postCreatorContext';

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
      <PostCreatorProvider>
        <AuthProvider>
          <SearchProvider>
            <RequestProvider>
              <PaperProvider>
                <ToastProvider
                  type={'normal'}
                  placement={'bottom'}
                  duration={4000}
                  offset={30}
                  normalColor="white"
                  dangerColor="white"
                  animationType={'zoom-in'}
                  textStyle={{color: 'green', fontSize: 16}}
                  style={{elevation: 5}}
                  swipeEnabled={true}
                  renderToast={toastOptions => (
                    <View
                      style={{
                        backgroundColor: '#EEEEEE',
                        elevation: 5,
                        paddingVertical: 17,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        borderLeftWidth: 5,
                        borderLeftColor:
                          toastOptions.type == 'success'
                            ? '#13B887'
                            : '#cc0000',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5,
                        maxWidth: '80%',
                      }}>
                      <Icon
                        name={
                          toastOptions.type == 'success'
                            ? 'check-circle'
                            : 'error'
                        }
                        size={20}
                        color={
                          toastOptions.type == 'success' ? '#13B887' : '#cc0000'
                        }
                      />
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                        {toastOptions.message}
                      </Text>
                    </View>
                  )}>
                  <App />
                </ToastProvider>
              </PaperProvider>
            </RequestProvider>
          </SearchProvider>
        </AuthProvider>
      </PostCreatorProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Main);

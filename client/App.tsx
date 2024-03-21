import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import ProfileSetup from './screens/ProfileSetup';
import {AuthContext} from './contexts/userContext';
import {useContext, useEffect, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import VerifyGender from './screens/UserProfiling/VerifyGender';
import UserProfilingStack, {
  ChatStack,
  ChatroomStack,
  InfluenceProfileStack,
  MarketplaceStack,
  PostCreatorStack,
  RequetsStack,
} from './navigation/StackNavigation';
import DashboardDrawer from './navigation/DrawerNavigation';
import Authentication from './screens/Authentication';
import PostCreator from './screens/PostCreator/PostCreator';
import {Modal, Portal, Text} from 'react-native-paper';
import global from './assets/styles/global';
import SendRequest from './screens/Search/SendRequest';
import UserProfile from './screens/Search/UserProfile';
import Icon from 'react-native-vector-icons/Ionicons';
import RequestProvider from './contexts/requestContext';
import SelectMedia from './screens/Requests/SelectMedia';
import UploadMediaAndPost from './screens/Requests/UploadMediaAndPost';

const Stack = createStackNavigator();

function App() {
  const navigation = useNavigation();
  const [showBlockedPopup, setshowBlockedPopup] = useState(false);

  const {user, setuser} = useContext(AuthContext);

  // useEffect(() => {
  //   if (user == null) {
  //     navigation.navigate('login');
  //   } else {
  //     user.profileCompleted
  //       ? navigation.navigate('Main')
  //       : navigation.navigate('Authentication');
  //   }
  // }, []);

  useEffect(() => {
    if (user) {
      if (user.isBlocked) {
        setshowBlockedPopup(true);
      }
    }
  }, [user]);

  const SendRequestComp = ({route}) => {
    return (
      <RequestProvider>
        <SendRequest route={route} />
      </RequestProvider>
    );
  };

  return (
    <>
      {showBlockedPopup && <BlockedModal />}
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            headerStyle: {elevation: 0},
          }}>
          {/* <Stack.Screen name="PostCreator" component={PostCreator} /> */}
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen name="profileSetup" component={ProfileSetup} />
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="Main" component={DashboardDrawer} />
          <Stack.Screen name="Chats" component={ChatStack} />
          <Stack.Screen name="Chatroom" component={ChatroomStack} />
          <Stack.Screen name="Marketplace" component={MarketplaceStack} />
          <Stack.Screen name="Requests" component={RequetsStack} />
        </Stack.Group>
        <Stack.Screen
          name="PostCreator"
          component={PostCreator}
          options={{
            title: 'Post Creator',
            headerTitleAlign: 'center',
            headerTitle: () => (
              <Text style={[global.fontBold, global.textNormal]}>
                Post Creator System
              </Text>
            ),
            // headerShown: false,
          }}
        />
        <Stack.Group screenOptions={{cardStyle: {paddingHorizontal: 20}}}>
          <Stack.Screen
            name="SelectMedia"
            component={SelectMedia}
            options={{
              headerLeft: props => {
                return (
                  <Pressable onPress={props.onPress}>
                    <Icon name="chevron-back" size={20} color="black" />
                  </Pressable>
                );
              },
              title: 'Media Type',
            }}
          />
          <Stack.Screen
            name="UploadAndPost"
            component={UploadMediaAndPost}
            options={{
              headerLeft: props => {
                return (
                  <Pressable onPress={props.onPress}>
                    <Icon name="chevron-back" size={20} color="black" />
                  </Pressable>
                );
              },
              title: 'Upload Media',
            }}
          />
          <Stack.Screen
            name="SendRequest"
            component={SendRequestComp}
            options={{
              header: props => {
                return (
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 20,
                    }}>
                    <Pressable onPress={() => props.navigation.goBack()}>
                      <Icon name="chevron-back" size={20} color="black" />
                    </Pressable>
                    <Text
                      style={[
                        global.fontBold,
                        global.textSmall,
                        global.blackColor,
                      ]}>
                      Send Request
                    </Text>
                    <View />
                  </View>
                );
              },
            }}
          />
          <Stack.Screen
            name="InfluencerProfileMain"
            component={UserProfile}
            options={{
              headerLeft: props => {
                return (
                  <Pressable onPress={props.onPress}>
                    <Icon name="chevron-back" size={20} color="black" />
                  </Pressable>
                );
              },
              title: '',
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
}

export default App;

const BlockedModal = () => {
  const containerStyle = {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  };

  return (
    <Portal>
      <Modal visible={true} contentContainerStyle={containerStyle}>
        <View style={{gap: 25, alignItems: 'center'}}>
          <Text
            style={[
              global.blackColor,
              global.textNormal,
              {textAlign: 'center'},
            ]}>
            Your account has been blocked.
          </Text>
          {/* <Image source={TickIcon} /> */}
        </View>
      </Modal>
    </Portal>
  );
};

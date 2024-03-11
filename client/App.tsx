import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import ProfileSetup from './screens/ProfileSetup';
import {AuthContext} from './contexts/userContext';
import {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
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

  return (
    <>
      {showBlockedPopup && <BlockedModal />}
      <Stack.Navigator
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
        <Stack.Screen
          name="InfluencerProfile"
          component={InfluenceProfileStack}
        />
        <Stack.Screen name="Chats" component={ChatStack} />
        <Stack.Screen name="PostCreator" component={PostCreatorStack} />
        <Stack.Screen name="Chatroom" component={ChatroomStack} />
        <Stack.Screen name="Marketplace" component={MarketplaceStack} />
        <Stack.Screen name="Requests" component={RequetsStack} />
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

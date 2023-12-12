import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import ProfileSetup from './screens/ProfileSetup';
import {AuthContext} from './contexts/userContext';
import {useContext, useEffect} from 'react';
import {Image, View} from 'react-native';
import VerifyGender from './screens/UserProfiling/VerifyGender';
import UserProfilingStack, {
  ChatStack,
  InfluenceProfileStack,
  RequetsStack,
} from './navigation/StackNavigation';
import DashboardDrawer from './navigation/DrawerNavigation';
import Authentication from './screens/Authentication';
import PostCreator from './screens/PostCreator/PostCreator';

const Stack = createStackNavigator();

function App() {
  const navigation = useNavigation();

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

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {elevation: 0},
      }}>
      <Stack.Screen name="PostCreator" component={PostCreator} />
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
    </Stack.Navigator>
  );
}

export default App;

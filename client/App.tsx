import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import ProfileSetup from './screens/ProfileSetup';
import Dashboard from './screens/Dashboard';
import {AuthContext} from './contexts/userContext';
import {useContext, useEffect} from 'react';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  const navigation = useNavigation();

  const {user, setuser} = useContext(AuthContext);

  useEffect(() => {
    if (user == null) {
      navigation.navigate('login');
    } else {
      user.profileCompleted
        ? navigation.navigate('Main')
        : navigation.navigate('profileSetup');
    }
  }, [user]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="profileSetup" component={ProfileSetup} />
      <Stack.Screen name="Main" component={DashboardNavigation} />
    </Stack.Navigator>
  );
}

export default App;

const DashboardNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

function DashboardTabs() {
  return (
    <Tab.Navigator>
      {/* Define your bottom tab screens */}
      {/* Example: <Tab.Screen name="Tab1" component={Tab1Screen} /> */}
    </Tab.Navigator>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={DashboardTabs} />
      {/* Add more drawer screens as needed */}
    </Drawer.Navigator>
  );
}

export default App;

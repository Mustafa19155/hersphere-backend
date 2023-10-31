import * as React from 'react';
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
import UserProfiling from './screens/UserProfiling/UserProfiling';
import PersonalInfo from './screens/UserProfiling/PersonalInfo';
import SoicalAccounts from './screens/UserProfiling/SoicalAccounts';
import Security from './screens/UserProfiling/Security';
import BusinessInfo from './screens/UserProfiling/BusinessInfo';
import AnalyticsOptions from './screens/Analytics/AnalyticsOptions';
import {View} from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
    // <Drawer.Navigator initialroutename="Login">
    //   <Drawer.Screen name="Login" component={LoginScreen} />
    //   <Drawer.Screen name="Signup" component={SignupScreen} />
    // </Drawer.Navigator>

    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="profileSetup" component={ProfileSetup} />
      <Stack.Screen name="Main" component={DashboardDrawer} />
    </Stack.Navigator>
  );
}

export default App;

function DashboardTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      {/* Define your tab screens */}
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="ProfileOptions" component={UserProfilingStack} />
    </Tab.Navigator>
  );
}

function DashboardDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen
        name="DashboardDrawer"
        options={{drawerLabel: 'Dashboard', headerTitle: ''}}
        component={DashboardTabs}
      />
      <Stack.Screen
        name="Reporting and Analytics"
        component={AnalyticsOptions}
      />
    </Drawer.Navigator>
  );
}

function UserProfilingStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={UserProfiling} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="SocialAccounts" component={SoicalAccounts} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="BusinessInfo" component={BusinessInfo} />
    </Stack.Navigator>
  );
}

// const DashboardNavigation = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Dashboard" component={Dashboard} />
//     </Stack.Navigator>
//   );
// };

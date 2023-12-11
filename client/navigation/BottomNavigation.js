import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';
import StartupDashboard from '../screens/StartupDashboard';
import {ChatStack, MarketplaceStack, RequetsStack} from './StackNavigation';
import Icon from 'react-native-vector-icons/Feather';
import {Text} from 'react-native-paper';
import global from '../assets/styles/global';
import {AuthContext} from '../contexts/userContext';
import InfluencerDashboard from '../screens/InfluencerDashboard';

const Tab = createBottomTabNavigator();

const BottomHomeNavigation = () => {
  const {user} = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 0,
          borderColor: 'white',
        },
      }}
      sceneContainerStyle={{
        backgroundColor: 'white',
        padding: 15,
      }}>
      <Tab.Screen
        name="Home"
        component={
          user.userType == 'startup' ? StartupDashboard : InfluencerDashboard
        }
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Home
              </Text>
            );
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={MarketplaceStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Marketplace
              </Text>
            );
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="search"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="RequestsStack"
        component={RequetsStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Requests
              </Text>
            );
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="request"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ChatStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Icon
              name="messages"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Settings"
        component={UserProfilingStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Settings
              </Text>
            );
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="settings"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomHomeNavigation;

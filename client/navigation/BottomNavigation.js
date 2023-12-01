import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Dashboard from '../screens/Dashboard';
import UserProfilingStack from './StackNavigation';
import Icon from 'react-native-vector-icons/Feather';
import {Text} from 'react-native-paper';
import global from '../assets/styles/global';

const Tab = createBottomTabNavigator();

const BottomHomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      sceneContainerStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
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
        component={UserProfilingStack}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Explore
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
        name="Notifications"
        component={UserProfilingStack}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Notifications
              </Text>
            );
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="notifications"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={UserProfilingStack}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Messages
              </Text>
            );
          },
          tabBarIcon: ({focused}) => (
            <Icon
              name="messages"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={UserProfilingStack}
        options={{
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
      />
    </Tab.Navigator>
  );
};

export default BottomHomeNavigation;

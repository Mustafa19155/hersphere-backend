import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext} from 'react';
import StartupDashboard from '../screens/StartupDashboard';
import {ChatStack, MarketplaceStack, RequetsStack} from './StackNavigation';
import AntIcons from 'react-native-vector-icons/AntDesign';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {Text} from 'react-native-paper';
import global from '../assets/styles/global';
import {AuthContext} from '../contexts/userContext';
import InfluencerDashboard from '../screens/InfluencerDashboard';
import Jobs from '../screens/Marketplace/Jobs';
import Marketplace from '../screens/Marketplace/Marketplace';
import Requests from '../screens/Requests/Requests';
import InfluencerTeamRequestProfile from '../components/Requests/InfluencerTeamRequestProfile';

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
          width: '120%',
          left: '-10%',
        },
      }}
      sceneContainerStyle={{
        backgroundColor: 'white',
        // padding: 15,
      }}>
      <Tab.Screen
        name="Home"
        component={
          user.userType == 'startup' ? StartupDashboard : StartupDashboard
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
            <FeatherIcons
              name="home"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        // component={MarketplaceStack}
        component={user.userType == 'influencer' ? Jobs : Marketplace}
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
            <AntIcons
              name="shoppingcart"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="RequestsStack"
        component={Requests}
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
            <FeatherIcons
              name="folder-plus"
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
            <FeatherIcons
              name="message-square"
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
            <AntIcons
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

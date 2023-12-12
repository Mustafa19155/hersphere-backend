import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomHomeNavigation from './BottomNavigation';
import AnalyticsOptions from '../screens/Analytics/AnalyticsOptions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {Text} from 'react-native-paper';
import global from '../assets/styles/global';
import {Image, Pressable, TouchableWithoutFeedback, View} from 'react-native';
import UserProfilingStack from './StackNavigation';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={({focused}) => (
          <Pressable
            onPress={() => {
              props.navigation.navigate('login');
            }}>
            <Text style={[focused ? global.greenColor : global.blackColor]}>
              Logout
            </Text>
          </Pressable>
        )}
        icon={() => <FeatherIcons name="log-out" size={20} />}
        onPress={() => {}}
      />
    </DrawerContentScrollView>
  );
}

export default function DashboardDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={({navigation, route}) => ({
        sceneContainerStyle: {paddingHorizontal: 15},
        drawerStyle: {backgroundColor: 'white'},
        headerStyle: {elevation: 5},
        headerLeft: props => (
          <TouchableWithoutFeedback onPress={navigation.toggleDrawer}>
            <Image
              source={require('../assets/icons/drawer.png')}
              style={{margin: 20}}
            />
          </TouchableWithoutFeedback>
        ),
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Dashboard
              </Text>
            );
          },
          headerTitle: '',
          drawerIcon: ({focused}) => (
            <MaterialIcons
              name="dashboard"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
        component={BottomHomeNavigation}
      />
      <Drawer.Screen
        name="Statistics"
        component={AnalyticsOptions}
        options={{
          drawerLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Statistics
              </Text>
            );
          },
          drawerIcon: ({focused}) => (
            <AntIcons
              name="shoppingcart"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={AnalyticsOptions}
        options={{
          drawerLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Wallet
              </Text>
            );
          },
          drawerIcon: ({focused}) => (
            <EntypoIcons
              name="wallet"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chatbot"
        component={UserProfilingStack}
        options={{
          drawerLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Chat Bot
              </Text>
            );
          },
          drawerIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="robot-outline"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={UserProfilingStack}
        options={{
          headerTitle: '',
          drawerLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Settings
              </Text>
            );
          },
          drawerIcon: ({focused}) => (
            <AntIcons
              name="setting"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Teams"
        component={UserProfilingStack}
        options={{
          drawerLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Teams
              </Text>
            );
          },
          drawerIcon: ({focused}) => (
            <FeatherIcons
              name="users"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

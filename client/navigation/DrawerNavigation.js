import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomHomeNavigation from './BottomNavigation';
import AnalyticsOptions from '../screens/Analytics/AnalyticsOptions';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native-paper';
import global from '../assets/styles/global';
import {Image, Pressable, TouchableWithoutFeedback, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';

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
        icon={() => <Icon name="stats-chart-sharp" size={20} />}
        onPress={() => {}}
      />
    </DrawerContentScrollView>
  );
}

export default function DashboardDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={({navigation, route}) => ({
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
            <Icon
              name="stats-chart-sharp"
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
            <Icon
              name="stats-chart-sharp"
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
            <Icon
              name="stats-chart-sharp"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Promotion"
        component={AnalyticsOptions}
        options={{
          drawerLabel: ({focused}) => {
            return (
              <Text style={focused ? global.greenColor : global.blackColor}>
                Promotions
              </Text>
            );
          },
          drawerIcon: ({focused}) => (
            <Icon
              name="stats-chart-sharp"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

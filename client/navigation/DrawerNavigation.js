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
import {
  Image,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import UserProfilingStack from './StackNavigation';
import {useContext, useEffect, useState} from 'react';
import {getJobsOfInfluencer} from '../api/job';
import {AuthContext} from '../contexts/userContext';
import {useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <TeamsDrawer {...props} />
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
        // headerLeft: props => (
        //   <TouchableWithoutFeedback onPress={navigation.toggleDrawer}>
        //     <Image
        //       source={require('../assets/icons/drawer.png')}
        //       style={{margin: 20}}
        //     />
        //   </TouchableWithoutFeedback>
        // ),
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
      {/* <Drawer.Screen
        name="Teams"
        component={UserProfilingStack}
        options={{
          drawerLabel: ({focused}) => {
            return <TeamsDrawer focused={focused} />;
          },
          drawerIcon: ({focused}) => (
            <FeatherIcons
              name="users"
              size={20}
              style={focused ? global.greenColor : global.blackColor}
            />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}

const TeamsDrawer = props => {
  const navigation = useNavigation();
  // sidebar options that can be toggled
  const [showTeams, setshowTeams] = useState(false);

  const {user} = useContext(AuthContext);

  if (user.userType == 'startup')
    return (
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <Pressable
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 25,
            },
          ]}
          onPress={e => {
            setshowTeams(!showTeams);
          }}>
          <View>
            <FeatherIcons name="users" size={20} style={global.blackColor} />
          </View>
          <Text style={global.blackColor}>Teams</Text>
        </Pressable>
      </View>
    );

  const [jobs, setjobs] = useState([]);

  const handleGetJobs = () => {
    getJobsOfInfluencer({id: user._id})
      .then(res => {
        setjobs(res);
      })
      .catch(err => {});
  };

  useEffect(() => {
    if (user) handleGetJobs();
  }, [user]);

  return (
    <View
      style={
        {
          // paddingVertical: 10,
          // paddingHorizontal: 20,
        }
      }>
      <Pressable
        style={[
          {
            paddingVertical: 12,
            marginLeft: 15,
            paddingLeft: 5,
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 25,
            backgroundColor: showTeams ? '#D8D8D8' : 'white',
            borderRadius: 5,
          },
        ]}
        onPress={e => {
          setshowTeams(!showTeams);
        }}>
        <View>
          <FeatherIcons name="users" size={20} style={global.blackColor} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '75%',
          }}>
          <Text style={global.blackColor}>Teams</Text>
          <AntIcons
            name={showTeams ? 'up' : 'down'}
            size={16}
            style={global.blackColor}
          />
        </View>
      </Pressable>
      {showTeams && (
        <View style={{gap: 20, paddingTop: 10, paddingLeft: 50}}>
          {jobs.length == 0 && (
            <Text
              style={[
                global.textExtraSmall,
                global.grayColor,
                {paddingLeft: 30},
              ]}>
              No Teams Available
            </Text>
          )}
          {jobs.map(job => (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Chatroom', {
                  screen: 'Workplace',
                  params: {id: job.workplaceID._id},
                });
              }}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Image
                  source={{uri: job.workplaceID?.image}}
                  style={{height: 32, width: 32, borderRadius: 32}}
                />
                <View>
                  <Text
                    style={[
                      global.blackColor,
                      global.fontMedium,
                      global.textSmall,
                    ]}>
                    {job.title}
                  </Text>
                  <Text
                    style={[
                      global.textExtraSmall,
                      global.grayColor,
                      global.fontBold,
                    ]}>
                    {job.chatroomID?.membersID?.length} members
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      )}
    </View>
  );
};

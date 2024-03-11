import {createStackNavigator} from '@react-navigation/stack';
import UserProfiling from '../screens/UserProfiling/UserProfiling';
import PersonalInfo from '../screens/UserProfiling/PersonalInfo';
import SoicalAccounts from '../screens/UserProfiling/SoicalAccounts';
import Security from '../screens/UserProfiling/Security';
import BusinessInfo from '../screens/UserProfiling/BusinessInfo';
import Search from '../components/Search/Search';
import UserProfile from '../screens/Search/UserProfile';
import AntIcons from 'react-native-vector-icons/AntDesign';

const Stack = createStackNavigator();
export default function UserProfilingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        // headerStyle: {elevation: 5, backgroundColor: 'white'},
        headerLeft: props => {
          return (
            <Pressable onPress={props.onPress}>
              <AntIcons name="left" size={20} color="black" />
            </Pressable>
          );
        },
      }}>
      <Stack.Screen
        name="Main"
        component={UserProfiling}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PersonalInfo"
        component={PersonalInfo}
        options={{
          title: (
            <Text style={[global.fontMedium, global.textNormal]}>
              Personal Information
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="SocialAccounts"
        component={SoicalAccounts}
        options={{
          title: (
            <Text style={[global.fontMedium, global.textNormal]}>
              Social Accounts
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={{
          title: (
            <Text style={[global.fontMedium, global.textNormal]}>
              Change Password
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="BusinessInfo"
        component={BusinessInfo}
        options={{
          title: (
            <Text style={[global.fontMedium, global.textNormal]}>
              Business Information
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchMain"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
import Icon from 'react-native-vector-icons/Ionicons';
import {Pressable, View} from 'react-native';
import SendRequest from '../screens/Search/SendRequest';
import Chats from '../screens/Chat/Chats';
import Chat from '../screens/Chat/Chat';
import Requests from '../screens/Requests/Requests';
import RequestDetails from '../screens/Requests/RequestDetails';
import {Text} from 'react-native-paper';
import global from '../assets/styles/global';
import {useNavigation} from '@react-navigation/native';
import Marketplace from '../screens/Marketplace/Marketplace';
import PostCreator from '../screens/PostCreator/PostCreator';
import CreateWorkplace from '../screens/Marketplace/CreateWorkplace';
import CreateJob from '../screens/Marketplace/CreateJob';
import {useContext} from 'react';
import {AuthContext} from '../contexts/userContext';
import Jobs from '../screens/Marketplace/Jobs';
import CreateJobRequest from '../screens/Marketplace/CreateJobRequest';
import Workplace from '../screens/Marketplace/Workplace';
import ChatroomSetting from '../screens/Chat/ChatroomSetting';
import InfluencerTeamRequestProfile from '../components/Requests/InfluencerTeamRequestProfile';

export const InfluenceProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {paddingHorizontal: 20},
        headerLeft: props => {
          return (
            <Pressable onPress={props.onPress}>
              <Icon name="chevron-back" size={20} color="black" />
            </Pressable>
          );
        },
        title: '',
      }}>
      <Stack.Screen name="ProfileMain" component={UserProfile} />
      <Stack.Screen name="SendRequest" component={SendRequest} />
    </Stack.Navigator>
  );
};

export const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Chat',
      }}>
      <Stack.Screen
        name="ChatsMain"
        component={Chats}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const RequetsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Requests',
      }}>
      {/* <Stack.Screen
        name="Requests"
        component={Requests}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetails}
        options={{
          headerLeft: props => {
            return (
              <Pressable onPress={props.onPress}>
                <Icon name="chevron-back" size={26} color="black" />
              </Pressable>
            );
          },
          headerTitleAlign: 'center',
          title: <Text style={[global.fontBold]}>Request Details</Text>,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={InfluencerTeamRequestProfile}
        options={{
          headerLeft: props => {
            return (
              <Pressable
                onPress={props.onPress}
                style={{paddingHorizontal: 15}}>
                <Icon name="chevron-back" size={26} color="black" />
              </Pressable>
            );
          },
          title: <Text style={[global.fontBold]}></Text>,
        }}
      />
    </Stack.Navigator>
  );
};

export const MarketplaceStack = () => {
  const {user} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Marketplace',
      }}>
      <Stack.Screen
        name="CreateWorkplace"
        component={CreateWorkplace}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateJob"
        component={CreateJob}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateJobRequest"
        component={CreateJobRequest}
        // options={{headerShown: false}}
        options={{
          headerLeft: props => {
            return (
              <Pressable
                onPress={props.onPress}
                style={{paddingHorizontal: 15}}>
                <Icon name="chevron-back" size={26} color="black" />
              </Pressable>
            );
          },
          // headerTitleAlign: 'center',
          title: <Text style={[global.fontBold]}></Text>,
        }}
      />
    </Stack.Navigator>
  );
};

export const PostCreatorStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: 'Post Creator',
        headerTitleAlign: 'center',
        headerTitle: () => (
          <Text style={[global.fontBold, global.textNormal]}>
            Post Creator System
          </Text>
        ),
        // headerShown: false,
      }}>
      <Stack.Screen name="Main" component={PostCreator} />
    </Stack.Navigator>
  );
};

export const ChatroomStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Workplace"
        component={Workplace}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={ChatroomSetting}
        options={{
          headerLeft: props => {
            return (
              <Pressable
                onPress={props.onPress}
                style={{paddingHorizontal: 15}}>
                <Icon name="chevron-back" size={26} color="black" />
              </Pressable>
            );
          },
          headerTitleAlign: 'center',
          title: <Text style={[global.fontBold]}>Settings</Text>,
        }}
      />
    </Stack.Navigator>
  );
};

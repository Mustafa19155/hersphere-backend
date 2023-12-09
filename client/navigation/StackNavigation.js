import {createStackNavigator} from '@react-navigation/stack';
import UserProfiling from '../screens/UserProfiling/UserProfiling';
import PersonalInfo from '../screens/UserProfiling/PersonalInfo';
import SoicalAccounts from '../screens/UserProfiling/SoicalAccounts';
import Security from '../screens/UserProfiling/Security';
import BusinessInfo from '../screens/UserProfiling/BusinessInfo';
import Search from '../components/Search/Search';
import UserProfile from '../screens/Search/UserProfile';

const Stack = createStackNavigator();
export default function UserProfilingStack() {
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
import {Pressable} from 'react-native';
import SendRequest from '../screens/Search/SendRequest';
import Chats from '../screens/Chat/Chats';
import Chat from '../screens/Chat/Chat';
import Requests from '../screens/Requests/Requests';
import RequestDetails from '../screens/Requests/RequestDetails';

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
      <Stack.Screen
        name="Requests"
        component={Requests}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

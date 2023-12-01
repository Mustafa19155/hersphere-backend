import {createStackNavigator} from '@react-navigation/stack';
import UserProfiling from '../screens/UserProfiling/UserProfiling';
import PersonalInfo from '../screens/UserProfiling/PersonalInfo';
import SoicalAccounts from '../screens/UserProfiling/SoicalAccounts';
import Security from '../screens/UserProfiling/Security';
import BusinessInfo from '../screens/UserProfiling/BusinessInfo';

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

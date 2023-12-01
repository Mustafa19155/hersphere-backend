import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import global from '../../assets/styles/global';
import {Button} from 'react-native-paper';
import {AuthContext} from '../../contexts/userContext';

const UserProfiling = () => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  return (
    <View
      style={[
        styles.container,
        {flexDirection: 'column', justifyContent: 'space-between'},
      ]}>
      <View style={{gap: 12}}>
        <TouchableWithoutFeedback
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('PersonalInfo')}>
          <Text style={styles.text}>Personal Information</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('BusinessInfo')}>
          <Text style={styles.text}>Business Information</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          style={styles.btnWrapper}
          onPress={() => navigation.navigate('SocialAccounts')}>
          <Text style={styles.text}>Social Accounts</Text>
        </TouchableWithoutFeedback>
        {user?.source != 'google' && (
          <TouchableWithoutFeedback
            style={styles.btnWrapper}
            onPress={() => navigation.navigate('Security')}>
            <Text style={styles.text}>Security</Text>
          </TouchableWithoutFeedback>
        )}
      </View>
      <Button style={[global.redButton, {width: '70%', alignSelf: 'center'}]}>
        <Text style={[global.redButtonText]}>Delete Account</Text>
      </Button>
    </View>
  );
};

export default UserProfiling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  btnWrapper: {
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});

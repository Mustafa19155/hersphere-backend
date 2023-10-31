import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const UserProfiling = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
      <TouchableWithoutFeedback
        style={styles.btnWrapper}
        onPress={() => navigation.navigate('Security')}>
        <Text style={styles.text}>Security</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default UserProfiling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  btnWrapper: {
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});

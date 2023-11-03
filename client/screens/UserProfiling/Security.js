import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../contexts/userContext';
import {Button, TextInput} from 'react-native-paper';
import global from '../../assets/styles/global';
import {updatePassword} from '../../api/user';

const Security = () => {
  const {user, setuser} = useContext(AuthContext);
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmNewPassword, setconfirmNewPassword] = useState('');

  const handleUpdatePassword = () => {
    if (currentPassword && newPassword && confirmNewPassword) {
      if (newPassword == confirmNewPassword) {
        updatePassword({currentPassword, newPassword})
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsWrapper}>
        {/* <Text style={[global.textSmall, global.fontBold, global.blackColor]}>
            Current Password
          </Text> */}
        <TextInput
          label="Current Password"
          mode="flat"
          underlineColor="transparent"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          value={currentPassword}
          onChangeText={setcurrentPassword}
        />
        <TextInput
          label="New Password"
          mode="flat"
          underlineColor="transparent"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          value={newPassword}
          onChangeText={setnewPassword}
        />
        <TextInput
          label="Confirm New Password"
          mode="flat"
          underlineColor="transparent"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          value={confirmNewPassword}
          onChangeText={setconfirmNewPassword}
        />
      </View>
      <Button style={[global.greenBtn]} onPress={handleUpdatePassword}>
        <Text style={[global.greenBtnText]}>Update Password</Text>
      </Button>
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  inputsWrapper: {
    gap: 12,
  },
});

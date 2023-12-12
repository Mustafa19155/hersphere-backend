import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/userContext';
import {Button, TextInput} from 'react-native-paper';
import global from '../../assets/styles/global';
import {updatePassword} from '../../api/user';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {useToast} from 'react-native-toast-notifications';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Security = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmNewPassword, setconfirmNewPassword] = useState('');
  const [apiCalled, setapiCalled] = useState(false);

  const handleUpdatePassword = () => {
    if (currentPassword && newPassword && confirmNewPassword) {
      if (newPassword == confirmNewPassword) {
        setapiCalled(true);
        updatePassword({currentPassword, newPassword})
          .then(res => {
            setapiCalled(false);
            toast.show('Password updated', {type: 'danger'});
          })
          .catch(err => {
            setapiCalled(false);
            toast.show('Old password is not correct', {type: 'danger'});
          });
      } else {
        toast.show('Passwords donot match', {type: 'danger'});
      }
    }
  };

  useEffect(() => {
    navigation.getParent().setOptions({headerShown: false});
    return () => {
      navigation.getParent().setOptions({headerShown: true});
    };
  }, []);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.inputsWrapper}>
          <Text style={[global.fontBold, global.textSmall]}>
            Update Password
          </Text>
          <View>
            <TextInput
              value={currentPassword}
              onChangeText={setcurrentPassword}
              placeholder="Old Password"
              mode="outlined"
              secureTextEntry
              outlineColor="black"
              activeOutlineColor="black"
              style={styles.input}
              outlineStyle={{borderRadius: 10}}
            />
            <FontAwesome5Icons
              name="pen"
              color="gray"
              size={16}
              style={{right: 10, position: 'absolute', top: '40%'}}
            />
          </View>
          <View>
            <TextInput
              value={newPassword}
              onChangeText={setnewPassword}
              placeholder="New Password"
              mode="outlined"
              secureTextEntry
              outlineColor="black"
              activeOutlineColor="black"
              style={styles.input}
              outlineStyle={{borderRadius: 10}}
            />
            <FontAwesome5Icons
              name="pen"
              color="gray"
              size={16}
              style={{right: 10, position: 'absolute', top: '40%'}}
            />
          </View>
          <View>
            <TextInput
              value={confirmNewPassword}
              onChangeText={setconfirmNewPassword}
              placeholder="Confirm Password"
              mode="outlined"
              secureTextEntry
              outlineColor="black"
              activeOutlineColor="black"
              style={styles.input}
              outlineStyle={{borderRadius: 10}}
            />
            <FontAwesome5Icons
              name="pen"
              color="gray"
              size={16}
              style={{right: 10, position: 'absolute', top: '40%'}}
            />
          </View>
          <Button
            disabled={apiCalled}
            style={[global.greenBtn, {marginTop: 20}]}
            onPress={handleUpdatePassword}>
            <Text style={[global.greenBtnText]}>
              {apiCalled ? 'Loading...' : 'Update Password'}
            </Text>
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Security;

const styles = StyleSheet.create({
  input: {
    padding: 5,
  },

  container: {
    flex: 1,
    marginTop: 20,
  },
  inputsWrapper: {
    gap: 16,
  },
});

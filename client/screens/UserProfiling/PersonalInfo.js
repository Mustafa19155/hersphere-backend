import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../contexts/userContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, TextInput} from 'react-native-paper';
import ContinueButton from '../../components/profileSetup/ContinueButton';

const PersonalInfo = () => {
  const {user, setuser} = useContext(AuthContext);

  const [imageUri, setImageUri] = useState(user?.profileImage);
  const [username, setusername] = useState(user?.username);
  const [email, setemail] = useState(user?.email);

  const selectImage = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleInfoUpdate = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage}>
        <Image source={{uri: imageUri}} style={styles.image} />
      </TouchableOpacity>

      <TextInput
        value={username}
        onChangeText={setusername}
        label="Username"
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setemail}
        label="Email"
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
      />
      <ContinueButton
        text={'Update Details'}
        clickHandler={handleInfoUpdate}
        isValidStep={true}
      />
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    gap: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../contexts/userContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, TextInput} from 'react-native-paper';
import ContinueButton from '../../components/profileSetup/ContinueButton';
import global from '../../assets/styles/global';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {storage} from '../../firebase';
import {updateProfile} from '../../api/user';

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

  const handleInfoUpdate = async () => {
    try {
      const data = {
        username,
      };
      if (imageUri != user.profileImage) {
        try {
          deleteObject(ref(storage, user.profileImage));
        } catch (err) {}
        const res = await fetch(imageUri);
        const blob = await res.blob();

        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

        const mainRef = ref(storage, `profiles/${Date.now()}-${filename}`);

        await uploadBytes(mainRef, blob);

        const downloadimg = await getDownloadURL(mainRef);
        data['profileImage'] = downloadimg;
      }
      await updateProfile({data});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={[global.container, {justifyContent: 'space-between'}]}>
      <View style={{gap: 20}}>
        <TouchableOpacity onPress={selectImage}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </TouchableOpacity>

        <TextInput
          value={username}
          onChangeText={setusername}
          label="Username"
          underlineColor="transparent"
          style={styles.input}
        />
        <TextInput
          disabled
          value={email}
          onChangeText={setemail}
          label="Email"
          underlineColor="transparent"
          style={styles.input}
          keyboardType="email-address"
        />
      </View>
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
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

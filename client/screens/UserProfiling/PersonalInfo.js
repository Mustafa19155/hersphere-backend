import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/userContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, TextInput} from 'react-native-paper';
import ContinueButton from '../../components/profileSetup/ContinueButton';
import global from '../../assets/styles/global';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {storage} from '../../firebase';
import {updateProfile} from '../../api/user';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {useToast} from 'react-native-toast-notifications';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const PersonalInfo = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  const [imageUri, setImageUri] = useState(user?.profileImage);
  const [username, setusername] = useState(user?.username);
  const [email, setemail] = useState(user?.email);
  const [apiCalled, setapiCalled] = useState(false);

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
      setapiCalled(true);
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
      toast.show('Information Updated', {type: 'success'});
      setapiCalled(false);
    } catch (err) {
      setapiCalled(false);
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
      <View style={[{justifyContent: 'space-between', marginTop: 20}]}>
        <View style={{gap: 20}}>
          <TouchableOpacity onPress={selectImage}>
            <Image source={{uri: imageUri}} style={styles.image} />
          </TouchableOpacity>
          <View style={{gap: 30}}>
            <View style={{gap: 10}}>
              <Text style={[global.fontBold, global.textSmall]}>Username</Text>
              <View>
                <TextInput
                  value={username}
                  onChangeText={setusername}
                  mode="outlined"
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
            </View>
            <View style={{gap: 10}}>
              <Text style={[global.fontBold, global.textSmall]}>Email</Text>
              <View>
                <TextInput
                  disabled
                  value={email}
                  onChangeText={setemail}
                  mode="outlined"
                  outlineColor="black"
                  activeOutlineColor="black"
                  style={styles.input}
                  outlineStyle={{borderRadius: 10}}
                  keyboardType="email-address"
                />
                <FontAwesome5Icons
                  name="pen"
                  color="gray"
                  size={16}
                  style={{right: 10, position: 'absolute', top: '40%'}}
                />
              </View>
            </View>
          </View>
          <Pressable
            onPress={handleInfoUpdate}
            disabled={apiCalled}
            style={[global.greenBtn, {paddingVertical: 15, marginTop: 15}]}>
            <Text style={[global.greenBtnText, {alignSelf: 'center'}]}>
              {apiCalled ? 'Loading...' : 'Update'}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  input: {
    padding: 5,
  },
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

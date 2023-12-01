import React, {useState, useEffect, useContext} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {db, storage} from '../../firebase';
import {AuthContext} from '../../contexts/userContext';
import global from '../../assets/styles/global';

const AddPhoto = ({isValidStep, setisValidStep, setcurrentStep}) => {
  const [imageUri, setImageUri] = useState(null);

  const {user, setuser} = useContext(AuthContext);

  useEffect(() => {
    if (imageUri) {
      handleUpload();
      setisValidStep(true);
    } else {
      setisValidStep(false);
    }
  }, [imageUri]);

  const selectImage = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    try {
      if (imageUri) {
        const res = await fetch(imageUri);
        const blob = await res.blob();

        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

        const mainRef = ref(storage, `profiles/${filename}`);

        await uploadBytes(mainRef, blob);

        const downloadimg = await getDownloadURL(mainRef);

        setuser({...user, profileImage: downloadimg});
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (user && user.profileImage) {
      setImageUri(user.profileImage);
      // setcurrentStep(prev => prev + 1);
      setisValidStep(true);
    } else {
      setisValidStep(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Text style={[styles.heading, global.textSmall]}>Add a photo</Text>
          <Icon name="camera" size={22} color="#000" />
        </View>
        <Text style={[global.textSmall, styles.subheading]}>
          Add your photo to be recognised in the app
        </Text>
      </View>

      {imageUri ? (
        <TouchableOpacity onPress={selectImage}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <View style={styles.imgPlaceholder}>
          <Icon name="user" onPress={selectImage} size={124} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headingWrapper: {
    flexDirection: 'column',
    gap: 7,
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subheading: {
    color: 'gray',
  },
  imgPlaceholder: {
    opacity: 0.2,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: 'gray',
    borderRadius: 100,
  },
  container: {
    marginTop: 50,
  },
  image: {
    width: 124,
    height: 124,
    resizeMode: 'cover',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default AddPhoto;

import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {db, storage} from '../../firebase';
import {doc} from 'firebase/firestore';

const AddPhoto = ({isValidStep, setisValidStep}) => {
  const [imageUri, setImageUri] = useState(null);

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
      console.log(imageUri);
      if (imageUri) {
        const res = await fetch(imageUri);
        console.log(res);
        const blob = res.blob();
        // const imageRef = ref(storage, `profiles/userId`);
        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        console.log(filename);
        const ref = firebase.storage().ref().child(filename).put(blob);
        try {
          await ref;
        } catch (e) {
          console.log(e);
        }

        // console.log(filename)
        // await uploadBytes(imageRef, filename);
        // const downloadimg = await getDownloadURL(imageRef);
        // const updatedocument = doc(db, 'Users', userData.id);
        // await updateDoc(updatedocument, {
        //   picture: downloadimg,
        // });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //called when continue is clicked
  // useEffect(
  //   () => () => {
  //     handleUpload();
  //   },
  //   [],
  // );

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <Text style={styles.heading}>Add a photo</Text>
          <Icon name="camera" size={35} color="#000" />
        </View>
        <Text style={styles.subheading}>
          Add your photo to be recognised in the app
        </Text>
      </View>
      {imageUri ? (
        <TouchableOpacity onPress={selectImage}>
          <Image source={{uri: imageUri}} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <View style={styles.imgPlaceholder}>
          <Icon name="user" onPress={selectImage} size={170} />
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
    fontSize: 18,
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
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default AddPhoto;

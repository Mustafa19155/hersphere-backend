import React, {useState} from 'react';
import {View, Button, Image} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import {verifyGender} from '../../api/user';

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        // setImage(response.assets[0].uri);
        uploadImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = uri => {
    const formData = new FormData();

    formData.append('image', {
      uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    verifyGender({data: formData})
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* {image && (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
      )} */}
      <Button title="Take Picture" onPress={pickImage} />
    </View>
  );
}

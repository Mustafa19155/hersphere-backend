import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {RequestContext} from '../../contexts/requestContext';
import {TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

const ContentUpload = () => {
  const {data, setdata} = useContext(RequestContext);

  const selectImage = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      setdata([...data, result.assets[0].uri]);
    }
  };

  return (
    <View>
      <View>
        <Text>Facebook / Instagram Content</Text>
        <Text>Caption</Text>
        <TextInput />
        <Text>Media</Text>
        <TouchableWithoutFeedback onPress={selectImage}>
          <Text>Upload Content</Text>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <Text>Youtube Content</Text>
        <Text>Thumbnail</Text>
        <TextInput />
        <Text>Media</Text>
        <TouchableWithoutFeedback onPress={selectImage}>
          <Text>Upload Content</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default ContentUpload;

const styles = StyleSheet.create({});

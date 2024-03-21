import {
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import global from '../../assets/styles/global';
import AntDesigns from 'react-native-vector-icons/AntDesign';

const AddImage = ({template, settemplate, setcurrentShow}) => {
  const changeBackground = async () => {
    try {
      const result = await launchImageLibrary();
      if (!result.didCancel) {
        const templateCopy = {...template};
        templateCopy.background = result.assets[0].uri;
        settemplate(templateCopy);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadNewImg = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      settemplate({
        ...template,
        images: [
          ...template.images,
          {
            x: 0,
            y: 0,
            height: 100,
            width: 100,
            zIndex: 1,
            source: result.assets[0].uri,
            type: 'image',
          },
        ],
      });
    }
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setcurrentShow(null)}>
        <AntDesigns size={15} name="left" />
      </TouchableWithoutFeedback>
      <View style={{flexDirection: 'row', gap: 20, marginTop: 10}}>
        <Pressable onPress={changeBackground} style={styles.button}>
          <Text style={[global.textSmall, global.fontBold, {color: 'white'}]}>
            Update Background
          </Text>
        </Pressable>
        <Pressable onPress={uploadNewImg} style={styles.button}>
          <Text style={[global.textSmall, global.fontBold, {color: 'white'}]}>
            Upload Photo
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  button: [
    global.greenBack,
    {
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
      height: 50,
      borderRadius: 10,
    },
  ],
});

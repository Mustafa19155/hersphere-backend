import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import global from '../../assets/styles/global';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageRender from './ImageRender';
import TextRender from './TextRender';

const Template = ({mainTemplate}) => {
  const [selectedIndex, setselectedIndex] = useState(-1);

  const [template, settemplate] = useState(null);

  const selectImage = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      const templateCopy = {...template};
      templateCopy.background = result.assets[0].uri;
      settemplate(templateCopy);
      setshowUpperBar(false);
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
            height: Dimensions.get('screen').height / 7,
            width: Dimensions.get('screen').width / 3,
            zIndex: 1,
            source: result.assets[0].uri,
            type: 'image',
          },
        ],
      });
    }
  };

  const uploadNewTextField = async () => {
    settemplate({
      ...template,
      images: [
        ...template.images,
        {
          x: 0,
          y: 0,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          zIndex: 1,
          text: 'This is sample Text',
          fontSize: 20,
          color: 'black',
          type: 'text',
        },
      ],
    });
  };

  useEffect(() => {
    settemplate(mainTemplate);
  }, [mainTemplate]);

  return (
    <>
      {template && (
        <>
          <Pressable
            style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}
            onPress={() => setselectedIndex(-3)}>
            <Pressable
              style={[
                global.gray2Back,
                {
                  borderWidth: selectedIndex == -2 ? 2 : 0,
                  borderColor: 'red',
                  width: template.width,
                  height: template.height,
                  alignSelf: 'center',
                  overflow: 'hidden',
                },
              ]}>
              {template.images.map((img, index) => (
                <>
                  {img.type == 'image' ? (
                    <ImageRender
                      img={img}
                      index={index}
                      selectedIndex={selectedIndex}
                      setselectedIndex={setselectedIndex}
                      template={template}
                      settemplate={settemplate}
                    />
                  ) : (
                    <TextRender
                      img={img}
                      index={index}
                      selectedIndex={selectedIndex}
                      setselectedIndex={setselectedIndex}
                      template={template}
                      settemplate={settemplate}
                    />
                  )}
                </>
              ))}
              <ImageBackground
                source={{uri: template.background}}
                style={{width: '100%', height: '100%', zIndex: -1}}>
                <Pressable
                  style={{width: '100%', height: '100%'}}
                  onPress={() => setselectedIndex(-2)}
                  onLongPress={selectImage}></Pressable>
              </ImageBackground>
            </Pressable>
            <View style={{flexDirection: 'row', gap: 10, marginVertical: 10}}>
              <Pressable
                onPress={uploadNewImg}
                style={[global.greenBtn, {padding: 20}]}>
                <Text style={[global.greenBtnTextSm]}>Upload Photo</Text>
              </Pressable>
              <Pressable
                onPress={uploadNewTextField}
                style={[global.greenBtn, {padding: 20}]}>
                <Text style={[global.greenBtnTextSm]}>Add new text</Text>
              </Pressable>
            </View>
          </Pressable>
        </>
      )}
    </>
  );
};

export default Template;

const styles = StyleSheet.create({});

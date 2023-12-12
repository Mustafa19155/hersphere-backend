import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Draggable from 'react-native-draggable';
import Avatar from '../../assets/images/avatar.png';
import global from '../../assets/styles/global';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageRender from '../../components/PostCreator/ImageRender';
import TextRender from '../../components/PostCreator/TextRender';
import ResizableView from './Resize';

const PostCreator = () => {
  const [selectedIndex, setselectedIndex] = useState(-1);

  const [template, settemplate] = useState({
    background:
      'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
    images: [
      {
        x: 0,
        y: 0,
        height: 100,
        width: 100,
        zIndex: 1,
        source:
          'https://images.unsplash.com/photo-1682687982029-edb9aecf5f89?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        type: 'image',
      },
      {
        x: 20,
        y: 20,
        height: 100,
        width: 100,
        zIndex: 1,
        source:
          'https://plus.unsplash.com/premium_photo-1698057772115-954a2e4ffec0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
        type: 'image',
      },
      {
        x: 20,
        y: 20,
        zIndex: 999,
        height: 100,
        width: 100,
        text: 'This is sample Text',
        fontSize: 20,
        color: 'black',
        type: 'text',
      },
    ],
  });

  const imagesRef = template.images.map(() => useRef(null));

  const selectImage = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      const templateCopy = {...template};
      templateCopy.background = result.assets[0].uri;
      settemplate(templateCopy);
      setshowUpperBar(false);
    }
  };

  //   useEffect(() => {
  //     imagesRef[0].current.measure((x, y, width, height, pageX, pageY) => {
  //       console.log(
  //         `View ${1} - x: ${pageX}, y: ${pageY}, width: ${width}, height: ${height}`,
  //       );
  //     });
  //   }, [imagesRef]);

  return (
    <Pressable
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      onPress={() => setselectedIndex(-3)}>
      {/* <ResizableView /> */}
      <Pressable
        style={[
          global.gray2Back,
          {
            borderWidth: selectedIndex == -2 ? 2 : 0,
            borderColor: 'red',
            width: '85%',
            height: '60%',
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
    </Pressable>
  );
};

export default PostCreator;

const styles = StyleSheet.create({});

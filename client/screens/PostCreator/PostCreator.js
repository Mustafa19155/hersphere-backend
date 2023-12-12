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
import ImageRender from '../../components/PostCreator/ImageRender';
import TextRender from '../../components/PostCreator/TextRender';
import Template from '../../components/PostCreator/Template';
import TemplatesPreview from '../../components/PostCreator/TemplatesPreview';

const PostCreator = () => {
  const [templates, settemplates] = useState([
    {
      height: Dimensions.get('screen').height / 1.7,
      width: Dimensions.get('screen').width / 1.2,
      background:
        'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
      images: [
        {
          x: 0,
          y: 0,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          zIndex: 1,
          source:
            'https://images.unsplash.com/photo-1682687982029-edb9aecf5f89?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          type: 'image',
        },
        {
          x: 50,
          y: 20,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          zIndex: 1,
          source:
            'https://plus.unsplash.com/premium_photo-1698057772115-954a2e4ffec0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
          type: 'image',
        },
        {
          x: 20,
          y: 20,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: 'This is sample Text',
          fontSize: Dimensions.get('screen').width / 15,
          color: 'black',
          type: 'text',
        },
      ],
    },
  ]);

  const [activeTemplate, setactiveTemplate] = useState(templates[0]);

  return (
    <View style={{flex: 1}}>
      <Template mainTemplate={activeTemplate} />
      <TemplatesPreview
        templates={templates}
        activeTemplate={activeTemplate}
        setactiveTemplate={setactiveTemplate}
      />
    </View>
  );
};

export default PostCreator;

const styles = StyleSheet.create({});

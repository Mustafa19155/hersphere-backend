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
import TextsPreview from '../../components/PostCreator/TextsPreview';
import Backgrounds from '../../components/PostCreator/Backgrounds';

const PostCreator = () => {
  const [activeTab, setactiveTab] = useState('templates');

  const [templates, settemplates] = useState([
    {
      id: 1,
      height: Dimensions.get('screen').height / 1.7,
      width: Dimensions.get('screen').width / 1.2,
      background:
        'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
      images: [
        {
          x: 100,
          y: 0,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          zIndex: 1,
          source:
            'https://images.unsplash.com/photo-1682687982029-edb9aecf5f89?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
          y: 50,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: 'This is sample Text 333',
          fontSize: Dimensions.get('screen').width / 15,
          color: 'black',
          type: 'text',
        },
      ],
    },
    {
      id: 2,
      height: Dimensions.get('screen').height / 1.7,
      width: Dimensions.get('screen').width / 1.2,
      background:
        'https://images.unsplash.com/photo-1701989927884-ad1005d0eeb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
      images: [
        {
          x: 0,
          y: 100,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          zIndex: 1,
          source:
            'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8',
          type: 'image',
        },
        {
          x: 20,
          y: 20,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: 'This is sample Text2',
          fontSize: Dimensions.get('screen').width / 15,
          color: 'black',
          type: 'text',
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
      ],
    },
  ]);

  const [activeTemplate, setactiveTemplate] = useState(
    JSON.parse(JSON.stringify(templates[0])),
  );
  const [selectedIndex, setselectedIndex] = useState(-1);
  const [key, setkey] = useState(Math.random() * 10);
  const prevActiveTemplateRef = useRef(activeTemplate);

  useEffect(() => {
    if (activeTemplate.id != prevActiveTemplateRef.current.id) {
      setkey(Math.random() * 10);
    }
    // const updatedProperties = Object.keys(activeTemplate).filter(
    //   key => activeTemplate[key] !== prevActiveTemplateRef.current[key],
    // );

    // if (updatedProperties.length > 0) {
    //   // if (updatedProperties.find(p => p == 'background')) {
    //   //   setkey(Math.random() * 10);
    //   // }
    // }
    // prevActiveTemplateRef.current = {...activeTemplate};
  }, [activeTemplate]);

  return (
    <View style={{flex: 1, padding: 10}}>
      {/* <Template mainTemplate={activeTemplate} /> */}
      <>
        {activeTemplate && (
          <>
            <Pressable
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
              onPress={() => setselectedIndex(-3)}>
              <Pressable
                style={[
                  global.gray2Back,
                  {
                    borderWidth: selectedIndex == -2 ? 0 : 0,
                    borderColor: 'red',
                    width: activeTemplate.width,
                    height: activeTemplate.height,
                    alignSelf: 'center',
                    overflow: 'hidden',
                  },
                ]}>
                {activeTemplate.images.map((img, index) => (
                  <View key={key + index}>
                    {img.type == 'image' ? (
                      <ImageRender
                        img={img}
                        index={index}
                        selectedIndex={selectedIndex}
                        setselectedIndex={setselectedIndex}
                        template={activeTemplate}
                        settemplate={setactiveTemplate}
                      />
                    ) : (
                      <TextRender
                        img={img}
                        index={index}
                        selectedIndex={selectedIndex}
                        setselectedIndex={setselectedIndex}
                        template={activeTemplate}
                        settemplate={setactiveTemplate}
                      />
                    )}
                  </View>
                ))}
                <ImageBackground
                  source={{uri: activeTemplate.background}}
                  style={{width: '100%', height: '100%', zIndex: -1}}>
                  <Pressable
                    style={{width: '100%', height: '100%'}}
                    onPress={() => setselectedIndex(-2)}
                    // onLongPress={selectImage}
                  ></Pressable>
                </ImageBackground>
              </Pressable>
            </Pressable>
          </>
        )}
      </>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Pressable onPress={() => setactiveTab('templates')}>
          <Text
            style={[
              global.fontBold,
              global.textSmall,
              {
                textDecorationLine:
                  activeTab == 'templates' ? 'underline' : 'none',
              },
            ]}>
            Templates
          </Text>
        </Pressable>
        <Pressable onPress={() => setactiveTab('texts')}>
          <Text
            style={[
              global.fontBold,
              global.textSmall,
              {
                textDecorationLine: activeTab == 'texts' ? 'underline' : 'none',
              },
            ]}>
            Texts
          </Text>
        </Pressable>
        <Pressable onPress={() => setactiveTab('images')}>
          <Text
            style={[
              global.fontBold,
              global.textSmall,
              {
                textDecorationLine:
                  activeTab == 'images' ? 'underline' : 'none',
              },
            ]}>
            Images
          </Text>
        </Pressable>
      </View>
      <View style={{height: 70}}>
        {activeTab == 'templates' ? (
          <TemplatesPreview
            templates={templates}
            activeTemplate={activeTemplate}
            setactiveTemplate={setactiveTemplate}
          />
        ) : activeTab == 'texts' ? (
          <TextsPreview
            template={activeTemplate}
            settemplate={setactiveTemplate}
          />
        ) : (
          <Backgrounds
            template={activeTemplate}
            settemplate={setactiveTemplate}
          />
        )}
      </View>
    </View>
  );
};

export default PostCreator;

const styles = StyleSheet.create({});

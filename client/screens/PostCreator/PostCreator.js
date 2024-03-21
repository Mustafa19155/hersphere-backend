import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import global from '../../assets/styles/global';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageRender from '../../components/PostCreator/ImageRender';
import TextRender from '../../components/PostCreator/TextRender';
import Template from '../../components/PostCreator/Template';
import TemplatesPreview from '../../components/PostCreator/TemplatesPreview';
import TextsPreview from '../../components/PostCreator/TextsPreview';
import Backgrounds from '../../components/PostCreator/Backgrounds';
import {captureRef} from 'react-native-view-shot';
import {getDownloadURL, ref, uploadBytes, uploadString} from 'firebase/storage';
import {storage} from '../../firebase';
import {PostCreatorContext} from '../../contexts/postCreatorContext';
import AddCaption from '../../components/PostCreator/AddCaption';
import {Button} from 'react-native-paper';
import Templates from '../../components/PostCreator/Templates';
import AddImage from '../../components/PostCreator/AddImage';
import {getPromotion} from '../../api/promotion';

const PostCreator = ({route}) => {
  const templateHeight = Dimensions.get('screen').height / 1.7;
  const templateWidth = Dimensions.get('screen').width / 1.2;

  const [activeTab, setactiveTab] = useState('templates');

  const {imageUrl, setimageUrl, setrequestData} =
    useContext(PostCreatorContext);

  const postRef = useRef();

  const [templates, settemplates] = useState([
    {
      id: 1,
      name: 'Beige Forest Design',
      type: 'instagram',
      height: templateHeight,
      width: templateWidth,
      background: require('../../assets/templates/template1/back.png'),
      // 'https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg',
      images: [
        {
          x: 20,
          y: 150,
          height: Dimensions.get('screen').width / 1.7,
          width: Dimensions.get('screen').width / 2,
          zIndex: 1,
          source: require('../../assets/templates/template1/img1.png'),
          // 'https://images.unsplash.com/photo-1682687982029-edb9aecf5f89?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          type: 'image',
        },
        {
          x: 120,
          y: 200,
          height: Dimensions.get('screen').width / 4,
          width: Dimensions.get('screen').width / 2,
          zIndex: 1,
          source: require('../../assets/templates/template1/img2.png'),
          // 'https://plus.unsplash.com/premium_photo-1698057772115-954a2e4ffec0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
          type: 'image',
        },
        {
          x: -20,
          y: 85,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          zIndex: 1,
          source: require('../../assets/templates/template1/img3.png'),
          // 'https://images.unsplash.com/photo-1682687982029-edb9aecf5f89?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          type: 'image',
        },
        {
          x: 130,
          y: 240,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: 170,
          text: 'ALL ITEM DISCOUNTED 50% OR MORE !! SHOP NOW',
          fontSize: 12,
          color: 'black',
          type: 'text',
        },
        {
          x: 27,
          y: 170,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: 200,
          text: 'WINTER SEASON\nOFFERS',
          fontSize: 22,
          color: 'black',
          type: 'text',
        },
      ],
    },
    {
      id: 2,
      name: 'Beige Forest Design',
      type: 'instagram',
      height: templateHeight,
      width: templateWidth,
      background: require('../../assets/templates/template2/back.png'),
      // 'https://images.unsplash.com/photo-1701989927884-ad1005d0eeb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
      images: [
        {
          x: 20,
          y: 25,
          height: Dimensions.get('screen').height / 9,
          width: Dimensions.get('screen').width / 1.6,
          zIndex: 2,
          source: require('../../assets/templates/template2/img1.png'),
          // 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8',
          type: 'image',
        },
        {
          x: 30,
          y: 20,
          height: Dimensions.get('screen').height / 8,
          width: Dimensions.get('screen').width / 1.4,
          zIndex: 1,
          source: require('../../assets/templates/template2/img2.png'),
          // 'https://plus.unsplash.com/premium_photo-1698057772115-954a2e4ffec0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
          type: 'image',
        },
        {
          x: 30,
          y: 40,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: 'FLAT 20% OFF',
          fontSize: 32,
          color: 'black',
          type: 'text',
        },
        {
          x: 10,
          y: 170,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: 'Special',
          fontSize: 45,
          fontFamily: 'Whisper',
          color: 'black',
          type: 'text',
        },
        {
          x: 210,
          y: 170,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: 'Offer',
          fontSize: 45,
          fontFamily: 'Whisper',
          color: 'black',
          type: 'text',
        },
      ],
    },
    {
      id: 3,
      name: 'Beige Forest Design',
      type: 'instagram',
      height: templateHeight,
      width: templateWidth,
      background: require('../../assets/templates/template2/back.png'),
      // 'https://images.unsplash.com/photo-1701989927884-ad1005d0eeb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8',
      images: [
        {
          x: 20,
          y: 25,
          height: Dimensions.get('screen').height / 9,
          width: Dimensions.get('screen').width / 1.6,
          zIndex: 2,
          source: require('../../assets/templates/template2/img1.png'),
          // 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8',
          type: 'image',
        },
        {
          x: 30,
          y: 20,
          height: Dimensions.get('screen').height / 8,
          width: Dimensions.get('screen').width / 1.4,
          zIndex: 1,
          source: require('../../assets/templates/template2/img2.png'),
          // 'https://plus.unsplash.com/premium_photo-1698057772115-954a2e4ffec0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8',
          type: 'image',
        },
        {
          x: 30,
          y: 40,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: 'FLAT 20% OFF',
          fontSize: 32,
          color: 'black',
          type: 'text',
        },
        {
          x: 10,
          y: 170,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: 'Special',
          fontSize: 45,
          fontFamily: 'Whisper',
          color: 'black',
          type: 'text',
        },
        {
          x: 210,
          y: 170,
          zIndex: 999,
          height: Dimensions.get('screen').height / 7,
          width: Dimensions.get('screen').width / 3,
          text: 'Offer',
          fontSize: 45,
          fontFamily: 'Whisper',
          color: 'black',
          type: 'text',
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
  const [apiCalled, setapiCalled] = useState(false);
  const [currStep, setcurrStep] = useState(1);

  const [currentShow, setcurrentShow] = useState(null);

  const handleContinue = async () => {
    try {
      if (postRef.current) {
        setapiCalled(true);
        const uri = await captureRef(postRef, {
          format: 'png',
          quality: 0.8,
        });

        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `postImages/${Date.now()}.png`);
        await uploadBytes(storageRef, blob);
        setimageUrl(await getDownloadURL(storageRef));
        setapiCalled(false);
        setcurrStep(2);
      }
    } catch (error) {}
  };

  const handleDelete = () => {
    setselectedIndex(-2);
    const templateCopy = {...activeTemplate};
    templateCopy.images[selectedIndex].zIndex = -999;
    templateCopy.images[selectedIndex].opacity = 0;
    setactiveTemplate(templateCopy);
  };

  useEffect(() => {
    if (activeTemplate?.id != prevActiveTemplateRef.current?.id) {
      setkey(Math.random() * 10);
    }
  }, [activeTemplate]);

  const handleGetRequest = () => {
    getPromotion({id: route.params.id})
      .then(res => {
        setrequestData(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetRequest();
  }, []);

  return (
    <View style={{flex: 1, padding: 15, justifyContent: 'space-between'}}>
      <>
        {currStep == 1 ? (
          <>
            <View
              style={{
                height: templateHeight,
                width: templateWidth,
                alignSelf: 'center',
              }}>
              {currentShow == 'templates' && (
                <Templates
                  open={currentShow == 'templates'}
                  setopen={setcurrentShow}
                  templates={templates}
                  setactiveTemplate={setactiveTemplate}
                />
              )}
              {activeTemplate && (
                <>
                  <Pressable
                    ref={postRef}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                    }}
                    onPress={() => setselectedIndex(-3)}>
                    <Pressable
                      style={[
                        global.gray2Back,
                        {
                          height: '100%',
                          width: '100%',
                          borderWidth: selectedIndex == -2 ? 0 : 0,
                          borderColor: 'red',
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
                        source={
                          typeof activeTemplate.background == 'string'
                            ? {uri: activeTemplate.background}
                            : activeTemplate.background
                        }
                        style={{width: '100%', height: '100%', zIndex: -1}}>
                        <Pressable
                          style={{width: '100%', height: '100%'}}
                          onPress={() => setselectedIndex(-2)}></Pressable>
                      </ImageBackground>
                    </Pressable>
                  </Pressable>
                </>
              )}
            </View>
            {currentShow == 'texts' ? (
              <>
                <TextsPreview
                  setcurrentShow={setcurrentShow}
                  activeTemplate={activeTemplate}
                  setactiveTemplate={setactiveTemplate}
                  templates={templates}
                  template={activeTemplate}
                  settemplate={setactiveTemplate}
                />
              </>
            ) : currentShow == 'images' ? (
              <>
                <AddImage
                  template={activeTemplate}
                  settemplate={setactiveTemplate}
                  setcurrentShow={setcurrentShow}
                />
              </>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableWithoutFeedback
                  onPress={() => setcurrentShow('templates')}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height: 30}}>
                      <Image
                        source={require('../../assets/icons/post-creator/template.png')}
                      />
                    </View>
                    <Text>Templates</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setcurrentShow('texts')}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height: 30}}>
                      <Image
                        source={require('../../assets/icons/post-creator/text.png')}
                      />
                    </View>
                    <Text>Text</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setcurrentShow('images')}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height: 30}}>
                      <Image
                        source={require('../../assets/icons/post-creator/back.png')}
                      />
                    </View>
                    <Text>Image</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  disabled={selectedIndex == -2}
                  onPress={handleDelete}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{height: 30}}>
                      <Image
                        source={require('../../assets/icons/post-creator/delete.png')}
                      />
                    </View>
                    <Text>Delete</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
            {/* <View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  marginBottom: 10,
                  justifyContent: 'space-between',
                  width: '90%',
                  alignSelf: 'center',
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
                        textDecorationLine:
                          activeTab == 'texts' ? 'underline' : 'none',
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
            </View> */}
            <Button
              disabled={apiCalled}
              onPress={handleContinue}
              style={[global.greenBtn, {alignItems: 'center'}]}>
              <Text style={[global.greenBtnText]}>
                {apiCalled ? 'Loading...' : 'Continue'}
              </Text>
            </Button>
          </>
        ) : (
          <AddCaption />
        )}
      </>
    </View>
  );
};

export default PostCreator;

const styles = StyleSheet.create({});

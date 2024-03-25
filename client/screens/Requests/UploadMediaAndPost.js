import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {getPromotion, startPromotion} from '../../api/promotion';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import global from '../../assets/styles/global';
import {Button, Checkbox, TextInput} from 'react-native-paper';
import {
  postOnFacebook,
  postOnInstagram,
  postOnYoutube,
} from '../../api/socialmediaPosts';
import {AuthContext} from '../../contexts/userContext';
import {useToast} from 'react-native-toast-notifications';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {storage} from '../../firebase';

const UploadMediaAndPost = ({route}) => {
  const [loading, setloading] = useState(false);
  const [request, setrequest] = useState(null);
  const [facebookImage, setfacebookImage] = useState(null);
  const [facebookCaption, setfacebookCaption] = useState('');
  const [youtubeTitle, setyoutubeTitle] = useState('');
  const [youtubeImage, setyoutubeImage] = useState(null);
  const [youtubeCaption, setyoutubeCaption] = useState('');
  const [youtubeType, setyoutubeType] = useState('video');
  const [readOnly, setreadOnly] = useState(false);
  const [apiCalled, setapiCalled] = useState(false);

  const navigation = useNavigation();
  const toast = useToast();

  const {user} = useContext(AuthContext);

  const {id} = route.params;

  const handleGet = () => {
    setloading(true);
    getPromotion({id})
      .then(res => {
        if (res.allowInfluencerToAddData) {
          setreadOnly(false);
        } else {
          if (res.content.facebook) {
            setfacebookCaption(res.content.facebook.caption);
            setfacebookImage(res.content.facebook.content);
          }
          if (res.content.youtube) {
            setyoutubeCaption(res.content.youtube.caption);
            setyoutubeImage(res.content.youtube.content);
          }
          setreadOnly(true);
        }
        setrequest(res);
        setloading(false);
      })
      .catch(err => {
        console.log(err);
        setloading(false);
      });
  };

  const selectFacebookImage = async () => {
    try {
      const result = await launchImageLibrary();
      if (!result.didCancel) {
        setfacebookImage(result.assets[0].uri);
      }
    } catch (err) {}
  };

  const handleSelectYoutubeImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: youtubeType == 'video' ? 'video' : 'video',
      });
      if (!result.didCancel) {
        setyoutubeImage(result.assets[0].uri);
      }
    } catch (err) {}
  };

  const handlePost = async () => {
    try {
      setapiCalled(true);
      if (
        request.platforms.includes('facebook') ||
        request.platforms.includes('instagram')
      ) {
        if (!facebookCaption || !facebookImage) {
          setapiCalled(false);
          return toast.show('Please fill all fields for facebook/instagram', {
            type: 'danger',
          });
        }
      }

      // upload image to firebase and get url

      const response = await fetch(facebookImage);
      const blob = await response.blob();
      const storageRef = ref(storage, `postImages/${Date.now()}.png`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);

      if (request.platforms.includes('facebook')) {
        await postOnFacebook({
          pageId: user.facebookPage.id,
          accessToken: user.facebookPage.access_token,
          message: facebookCaption,
          url,
        });
      }
      if (request.platforms.includes('instagram')) {
        await postOnInstagram({
          facebookAccessToken: user.instagramPage.token,
          instagramAccountId: user.instagramPage.id,
          caption: facebookCaption,
          imageUrl: url,
        });
      }
      if (request.platforms.includes('youtube')) {
        if (youtubeCaption && youtubeImage) {
          await postOnYoutube({
            file: youtubeImage,
            title: youtubeCaption,
            description: youtubeCaption,
            accessToken: user.youtubeChannel.token,
          });
        }
      }

      await startPromotion({id: request._id});

      toast.show('Posts have been uploaded', {type: 'success'});
      navigation.navigate('Main');
      setapiCalled(false);
    } catch (err) {
      setapiCalled(false);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: 'space-between',
          gap: 30,
        }}>
        {request && (
          <>
            <View style={{width: '100%', gap: 25}}>
              {(request.platforms.includes('instagram') ||
                request.platforms.includes('facebook')) && (
                <View>
                  <View style={{gap: 10}}>
                    <Text style={[global.fontBold]}>
                      {request.platforms.includes('facebook') &&
                      request.platforms.includes('instagram')
                        ? 'Facebook / Instgram Content'
                        : request.platforms.includes('facebook')
                        ? 'Facebook Content'
                        : 'Instagram Content'}
                    </Text>
                    <TextInput
                      disabled={readOnly}
                      textColor="black"
                      placeholder="Caption"
                      value={facebookCaption}
                      onChangeText={text => {
                        setfacebookCaption(text);
                      }}
                      multiline={true}
                      outlineColor="transparent"
                      cursorColor="black"
                      activeOutlineColor="transparent"
                      style={[global.gray2Back, {width: '100%'}]}
                      numberOfLines={4}
                      underlineColor="transparent"
                      mode="outlined"
                    />

                    {facebookImage && (
                      <TouchableWithoutFeedback
                        disabled={readOnly}
                        onPress={() => {
                          setfacebookImage(null);
                        }}>
                        <Image
                          source={{uri: facebookImage}}
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 10,
                          }}
                        />
                      </TouchableWithoutFeedback>
                    )}
                    {!readOnly && (
                      <Pressable
                        onPress={selectFacebookImage}
                        style={[
                          global.greenBtn,
                          {alignItems: 'center', width: 100},
                        ]}>
                        <Text style={[global.greenBtnTextSm]}>
                          Upload Content
                        </Text>
                      </Pressable>

                      // <Button
                      //   onPress={selectFacebookImage}
                      //   style={[global.greenBtnSm]}>
                      //   <Text style={[global.greenBtnTextSm]}>
                      //     Upload Content
                      //   </Text>
                      // </Button>
                    )}
                  </View>
                </View>
              )}

              {request.platforms.includes('youtube') && (
                <View style={{gap: 10}}>
                  <Text
                    style={[
                      global.textSmall,
                      global.fontBold,
                      global.blackColor,
                    ]}>
                    Add Youtube Video
                  </Text>
                  <TextInput
                    placeholder="Title"
                    value={youtubeTitle}
                    onChangeText={setyoutubeTitle}
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    style={[global.gray2Back]}
                    underlineColor="transparent"
                    mode="outlined"
                  />
                  <TextInput
                    placeholder="Description"
                    value={youtubeCaption}
                    onChangeText={setyoutubeCaption}
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    style={[global.gray2Back]}
                    numberOfLines={5}
                    multiline={true}
                    underlineColor="transparent"
                    mode="outlined"
                  />
                  {youtubeImage && (
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setyoutubeImage(null);
                      }}>
                      <Image
                        source={{uri: youtubeImage.uri}}
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      />
                    </TouchableWithoutFeedback>
                  )}
                  <Pressable
                    onPress={handleSelectYoutubeImage}
                    style={[
                      global.greenBtn,
                      {alignItems: 'center', width: 100},
                    ]}>
                    <Text style={[global.greenBtnTextSm]}>Select Video</Text>
                  </Pressable>
                </View>
              )}
            </View>
            <Button
              style={[global.greenBtn]}
              disabled={apiCalled}
              onPress={handlePost}>
              <Text style={[global.greenBtnText]}>
                {apiCalled ? 'Loading...' : 'Post'}
              </Text>
            </Button>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default UploadMediaAndPost;

const styles = StyleSheet.create({});

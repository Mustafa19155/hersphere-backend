import {
  Image,
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
import {postOnFacebook, postOnInstagram} from '../../api/socialmediaPosts';
import {AuthContext} from '../../contexts/userContext';
import {useToast} from 'react-native-toast-notifications';

const UploadMediaAndPost = ({route}) => {
  const [loading, setloading] = useState(false);
  const [request, setrequest] = useState(null);
  const [facebookImage, setfacebookImage] = useState(null);
  const [facebookCaption, setfacebookCaption] = useState('');
  const [youtubeImage, setyoutubeImage] = useState(null);
  const [youtubeCaption, setyoutubeCaption] = useState('');
  const [youtubeType, setyoutubeType] = useState('image');
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
        if (res.allowerInfluencerToAddData) {
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
        mediaType: youtubeType == 'video' ? 'video' : 'photo',
      });
      if (!result.didCancel) {
        setyoutubeImage(result.assets[0].uri);
      }
    } catch (err) {}
  };

  const handlePost = async () => {
    setapiCalled(true);
    if (request.platforms.includes('facebook')) {
      if (facebookImage && facebookCaption) {
        await postOnFacebook({
          pageId: user.facebookPage.id,
          accessToken: user.facebookPage.access_token,
          message: facebookCaption,
          url: facebookImage,
        });
      }
    }
    if (request.platforms.includes('instagram')) {
      await postOnInstagram({
        facebookAccessToken: user.instagramPage.token,
        instagramAccountId: user.instagramPage.id,
        caption: facebookCaption,
        imageUrl: facebookImage,
      });
    }
    if (request.platforms.includes('youtube')) {
    }

    await startPromotion({id: request._id});

    toast.show('Posts have been uploaded', {type: 'success'});
    navigation.navigate('Main');
    setapiCalled(false);
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <ScrollView>
      {request && (
        <View>
          <>
            <View style={{width: '100%', gap: 25, marginBottom: 20}}>
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
                      <Button
                        onPress={selectFacebookImage}
                        style={[global.greenBtnSm]}>
                        <Text style={[global.greenBtnTextSm]}>
                          Upload Content
                        </Text>
                      </Button>
                    )}
                  </View>
                </View>
              )}
              {request.platforms.includes('youtube') && (
                <View style={{gap: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={[global.fontBold]}>Youtube Content</Text>
                    {!readOnly && (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Checkbox
                          color="#13B887"
                          status={
                            youtubeType == 'video' ? 'checked' : 'unchecked'
                          }
                          onPress={() => {
                            setyoutubeImage(null);
                            setyoutubeType(
                              youtubeType == 'video' ? 'image' : 'video',
                            );
                          }}
                        />
                        <Text
                          style={[global.textExtraSmall, global.gray3Color]}>
                          Upload Video
                        </Text>
                      </View>
                    )}
                  </View>
                  <TextInput
                    placeholder="Caption"
                    value={youtubeCaption}
                    disabled={readOnly}
                    textColor="black"
                    onChangeText={text => {
                      setyoutubeCaption(text);
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
                  {youtubeImage && (
                    <TouchableWithoutFeedback
                      disabled={readOnly}
                      onPress={() => {
                        setyoutubeImage(null);
                      }}>
                      <Image
                        source={{uri: youtubeImage}}
                        style={{
                          height: 100,
                          width: 100,
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      />
                    </TouchableWithoutFeedback>
                  )}
                  {!readOnly && (
                    <Button
                      onPress={handleSelectYoutubeImage}
                      style={[global.greenBtnSm]}>
                      <Text style={[global.greenBtnTextSm]}>
                        Upload Content
                      </Text>
                    </Button>
                  )}
                </View>
              )}
            </View>
          </>
          <Button
            style={[global.greenBtn]}
            disabled={apiCalled}
            onPress={handlePost}>
            <Text style={[global.greenBtnText]}>
              {apiCalled ? 'Loading...' : 'Post'}
            </Text>
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

export default UploadMediaAndPost;

const styles = StyleSheet.create({});

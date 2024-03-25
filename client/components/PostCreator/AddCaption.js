import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import React, {useContext, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {PostCreatorContext} from '../../contexts/postCreatorContext';
import global from '../../assets/styles/global';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/userContext';
import {
  postOnFacebook,
  postOnInstagram,
  postOnYoutube,
} from '../../api/socialmediaPosts';
import {startPromotion} from '../../api/promotion';
import {launchImageLibrary} from 'react-native-image-picker';

const AddCaption = () => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const toast = useToast();
  const {description, setdescription, imageUrl, requestData} =
    useContext(PostCreatorContext);
  const [apiCalled, setapiCalled] = useState(false);
  const [youtubeDescription, setyoutubeDescription] = useState('');
  const [youtubeTitle, setyoutubeTitle] = useState('');
  const [youtubeVideo, setyoutubeVideo] = useState(null);

  const postOnSocialMedia = async () => {
    try {
      if (description) {
        setapiCalled(true);
        if (requestData.platforms.includes('facebook')) {
          await postOnFacebook({
            pageId: user.facebookPage.id,
            accessToken: user.facebookPage.access_token,
            message: description,
            url: imageUrl,
          });
        }
        if (requestData.platforms.includes('instagram')) {
          await postOnInstagram({
            facebookAccessToken: user.instagramPage.token,
            caption: description,
            imageUrl,
            instagramAccountId: user.instagramPage.id,
          });
        }
        if (requestData.platforms.includes('youtube')) {
          if (!youtubeVideo || !youtubeTitle || !youtubeDescription) {
            setapiCalled(false);
            return toast.show('Please fill all fields for youtube', {
              type: 'danger',
            });
          }
          await postOnYoutube({
            file: youtubeVideo,
            title: youtubeTitle,
            description: youtubeDescription,
            accessToken: user.youtubeChannel.token,
          });
        }
        await startPromotion({id: requestData._id});

        setapiCalled(false);
        toast.show('Posts have been uploaded', {type: 'success'});
        navigation.navigate('Main');
      } else {
        toast.show('Caption cannot be empty', {type: 'danger'});
      }
    } catch (err) {
      setapiCalled(false);
    }
  };

  const handleSelectYoutubeImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'video',
      });
      if (!result.didCancel) {
        setyoutubeVideo(result.assets[0]);
      }
    } catch (err) {}
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          gap: 30,
        }}>
        <View style={{gap: 20}}>
          <View style={{gap: 10}}>
            <Text
              style={[global.textSmall, global.fontBold, global.blackColor]}>
              Add Caption
            </Text>
            <TextInput
              placeholder="Caption"
              value={description}
              onChangeText={setdescription}
              multiline={true}
              outlineColor="transparent"
              activeOutlineColor="transparent"
              style={[global.gray2Back]}
              numberOfLines={5}
              underlineColor="transparent"
              mode="outlined"
            />
          </View>

          {requestData.platforms.includes('youtube') && (
            <View style={{gap: 10}}>
              <Text
                style={[global.textSmall, global.fontBold, global.blackColor]}>
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
                value={youtubeDescription}
                onChangeText={setyoutubeDescription}
                outlineColor="transparent"
                activeOutlineColor="transparent"
                style={[global.gray2Back]}
                numberOfLines={5}
                multiline={true}
                underlineColor="transparent"
                mode="outlined"
              />
              {youtubeVideo && (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setyoutubeVideo(null);
                  }}>
                  <Image
                    source={{uri: youtubeVideo.uri}}
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
                style={[global.greenBtn, {alignItems: 'center', width: 100}]}>
                <Text style={[global.greenBtnTextSm]}>Select Video</Text>
              </Pressable>
            </View>
          )}
        </View>
        <Button
          // disabled={apiCalled}
          onPress={postOnSocialMedia}
          style={[global.greenBtn, {alignItems: 'center'}]}>
          <Text style={[global.greenBtnText]}>
            {!apiCalled ? 'Post on social media' : 'Loading...'}
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default AddCaption;

const styles = StyleSheet.create({});

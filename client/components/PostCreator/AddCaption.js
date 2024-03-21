import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {PostCreatorContext} from '../../contexts/postCreatorContext';
import global from '../../assets/styles/global';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/userContext';
import {postOnFacebook, postOnInstagram} from '../../api/socialmediaPosts';
import {captureRef} from 'react-native-view-shot';
import {ref, uploadBytes} from 'firebase/storage';
import {storage} from '../../firebase';

const AddCaption = () => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const toast = useToast();
  const {description, setdescription, imageUrl, requestData} =
    useContext(PostCreatorContext);
  const [apiCalled, setapiCalled] = useState(false);

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

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View style={{gap: 10}}>
        <Text style={[global.textSmall, global.fontBold, global.blackColor]}>
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
      <Button
        disabled={apiCalled}
        onPress={postOnSocialMedia}
        style={[global.greenBtn, {alignItems: 'center'}]}>
        <Text style={[global.greenBtnText]}>
          {!apiCalled ? 'Post on social media' : 'Loading...'}
        </Text>
      </Button>
      {/* <Pressable
        onPress={postOnSocialMedia}
        style={[
          global.greenBtn,
          {justifyContent: 'center', alignItems: 'center'},
        ]}
        disabled={apiCalled}>
        <Text style={[global.greenBtnText]}>
          {!apiCalled ? 'Post on social media' : 'Loading...'}
        </Text>
      </Pressable> */}
    </View>
  );
};

export default AddCaption;

const styles = StyleSheet.create({});

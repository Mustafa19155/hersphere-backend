import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {PostCreatorContext} from '../../contexts/postCreatorContext';
import global from '../../assets/styles/global';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/userContext';
import {postOnFacebook, postOnInstagram} from '../../api/socialmediaPosts';

const AddCaption = () => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const toast = useToast();
  const {description, setdescription, imageUrl} =
    useContext(PostCreatorContext);
  const [apiCalled, setapiCalled] = useState(false);

  const postOnSocialMedia = async () => {
    try {
      if (description) {
        setapiCalled(true);
        if (user.facebookPage) {
          await postOnFacebook({
            pageId: user.facebookPage.id,
            accessToken: user.facebookPage.access_token,
            message: description,
            url: imageUrl,
          });
        }
        if (user.instagramPage) {
          await postOnInstagram({
            facebookAccessToken: user.instagramPage.token,
            caption: description,
            imageUrl,
            instagramAccountId: user.instagramPage.id,
          });
        }
        setapiCalled(false);
        toast.show('Posts have been uploaded', {type: 'success'});
        navigation.goBack();
      } else {
        toast.show('Caption cannot be empty', {type: 'danger'});
      }
    } catch (err) {
      setapiCalled(false);
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1, padding: 20, justifyContent: 'space-between'}}>
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
      <Pressable
        onPress={postOnSocialMedia}
        style={[
          global.greenBtn,
          global.greenBtnText,
          {justifyContent: 'center', alignItems: 'center'},
        ]}
        disabled={apiCalled}>
        <Text style={[global.greenBtnText]}>
          {!apiCalled ? 'Post on social media' : 'Loading...'}
        </Text>
      </Pressable>
    </View>
  );
};

export default AddCaption;

const styles = StyleSheet.create({});

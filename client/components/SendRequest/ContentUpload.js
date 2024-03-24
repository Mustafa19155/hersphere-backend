import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {RequestContext} from '../../contexts/requestContext';
import {Button, Checkbox, TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import global from '../../assets/styles/global';

const ContentUpload = () => {
  const {data, setdata, platforms} = useContext(RequestContext);

  const selectFacebookImage = async () => {
    try {
      const result = await launchImageLibrary();
      if (!result.didCancel) {
        setdata({
          ...data,
          facebook: {...data.facebook, content: result.assets[0].uri},
        });
      }
    } catch (err) {}
  };

  const handleSelectYoutubeImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: data.youtube.type == 'video' ? 'video' : 'video',
      });
      if (!result.didCancel) {
        setdata({
          ...data,
          youtube: {...data.youtube, content: result.assets[0].uri},
        });
      }
    } catch (err) {}
  };

  return (
    <View style={{width: '100%', gap: 25, marginBottom: 20}}>
      {(platforms.includes('instagram') || platforms.includes('facebook')) && (
        <View>
          <View style={{gap: 10}}>
            <Text style={[global.fontBold]}>
              {platforms.includes('facebook') && platforms.includes('instagram')
                ? 'Facebook / Instgram Content'
                : platforms.includes('facebook')
                ? 'Facebook Content'
                : 'Instagram Content'}
            </Text>
            <TextInput
              placeholder="Caption"
              value={data.facebook.caption}
              onChangeText={text => {
                setdata({
                  ...data,
                  facebook: {...data.facebook, caption: text},
                });
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
            {data.facebook.content && (
              <TouchableWithoutFeedback
                onPress={() => {
                  setdata({
                    ...data,
                    facebook: {...data.facebook, content: ''},
                  });
                }}>
                <Image
                  source={{uri: data.facebook.content}}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                  }}
                />
              </TouchableWithoutFeedback>
            )}
            <Button onPress={selectFacebookImage} style={[global.greenBtnSm]}>
              <Text style={[global.greenBtnTextSm]}>Upload Content</Text>
            </Button>
          </View>
        </View>
      )}
      {platforms.includes('youtube') && (
        <View style={{gap: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={[global.fontBold]}>Youtube Content</Text>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox
                color="#13B887"
                status={data.youtube.type == 'video' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setdata({
                    ...data,
                    youtube: {
                      ...data.youtube,
                      content: '',
                      type: data.youtube.type == 'video' ? 'image' : 'video',
                    },
                  });
                }}
              />
              <Text style={[global.textExtraSmall, global.gray3Color]}>
                Upload Video
              </Text>
            </View> */}
          </View>
          <TextInput
            placeholder="Caption"
            value={data.youtube.caption}
            onChangeText={text => {
              setdata({
                ...data,
                youtube: {...data.youtube, caption: text},
              });
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
          {data.youtube.content && (
            <TouchableWithoutFeedback
              onPress={() => {
                setdata({
                  ...data,
                  youtube: {...data.youtube, content: ''},
                });
              }}>
              <Image
                source={{uri: data.youtube.content}}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            </TouchableWithoutFeedback>
          )}
          <Button
            onPress={handleSelectYoutubeImage}
            style={[global.greenBtnSm]}>
            <Text style={[global.greenBtnTextSm]}>Upload Content</Text>
          </Button>
        </View>
      )}
    </View>
  );
};

export default ContentUpload;

const styles = StyleSheet.create({});

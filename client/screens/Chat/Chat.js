import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Avatar from '../../assets/images/avatar.png';
import global from '../../assets/styles/global';
import {TextInput} from 'react-native-paper';
import UploadIcon from '../../assets/icons/upload-media.png';
import SendIcon from '../../assets/icons/send.png';
import {launchImageLibrary} from 'react-native-image-picker';
import Messages from '../../components/Chat/Messages';

const Chat = () => {
  const navigation = useNavigation();
  const [message, setmessage] = useState('');

  const chat = {
    name: 'Ayesha',
    chats: [
      {
        message: 'Lorem ipsum dolor',
        userID: 1,
        type: 'text',
        time: new Date(),
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 2,
        type: 'text',
        time: new Date(),
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 1,
        type: 'text',
        time: new Date(),
      },
    ],
  };

  const selectImage = async () => {
    const result = await launchImageLibrary();
    if (!result.didCancel) {
      //   setImageUri(result.assets[0].uri);
    }
  };

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
    return () =>
      navigation
        .getParent()
        ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  }, [navigation]);

  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <View style={styles.mainTopWrapper}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="black" />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Image
              source={Avatar}
              style={{height: 60, width: 60, borderRadius: 100}}
            />
            <View>
              <Text style={[global.textSmall, global.fontBold]}>Ayesha</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={26} color="black" />
        </TouchableOpacity>
      </View>
      <Messages messages={chat.chats} />
      <View style={{margin: 5, flexDirection: 'row', gap: 5}}>
        <View style={styles.mainBottomWrapper}>
          <TextInput
            value={message}
            onChangeText={setmessage}
            style={{backgroundColor: 'transparent', height: 40, width: '80%'}}
            activeUnderlineColor="transparent"
            underlineColor="transparent"
            placeholder="Type Message here"
          />
          <TouchableOpacity
            style={{borderRadius: 100, padding: 10, borderWidth: 1}}
            onPress={selectImage}>
            <Image source={UploadIcon} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '10%',
          }}>
          <TouchableOpacity
            style={[
              global.greenBack,
              {
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              },
            ]}>
            <Image source={SendIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  mainTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
    elevation: 5,
    backgroundColor: 'white',
  },
  mainBottomWrapper: [
    global.gray2Back,
    {
      elevation: 5,
      borderRadius: 20,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
  ],
});

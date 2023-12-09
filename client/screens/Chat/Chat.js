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
import Messages from '../../components/Chat/Messages';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {getDownloadURL, ref, uploadString} from 'firebase/storage';
import {storage} from '../../firebase';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS, {DocumentDirectoryPath, readFile} from 'react-native-fs';

const Chat = () => {
  const navigation = useNavigation();
  const [message, setmessage] = useState('');
  const [file, setfile] = useState(null);

  const [chat, setchat] = useState({
    name: 'Ayesha',
    chats: [
      {
        message: 'Lorem ipsum dolor',
        userID: 1,
        time: new Date(),
        file: null,
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 2,
        time: new Date(),
        file: null,
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 1,
        time: new Date(),
        file: null,
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 1,
        time: new Date(),
        file: null,
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 2,
        time: new Date(),
        file: null,
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 1,
        time: new Date(),
        file: null,
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 1,
        time: new Date(),
        file: null,
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 2,
        time: new Date(),
        file: null,
      },
      {
        message: 'Lorem ipsum dolor',
        userID: 1,
        time: new Date(),
        file: null,
      },
    ],
  });

  const selectImage = async () => {
    try {
      const result = await DocumentPicker.pickSingle();
      setfile(result);
    } catch (err) {}
    // const result = await launchImageLibrary();
    // if (!result.didCancel) {
    //   console.log(result.assets[0]);
    //   setfile(result.assets[0].uri);
    // }
  };

  const handleUploadDocument = async () => {
    try {
      if (file) {
        const contentUri = file.uri;

        const filePath = `${contentUri}/${file.name}`; // Replace with your desired file name

        const fileExists = await RNFS.exists(
          filePath.replace('content', 'file'),
        );
        console.log(fileExists);

        const contentData = await readFile(contentUri, 'base64');

        await readFile(filePath, 'base64');

        const mainRef = ref(storage, `chatMedia/${Date.now()}/${file.name}`);
        await uploadString(mainRef, contentData, 'base64');
        const a = await getDownloadURL(mainRef);

        // await uploadBytes(mainRef, blob);
        // return await getDownloadURL(mainRef);

        // await readFile(contentUri, 'base64')
        //   .then(data => {
        //     return readFile(filePath, 'base64');
        //   })
        //   .catch(error => {
        //     console.error('Error reading file:', error);
        //   });

        // const blobData = `data:${response.mime};base64,${response.data}`;
        // const filename = file.name; // Replace with your desired filename
        // const storageRef = ref(storage, `chatMedia/${Date.now() + filename}`);
        // await uploadString(storageRef, blobData, 'data_url');
        // return await getDownloadURL(storageRef);
        //
        // const {Blob, fs} = RNFetchBlob;
        // const filePath = file.uri;
        // console.log(filePath);
        // const data = await fs.readFile(filePath, 'base64');
        // const blob = Blob.build(data, {type: `${file.type};BASE64`});
        // const res = await fetch(file.uri);
        // console.log(res);
        // const blob = await res.blob();
        // const filename = file.name;
        // const mainRef = ref(storage, `chatMedia/${Date.now()}/${filename}`);
        // await uploadBytes(mainRef, blob);
        // return await getDownloadURL(mainRef);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleSendMessage = async () => {
    try {
      if (message || file) {
        const obj = {
          message: message,
          userID: 1,
          time: new Date(),
        };
        if (file) {
          const fileUrl = await handleUploadDocument();
          obj['file'] = {
            url: fileUrl,
            name: file.name,
          };
        }
        setchat({
          ...chat,
          chats: [...chat.chats, obj],
        });
        setmessage('');
      }
    } catch (err) {
      console.log(err);
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
      <Messages messages={chat} />
      <View style={{margin: 5, flexDirection: 'row', gap: 5}}>
        {file && (
          <View style={styles.filePreview}>
            <Text
              style={[global.textSmall, {width: '90%'}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {file.name}
            </Text>
            <TouchableWithoutFeedback onPress={() => setfile(null)}>
              <Icon name="close" size={20} />
            </TouchableWithoutFeedback>
          </View>
        )}
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
            onPress={handleSendMessage}
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
  filePreview: {
    position: 'absolute',
    zIndex: 2,
    top: -50,
    width: '90%',
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
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

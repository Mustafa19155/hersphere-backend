import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import {getDownloadURL, ref, uploadBytes, uploadString} from 'firebase/storage';
import {storage} from '../../firebase';
import RNFetchBlob from 'rn-fetch-blob';
import RNFS, {DocumentDirectoryPath, readFile} from 'react-native-fs';
import {getUserChat} from '../../api/chatroom';
import {AuthContext} from '../../contexts/userContext';
import {baseURL} from '../../variables';
import {io} from 'socket.io-client';

const Chat = ({route}) => {
  const navigation = useNavigation();
  const [loadingChat, setloadingChat] = useState(true);
  const [socket, setsocket] = useState(io(baseURL + '/chatroom'));
  const [sendingMessage, setsendingMessage] = useState(false);
  const [message, setmessage] = useState('');
  const [file, setfile] = useState(null);
  const [chatroomId, setchatroomId] = useState(null);

  const [chat, setchat] = useState(null);

  const {user} = useContext(AuthContext);

  const selectImage = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        copyTo: 'cachesDirectory',
      });
      setfile(result);
    } catch (err) {}
  };

  const handleUploadDocument = async () => {
    try {
      if (file) {
        const res = await fetch(file.fileCopyUri);
        const blob = await res.blob();

        const filename = file.fileCopyUri.substring(
          file.fileCopyUri.lastIndexOf('/') + 1,
        );

        const mainRef = ref(
          storage,
          `chatroom-${chat._id}/${Date.now()}-${filename}`,
        );

        await uploadBytes(mainRef, blob);

        return await getDownloadURL(mainRef);
      }
    } catch (err) {
      throw err;
    }
  };

  const handleSendMessage = async () => {
    try {
      if (message || file) {
        setsendingMessage(true);
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

        socket.emit('message', {
          room: chat._id,
          type: 'single',
          message: {
            ...obj,
            sentBy: user._id,
            date: new Date(),
            messageType: file ? 'document' : 'text',
            text: message,
            deliveredTo: chat.membersID.map(member => member._id),
          },
        });
        setfile(null);
        setmessage('');
        setsendingMessage(false);
      }
    } catch (err) {
      setsendingMessage(false);
    }
  };

  const handleGetChat = () => {
    getUserChat(route.params.id)
      .then(res => {
        setchatroomId(res._id);
        setchat(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetChat();
  }, []);

  useEffect(() => {
    if (chatroomId) {
      socket.listeners('message').forEach(listener => {
        socket.off('message', listener);
      });

      socket.emit('join', {room: chatroomId});
      socket.on('message', data => {
        setchat(chats => {
          return {
            ...chats,
            chats: [
              ...chats.chats,
              {
                ...data.message,
                sentBy: chats.membersID.find(
                  member => member._id == data.message.sentBy,
                ),
              },
            ],
          };
        });
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [chatroomId]);

  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      {chat && (
        <>
          <View style={styles.mainTopWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={26} color="black" />
              </TouchableOpacity>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Image
                  source={{
                    uri: chat.membersID.find(m => m._id != user._id)
                      .profileImage,
                  }}
                  style={{height: 60, width: 60, borderRadius: 100}}
                />
                <View>
                  <Text style={[global.textSmall, global.fontBold]}>
                    {chat.membersID.find(m => m._id != user._id).username}
                  </Text>
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
                style={{
                  backgroundColor: 'transparent',
                  height: 40,
                  width: '80%',
                }}
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
        </>
      )}
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

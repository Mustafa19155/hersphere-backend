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
import {baseURL} from '../../variables';
import {io} from 'socket.io-client';
import {getChatroomById} from '../../api/chatroom';
import {TextInput} from 'react-native-paper';
import SendIcon from '../../assets/icons/send.png';
import UploadIcon from '../../assets/icons/upload-media.png';
import Messages from '../../components/Chat/Messages';
import {AuthContext} from '../../contexts/userContext';
import global from '../../assets/styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Avatar from '../../assets/images/avatar.png';
import RNFS, {DocumentDirectoryPath, readFile} from 'react-native-fs';
import {getDownloadURL, ref, uploadBytes, uploadString} from 'firebase/storage';
import {storage} from '../../firebase';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import AntIcons from 'react-native-vector-icons/AntDesign';

const Workplace = ({route}) => {
  const navigation = useNavigation();

  const {user} = useContext(AuthContext);

  const [chatroom, setchatroom] = useState(null);
  const [loadingchatroom, setloadingchatroom] = useState(true);
  const [socket, setsocket] = useState(io(baseURL + '/chatroom'));
  const [sendingMessage, setsendingMessage] = useState(false);
  const [message, setmessage] = useState('');
  const [file, setfile] = useState(null);

  const {id} = route.params;

  const handleGetChatroom = () => {
    getChatroomById(id)
      .then(res => {
        setchatroom(res);
        setloadingchatroom(false);
      })
      .catch(err => {
        setloadingchatroom(false);
      });
  };

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
          `chatroom-${chatroom._id}/${Date.now()}-${filename}`,
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
          room: id,
          message: {
            ...obj,
            sentBy: user._id,
            date: new Date(),
            messageType: file ? 'document' : 'text',
            text: message,
            deliveredTo: chatroom.membersID.map(member => member._id),
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

  useEffect(() => {
    handleGetChatroom();

    socket.listeners('message').forEach(listener => {
      socket.off('message', listener);
    });

    socket.emit('join', {room: id});
    socket.on('message', data => {
      setchatroom(chats => {
        return {...chats, chats: [...chats.chats, data.message]};
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
      }}>
      {!loadingchatroom && chatroom ? (
        <>
          <View style={styles.mainTopWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={26} color="black" />
              </TouchableOpacity>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                <Image
                  source={Avatar}
                  style={{height: 60, width: 60, borderRadius: 100}}
                />
                <View>
                  <Text style={[global.textSmall, global.fontBold]}>
                    {chatroom.workplaceID.name}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity>
              <AntIcons name="setting" size={26} color="black" />
            </TouchableOpacity>
          </View>
          <Messages messages={chatroom} />
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
                disabled={sendingMessage}
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
      ) : (
        ''
      )}
    </View>
  );
};

export default Workplace;

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

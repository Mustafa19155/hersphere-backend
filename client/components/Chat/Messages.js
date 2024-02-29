import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useRef} from 'react';
import global from '../../assets/styles/global';
import moment from 'moment';
import {AuthContext} from '../../contexts/userContext';
import AntIcons from 'react-native-vector-icons/AntDesign';

const Messages = ({messages}) => {
  const ref = useRef();

  const {user} = useContext(AuthContext);

  useEffect(() => {
    ref.current.scrollToEnd({animated: true});
  }, [messages]);

  return (
    <ScrollView style={{paddingHorizontal: 10, paddingTop: 30}} ref={ref}>
      {messages.chats.map((mess, index) => (
        <View
          style={[
            index == messages.chats.length - 1
              ? {
                  marginBottom: 30,
                }
              : {
                  marginBottom: 10,
                },
            styles.messageWrapper,
            mess.sentBy == user._id
              ? styles.myMessageWrapper
              : styles.otherMessageWrapper,
          ]}>
          <View
            style={[
              mess.sentBy == user._id ? styles.myMessage : styles.otherMessage,
              styles.message,
            ]}>
            {mess.messageType === 'document' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <AntIcons name="file1" size={20} />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    global.textSmall,
                    global.blackColor,
                    {opacity: 0.5, maxWidth: '80%'},
                  ]}>
                  {mess.file.name}
                </Text>
                <AntIcons name="download" size={20} />
              </View>
            ) : (
              <Text
                style={[global.textSmall, global.blackColor, {opacity: 0.5}]}>
                {mess.message}
              </Text>
            )}
          </View>
          <Text style={[global.grayColor, global.textExtraSmall, {padding: 5}]}>
            {moment(mess.time).format('ddd hh:mm A')}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  messageWrapper: {
    // marginBottom: 20,
    width: '80%',
  },
  myMessageWrapper: {
    alignSelf: 'flex-end',
  },
  otherMessageWrapper: {
    alignSelf: 'flex-start',
  },
  message: {
    padding: 20,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: 'rgba(19, 184, 135, 0.58)',
  },
  otherMessage: {
    backgroundColor: 'rgba(172, 169, 169, 0.41)',
  },
});

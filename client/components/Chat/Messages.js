import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import global from '../../assets/styles/global';
import moment from 'moment';

const Messages = ({messages}) => {
  const ref = useRef();

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
            mess.userID == 1
              ? styles.myMessageWrapper
              : styles.otherMessageWrapper,
          ]}>
          <View
            style={[
              mess.userID == 1 ? styles.myMessage : styles.otherMessage,
              styles.message,
            ]}>
            <Text style={[global.textSmall, global.blackColor, {opacity: 0.5}]}>
              {mess.message}
            </Text>
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

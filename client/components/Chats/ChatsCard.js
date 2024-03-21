import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import moment from 'moment';
import global from '../../assets/styles/global';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/userContext';

const ChatsCard = ({chat, index}) => {
  const navigation = useNavigation();

  const {user} = useContext(AuthContext);

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('Chats', {
          screen: 'Chat',
          params: {id: chat.membersID.find(mem => mem._id != user._id)._id},
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
          borderBottomColor: 'rgba(157, 208, 255, 0.5)',
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}>
        <TouchableWithoutFeedback
          onPress={e => {
            e.stopPropagation();
            navigation.navigate('InfluencerProfile');
          }}>
          <Image
            source={{
              uri: chat.membersID.find(mem => mem._id != user._id).profileImage,
            }}
            style={styles.image}
          />
        </TouchableWithoutFeedback>
        <View style={{flex: 1, gap: 5}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[global.textSmall, global.fontBold]}>{chat.name}</Text>
            {chat.unread > 0 && (
              <View
                style={[
                  global.greenBack,
                  {
                    width: 23,
                    height: 23,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  },
                ]}>
                <Text
                  style={[
                    global.textSmall,
                    {
                      color: 'white',
                    },
                  ]}>
                  {chat.unread}
                </Text>
              </View>
            )}
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[global.textSmall, global.grayColor, {width: '80%'}]}>
              {chat.lastMsg.message}
            </Text>
            <Text style={[global.textExtraSmall, global.grayColor]}>
              {moment(chat.lastMsg.date).format('hh:mm A')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatsCard;

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});

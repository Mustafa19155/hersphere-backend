import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import global from '../../assets/styles/global';
import {useNavigation} from '@react-navigation/native';

const ChatsCard = ({chat, index}) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Chats', {screen: 'Chat'})}>
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
          <Image source={chat.image} style={styles.image} />
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
              {chat.lastMessage.text}
            </Text>
            <Text style={[global.textExtraSmall, global.grayColor]}>
              {moment(chat.lastMessage.time).format('hh:mm A')}
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

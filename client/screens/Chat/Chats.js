import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import global from '../../assets/styles/global';
import Avatar from '../../assets/images/avatar.png';
import ChatsCard from '../../components/Chats/ChatsCard';
import {TextInput} from 'react-native-paper';
import {getUserChats} from '../../api/chatroom';
import {useFocusEffect} from '@react-navigation/native';

const Chats = () => {
  const [seachValue, setseachValue] = useState('');

  const [chats, setchats] = useState([]);

  const filterData = () => {
    return chats.filter(item =>
      item.name.toLowerCase().includes(seachValue.toLowerCase()),
    );
  };

  const handleGetChats = () => {
    getUserChats()
      .then(res => {
        setchats(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetChats();
    }, []),
  );

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: Dimensions.get('window').height - 220,
          marginBottom: 10,
        }}>
        <Text style={[global.fontBold, global.textLarge]}>Chats</Text>
        <View style={{gap: 15, marginTop: 20}}>
          {filterData().map((chat, index) => (
            <ChatsCard chat={chat} index={index} />
          ))}
        </View>
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.searchWrapper}>
          <Icon name="search1" size={20} />
          <TextInput
            placeholder="Search"
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            // left={<TextInput.Icon icon="eye" />}
            value={seachValue}
            style={{backgroundColor: 'transparent', width: '100%'}}
            onChangeText={setseachValue}
          />
        </View>
      </View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  searchWrapper: [
    global.gray2Back,
    {
      width: '80%',
      borderRadius: 15,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
  ],
});

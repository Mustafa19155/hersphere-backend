import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import global from '../../assets/styles/global';
import Avatar from '../../assets/images/avatar.png';
import ChatsCard from '../../components/Chats/ChatsCard';
import {TextInput} from 'react-native-paper';

const Chats = ({navigation}) => {
  const [seachValue, setseachValue] = useState('');
  // const focused = useIsFocused();

  // useEffect(() => {
  // if (focused) {
  // navigation
  //   .getParent()
  //   .getParent()
  //   .setOptions({headerLeft: () => <Text>asd</Text>});
  // } else {
  // navigation.getParent().getParent().setOptions({headerShown: true});
  // }
  // });

  const [chats, setchats] = useState([
    {
      name: 'Ayesha',
      image: Avatar,
      lastMessage: {
        text: 'Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor',
        time: new Date(),
      },
      unread: 3,
    },
    {
      name: 'Ayesha',
      image: Avatar,
      lastMessage: {
        text: 'Loremasdas ipsum dolor',
        time: new Date(),
      },
      unread: 3,
    },
    {
      name: 'Ayesha',
      image: Avatar,
      lastMessage: {
        text: 'Lorem ipsum dolor',
        time: new Date(),
      },
      unread: 2,
    },
    {
      name: 'Ayesha2',
      image: Avatar,
      lastMessage: {
        text: 'Lorem ipsum asdas dolor',
        time: new Date(),
      },
      unread: 0,
    },
    {
      name: 'Ayesha2',
      image: Avatar,
      lastMessage: {
        text: 'Lorem ipsum asdas dolor',
        time: new Date(),
      },
      unread: 0,
    },
  ]);

  const filterData = () => {
    return chats.filter(item =>
      item.name.toLowerCase().includes(seachValue.toLowerCase()),
    );
  };

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

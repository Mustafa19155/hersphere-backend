import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import BestPerformers from '../components/Dashboard/BestPerformers';
import Avatar from '../assets/images/avatar.png';
import global from '../assets/styles/global';
import Badges from '../components/Dashboard/Badges';
import {AuthContext} from '../contexts/userContext';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Search from '../components/Search/Search';

export default function Dashboard() {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  const [searchActive, setsearchActive] = useState(false);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {!searchActive && (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
          <Image source={Avatar} style={styles.profImg} />
          <View>
            <Text style={[global.textExtraSmall, global.grayColor]}>
              Welcome
            </Text>
            <Text style={[global.textSmall, global.fontBold, {color: 'black'}]}>
              {user?.username}
            </Text>
          </View>
        </View>
      )}
      <Search searchActive={searchActive} setsearchActive={setsearchActive} />
      {!searchActive && (
        <>
          <BestPerformers />
          <Badges />
        </>
      )}
    </ScrollView>
  );
}

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

  profImg: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
});

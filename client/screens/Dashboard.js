import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BestPerformers from '../components/Dashboard/BestPerformers';
import Avatar from '../assets/images/avatar.png';
import global from '../assets/styles/global';
import Badges from '../components/Dashboard/Badges';

export default function Dashboard() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
        <Image source={Avatar} style={styles.profImg} />
        <View>
          <Text style={[global.textExtraSmall, global.grayColor]}>Welcome</Text>
          <Text style={[global.textSmall, global.fontBold, {color: 'black'}]}>
            ClosetDoor
          </Text>
        </View>
      </View>
      <BestPerformers />
      <Badges />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profImg: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
});

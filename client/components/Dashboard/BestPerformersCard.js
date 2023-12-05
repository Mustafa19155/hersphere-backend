import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RightIcon from '../../assets/icons/right-arrow.png';
import Stars from './Stars';
import global from '../../assets/styles/global';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const BestPerformersCard = ({cardData, index}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('InfluencerProfile')}>
      <Icon name="arrowright" style={styles.rightArrow} size={16} />
      <Image source={cardData.image} style={styles.image} />
      <Text style={[global.textNormal, global.fontBold]}>{cardData.name}</Text>
      <Text style={[global.textExtraSmall]}>
        {cardData.targetAudience.join(' | ')}
      </Text>
      <Text style={[global.textExtraSmall]}>Rating</Text>
      <Stars value={cardData.rating} />
    </Pressable>
  );
};

export default BestPerformersCard;

const styles = StyleSheet.create({
  rightArrow: {
    alignSelf: 'flex-end',
  },

  card: {
    gap: 5,
    marginRight: 12,
    marginVertical: 10,
    padding: 12,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    backgroundColor: 'white',
    width: 220,
    borderRadius: 10,
  },
  image: {
    alignSelf: 'center',
    height: 120,
    width: 120,
    borderRadius: 100,
  },
});

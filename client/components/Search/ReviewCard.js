import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Stars from '../Dashboard/Stars';
import global from '../../assets/styles/global';

const ReviewCard = ({review}) => {
  return (
    <View style={styles.mainWrapper}>
      <Image source={review.image} style={styles.image} />
      <View style={{gap: 4}}>
        <Text style={global.textSmall}>{review.name}</Text>
        <Text style={[global.textExtraSmall, global.grayColor, {width: '70%'}]}>
          {review.description}
        </Text>
        <Stars value={review.rating} />
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  image: {
    height: 55,
    width: 55,
    borderRadius: 100,
  },
  mainWrapper: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
  },
});

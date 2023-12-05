import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Star from '../../assets/icons/star.png';

const Stars = ({value}) => {
  return (
    <View style={styles.wrapper}>
      {Array(Math.ceil(value))
        .fill(0)
        .map(val => (
          <Image source={Star} style={styles.image} />
        ))}
    </View>
  );
};

export default Stars;

const styles = StyleSheet.create({
  image: {
    height: 16,
    width: 16,
  },
  wrapper: {
    flexDirection: 'row',
    gap: 2,
  },
});

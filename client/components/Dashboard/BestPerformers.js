import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import global from '../../assets/styles/global';
import BestPerformersCard from './BestPerformersCard';
import Avatar from '../../assets/images/avatar.png';

const BestPerformers = () => {
  const [data, setdata] = useState([
    {
      name: 'Sonia Ali',
      targetAudience: [
        'Wooden Decor Enthusiastic',
        'SELLER',
        'Dealer',
        'Instagrammer',
        '@SoniaAli',
      ],
      rating: 5,
      image: Avatar,
    },
    {
      name: 'Sonia Ali',
      targetAudience: [
        'Wooden Decor Enthusiastic',
        'SELLER',
        'Dealer',
        'Instagrammer',
        '@SoniaAli',
      ],
      rating: 4,
      image: Avatar,
    },
    {
      name: 'Sonia Ali',
      targetAudience: [
        'Wooden Decor Enthusiastic',
        'SELLER',
        'Dealer',
        'Instagrammer',
        '@SoniaAli',
      ],
      rating: 3,
      image: Avatar,
    },
    {
      name: 'Sonia Ali',
      targetAudience: [
        'Wooden Decor Enthusiastic',
        'SELLER',
        'Dealer',
        'Instagrammer',
        '@SoniaAli',
      ],
      rating: 3.5,
      image: Avatar,
    },
    {
      name: 'Sonia Ali',
      targetAudience: [
        'Wooden Decor Enthusiastic',
        'SELLER',
        'Dealer',
        'Instagrammer',
        '@SoniaAli',
      ],
      rating: 4.5,
      image: Avatar,
    },
  ]);

  return (
    <View style={{paddingVertical: 20}}>
      <Text style={global.mainHeading}>Best Performers</Text>
      <ScrollView
        style={styles.wrapper}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.map((per, index) => (
          <BestPerformersCard cardData={per} index={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default BestPerformers;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    // paddingVertical: 20,
  },
});

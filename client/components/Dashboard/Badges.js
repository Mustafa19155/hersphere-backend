import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Avatar from '../../assets/images/avatar.png';
import BadgeCard from './BadgeCard';

const Badges = () => {
  const data = [
    {
      badge: 'gold',
      name: 'Irha Rehman',
      successRate: 89,
      image: Avatar,
    },
    {
      badge: 'silver',
      name: 'Irha Rehman',
      successRate: 89,
      image: Avatar,
    },
    {
      badge: 'gold',
      name: 'Irha Rehman',
      successRate: 89,
      image: Avatar,
    },
    {
      badge: 'gold',
      name: 'Irha Rehman',
      successRate: 89,
      image: Avatar,
    },
    {
      badge: 'silver',
      name: 'Irha Rehman',
      successRate: 89,
      image: Avatar,
    },
  ];
  return (
    <View>
      {data.map(badge => (
        <BadgeCard badge={badge} />
      ))}
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({});

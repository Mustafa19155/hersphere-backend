import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GoldBadge from '../../assets/icons/gold-medal.png';
import SilverBadge from '../../assets/icons/silver-medal.png';
import global from '../../assets/styles/global';

const BadgeCard = ({badge}) => {
  return (
    <View style={styles.wrapper}>
      <Image source={badge.image} style={styles.image} />
      <View>
        <View style={{flexDirection: 'row', gap: 7}}>
          <Text style={[global.fontBold, global.textSmall]}>
            {badge.badge.charAt(0).toUpperCase() + badge.badge.slice(1)} Badge{' '}
          </Text>
          <Image
            source={badge.badge == 'gold' ? GoldBadge : SilverBadge}
            style={{position: 'absolute', right: -35}}
          />
        </View>
        <Text style={[global.textSmall]}>{badge.name}</Text>
        <Text style={[global.textExtraSmall, {opacity: 0.67}]}>
          Success Rate
        </Text>
        <Text style={[global.textSmall, global.fontBold]}>
          {badge.successRate} %
        </Text>
      </View>
    </View>
  );
};

export default BadgeCard;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(157,208,255,0.4)',
    paddingVertical: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});

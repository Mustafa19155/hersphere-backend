import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Star from '../../assets/icons/star.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import global from '../../assets/styles/global';
import {useNavigation} from '@react-navigation/native';

const SearchCard = ({search}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainWrapper}>
      <Image source={{uri: search.profileImage}} style={styles.image} />
      <View style={{width: '50%'}}>
        <Text style={[global.textSmall]}>{search.username}</Text>
        <Text style={[global.textExtraSmall, global.grayColor]}>
          {search.businessDetails.description}
        </Text>
        <View style={styles.bottomWrapper}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <Image source={Star} />
            <Text style={[global.fontBold, global.blackColor]}>
              {search.rating.toFixed(1)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5}}>
            {search.platforms.map(pl => {
              return pl.toLowerCase() == 'facebook' ? (
                <Icon name="logo-facebook" color="#4267B2" size={22} />
              ) : pl.toLowerCase() == 'instagram' ? (
                <Icon name="logo-instagram" color="#bc2a8d" size={22} />
              ) : (
                <Icon name="logo-youtube" color="#FF0000" size={22} />
              );
            })}
          </View>
        </View>
      </View>
      <Pressable
        style={[
          global.greenBtnSm,
          {
            justifyContent: 'center',
            height: 40,
            width: '25%',
            flexDirection: 'row',
            alignItems: 'center',
          },
        ]}
        onPress={() => {
          navigation.navigate('InfluencerProfileMain', {
            id: search._id,
          });
        }}>
        <Text style={[global.greenBtnTextSm, {fontWeight: 600}]}>
          View Profile
        </Text>
      </Pressable>
    </View>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  image: {width: 60, height: 60, borderRadius: 100},
  bottomWrapper: {
    flexDirection: 'row',
    gap: 30,
  },
  mainWrapper: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 2,
  },
});

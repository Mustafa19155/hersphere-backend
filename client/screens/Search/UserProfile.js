import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Avatar from '../../assets/images/avatar.png';
import Stars from '../../components/Dashboard/Stars';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatIcon from '../../assets/icons/profile/chat.png';
import ReportIcon from '../../assets/icons/profile/report.png';
import SendIcon from '../../assets/icons/profile/send.png';
import global from '../../assets/styles/global';
import ReviewCard from '../../components/Search/ReviewCard';
import {useNavigation} from '@react-navigation/native';

const UserProfile = () => {
  const navigation = useNavigation();
  const [data, setdata] = useState({
    image: Avatar,
    name: 'Ayesha Rehman',
    description:
      'Home Decor | Parties Decor | Birthday Decor | Vlogger | Traveler | Deals and Partnerships',
    rating: 4,
    platforms: ['facebook', 'instagram', 'youtube'],
    totalPromotions: 34,
    reviews: [
      {
        name: 'The Sewing House',
        description:
          'Hard Working and cooporative. Looking forward to work again!',
        rating: 5,
        image: Avatar,
      },
      {
        name: 'The Sewing House',
        description:
          'Hard Working and cooporative. Looking forward to work again!',
        rating: 5,
        image: Avatar,
      },
      {
        name: 'The Sewing House',
        description:
          'Hard Working and cooporative. Looking forward to work again!',
        rating: 5,
        image: Avatar,
      },
    ],
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{alignItems: 'center', gap: 10}}>
        <Image
          source={data.image}
          style={{
            height: 130,
            width: 130,
            borderRadius: 100,
            alignSelf: 'center',
          }}
        />
        <Text style={[global.textMedium, global.fontBold]}>{data.name}</Text>
        <Text style={[global.grayColor]}>{data.description}</Text>
        <Stars value={data.rating} />
        <View style={{flexDirection: 'row', gap: 14}}>
          {data.platforms.map(pl => {
            return pl.toLowerCase() == 'facebook' ? (
              <Icon name="logo-facebook" color="#4267B2" size={36} />
            ) : pl.toLowerCase() == 'instagram' ? (
              <Icon name="logo-instagram" color="#bc2a8d" size={36} />
            ) : (
              <Icon name="logo-youtube" color="#FF0000" size={36} />
            );
          })}
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Pressable
          style={[global.greenBtn, styles.topButtons]}
          onPress={() => navigation.navigate('Chats', {screen: 'Chat'})}>
          <Image source={ChatIcon} style={{height: 16, width: 16}} />
          <Text style={[global.greenBtnTextSm]}>Chat</Text>
        </Pressable>
        <Pressable style={[global.greenBtn, styles.topButtons]}>
          <Image source={ReportIcon} style={{height: 16, width: 16}} />
          <Text style={[global.greenBtnTextSm]}>Report</Text>
        </Pressable>
        <Pressable
          style={[global.greenBtn, styles.topButtons]}
          onPress={() => navigation.navigate('SendRequest')}>
          <Image source={SendIcon} style={{height: 16, width: 16}} />
          <Text style={[global.greenBtnTextSm]}>Send Request</Text>
        </Pressable>
      </View>
      <View style={styles.totalWrapper}>
        <Text style={[global.textMedium, global.fontBold]}>
          Total Promotions
        </Text>
        <Text style={[global.textNormal]}>{data.totalPromotions}</Text>
      </View>
      <View style={styles.totalWrapper}>
        <Text style={[global.textMedium, global.fontBold]}>Reviews</Text>
        <View style={{gap: 25, marginTop: 20, position: 'relative'}}>
          {data.reviews.map(review => (
            <ReviewCard review={review} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  topButtons: {
    width: '32%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    paddingVertical: 13,
  },
  totalWrapper: {
    marginHorizontal: 2,
    elevation: 5,
    backgroundColor: 'white',
    marginTop: 30,
    padding: 10,
    borderRadius: 10,
  },
});

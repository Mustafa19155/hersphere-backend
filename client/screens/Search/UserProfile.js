import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Avatar from '../../assets/images/avatar.png';
import Stars from '../../components/Dashboard/Stars';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatIcon from '../../assets/icons/profile/chat.png';
import ReportIcon from '../../assets/icons/profile/report.png';
import SendIcon from '../../assets/icons/profile/send.png';
import global from '../../assets/styles/global';
import ReviewCard from '../../components/Search/ReviewCard';
import {useNavigation} from '@react-navigation/native';
import {getInfluencerProfileForRequest} from '../../api/user';

const UserProfile = ({route}) => {
  const navigation = useNavigation();
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);

  const getUser = async () => {
    setloading(true);
    getInfluencerProfileForRequest({id: route.params.id})
      .then(res => {
        setdata(res);
        setloading(false);
      })
      .catch(err => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data && (
        <>
          <View style={{alignItems: 'center', gap: 10}}>
            <Image
              source={{uri: data.profileImage}}
              style={{
                height: 130,
                width: 130,
                borderRadius: 100,
                alignSelf: 'center',
              }}
            />
            <Text style={[global.textMedium, global.fontBold]}>
              {data.username}
            </Text>
            <Text style={[global.grayColor]}>
              {data.businessDetails.description}
            </Text>
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
              onPress={() =>
                navigation.navigate('Chats', {
                  screen: 'Chat',
                  params: {id: data._id},
                })
              }>
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
          <View style={[styles.totalWrapper, {marginBottom: 10}]}>
            <Text style={[global.textMedium, global.fontBold]}>Reviews</Text>
            <View
              style={{
                gap: 25,
                marginTop: 20,
                position: 'relative',
              }}>
              {data.reviews.length > 0 ? (
                <>
                  {data.reviews.map(review => (
                    <ReviewCard review={review} />
                  ))}
                </>
              ) : (
                <Text style={[global.fontMedium, {textAlign: 'center'}]}>
                  No Reviews
                </Text>
              )}
            </View>
          </View>
        </>
      )}
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

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Avatar from '../../assets/images/avatar.png';
import CapitalizeFirst from '../../utils/CapitalizeFirst';
import moment from 'moment';
import global from '../../assets/styles/global';

const RequestDetails = ({route}) => {
  const {status} = route.params;

  const [request, setrequest] = useState({
    category: 'Fashion Desgining',
    startDate: new Date(),
    endDate: new Date(),
    completedOn: new Date(),
    status: 'completed',
    startupID: {
      name: 'ClosetDoor',
      image: Avatar,
    },
    title: 'New Launch Promotion',
    influencerID: {
      name: 'ClosetDoor',
      image: Avatar,
    },
    description:
      'Lorem ipsum dolor sit amet, consectetur ipiscingelit. Etiam venenatis sit',
    platforms: ['facebook', 'youtube', 'instagram'],
    transactionID: {
      amount: 25,
    },
    likes: 100,
    comments: 100,
  });

  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.getParent()?.getParent()?.setOptions({headerShown: false});
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {display: 'none'},
  //     tabBarVisible: false,
  //   });

  //   return () => {
  //     navigation.getParent()?.getParent().setOptions({headerShown: true});
  //     navigation
  //       .getParent()
  //       ?.setOptions({
  //         tabBarStyle: {
  //           backgroundColor: 'white',
  //           elevation: 0,
  //           borderColor: 'white',
  //         },
  //         tabBarVisible: true,
  //       });
  //   };
  // }, [navigation]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{gap: 20, padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Image
              source={request.influencerID.image}
              style={{width: 45, height: 45, borderRadius: 100}}
            />
            <Text style={[{fontSize: 16}, global.fontMedium]}>
              {request.influencerID.name}
            </Text>
          </View>
          <Text style={[global.textNormal, global.fontMedium]}>
            ${request.transactionID.amount}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[global.textNormal, global.fontBold]}>Status</Text>
          <Text style={[global.gray3Color, {fontSize: 16}]}>
            {status == 'new' ? '---' : status}
          </Text>
        </View>
        <View>
          <Text style={[global.textNormal, global.fontBold]}>
            Promotion Category
          </Text>
          <Text style={[global.gray3Color, {fontSize: 16}]}>
            {request.category}
          </Text>
        </View>
        <View>
          <Text style={[global.textNormal, global.fontBold]}>Description</Text>
          <Text style={[global.gray3Color, {fontSize: 16}]}>
            {request.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[global.textNormal, global.fontBold]}>No. of likes</Text>
          <Text style={[global.gray3Color, {fontSize: 16}]}>
            {request.likes}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[global.textNormal, global.fontBold]}>
            No. of comments
          </Text>
          <Text style={[global.gray3Color, {fontSize: 16}]}>
            {request.comments}
          </Text>
        </View>
        <View style={{gap: 10}}>
          <Text style={[global.textNormal, global.fontBold]}>Platforms</Text>
          <View>
            {request.platforms.map(pl => (
              <Text style={[global.gray3Color, {fontSize: 16}]}>
                {CapitalizeFirst(pl)}
              </Text>
            ))}
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: 20}}>
          <View style={{gap: 5}}>
            <Text style={[global.textNormal, global.fontBold]}>Due Date</Text>
            <Text style={[global.gray3Color, {fontSize: 20}]}>
              {moment(request.endDate).format('DD MMM YYYY')}
            </Text>
          </View>
          {status == 'completed' && (
            <View style={{gap: 5}}>
              <Text style={[global.textNormal, global.fontBold]}>
                Delivered On
              </Text>
              <Text style={[global.gray3Color, {fontSize: 20}]}>
                {moment(request.completedOn).format('DD MMM YYYY')}
              </Text>
            </View>
          )}
        </View>
        {status == 'new' && (
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              marginTop: 20,
            }}>
            <Pressable
              style={[
                global.greenBtnSm,
                {
                  paddingVertical: 6,
                  width: '25%',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text style={{color: 'white'}}>Accept</Text>
            </Pressable>
            <Pressable
              style={[
                global.redBtnSm,
                {
                  paddingVertical: 6,
                  width: '25%',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Text style={{color: 'white'}}>Reject</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default RequestDetails;

const styles = StyleSheet.create({});

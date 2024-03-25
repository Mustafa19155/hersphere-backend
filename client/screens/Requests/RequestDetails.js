import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Avatar from '../../assets/images/avatar.png';
import CapitalizeFirst from '../../utils/CapitalizeFirst';
import moment from 'moment';
import global from '../../assets/styles/global';
import {
  acceptPromotion,
  getPromotion,
  rejectPromotion,
} from '../../api/promotion';
import {AuthContext} from '../../contexts/userContext';
import {Button} from 'react-native-paper';

const RequestDetails = ({route}) => {
  const {id} = route.params;
  const [loading, setloading] = useState(false);
  const [apiCalled, setapiCalled] = useState(false);

  const [request, setrequest] = useState(null);

  const navigation = useNavigation();

  const {user} = useContext(AuthContext);

  const handleGet = () => {
    getPromotion({id})
      .then(res => {
        setrequest(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleAccept = () => {
    setapiCalled(true);
    acceptPromotion({id: request._id})
      .then(res => {
        setapiCalled(false);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleReject = () => {
    setapiCalled(true);
    rejectPromotion({id: request._id})
      .then(res => {
        setapiCalled(false);
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {request != null && (
        <View style={{gap: 20, padding: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Image
                source={{
                  uri:
                    user.userType == 'influencer'
                      ? request.userID.profileImage
                      : request.influencerID.profileImage,
                }}
                style={{width: 45, height: 45, borderRadius: 100}}
              />
              <Text style={[{fontSize: 16}, global.fontMedium]}>
                {user.userType == 'influencer'
                  ? request.userID.username
                  : request.influencerID.username}
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
              {CapitalizeFirst(request.status)}
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
            <Text style={[global.textNormal, global.fontBold]}>
              Description
            </Text>
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
            <Text style={[global.textNormal, global.fontBold]}>
              No. of likes
            </Text>
            <Text style={[global.gray3Color, {fontSize: 16}]}>
              {request.requirements.likes}
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
              {request.requirements.comments}
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
                {moment(request.deadline).format('DD MMM YYYY')}
              </Text>
            </View>
            {request.status == 'completed' && (
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
          {request.status == 'pending' && (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 20,
              }}>
              <Pressable
                onPress={handleAccept}
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
                onPress={handleReject}
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
          {request.status == 'not-started' && user.userType != 'startup' && (
            <Button
              onPress={() =>
                navigation.navigate('SelectMedia', {id: request._id})
              }
              style={{
                backgroundColor: '#FFB33E',
                width: 137,
                borderRadius: 5,
                alignSelf: 'flex-end',
              }}>
              <Text style={{color: 'white'}}>Get Started</Text>
            </Button>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RequestDetails;

const styles = StyleSheet.create({});

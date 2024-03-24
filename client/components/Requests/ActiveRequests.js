import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import global from '../../assets/styles/global';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {getPromotions} from '../../api/promotion';
import {AuthContext} from '../../contexts/userContext';

const ActiveRequests = ({requests}) => {
  const navigation = useNavigation();

  const {user} = useContext(AuthContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: '80%'}}>
      <View style={{gap: 25}}>
        <View>
          <View style={{gap: 20, marginVertical: 10}}>
            {requests.filter(req => req.status == 'started').length == 0 && (
              <Text style={[{textAlign: 'center'}, global.fontMedium]}>
                No active promotions
              </Text>
            )}
            {requests
              .filter(req => req.status == 'started')
              .map(req => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('Requests', {
                      screen: 'RequestDetails',
                      params: {id: req._id},
                    })
                  }
                  style={{
                    padding: 10,
                    marginHorizontal: 2,
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    elevation: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 8,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{
                        uri:
                          user.userType == 'influencer'
                            ? req.userID.profileImage
                            : req.influencerID.profileImage,
                      }}
                      style={{height: 45, width: 45, borderRadius: 100}}
                    />
                    <View style={{maxWidth: 130}}>
                      <Text
                        style={[global.textSmall, global.fontMedium]}
                        numberOfLines={1}>
                        {user.userType == 'influencer'
                          ? req.userID.username
                          : req.influencerID.username}
                      </Text>
                      <Text style={[global.grayColor, global.textExtraSmall]}>
                        {req.category}
                      </Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text style={[global.fontBold, global.textSmall]}>
                      ${req.transactionID.amount}
                    </Text>
                    <Text
                      style={[global.grayColor, global.textExtraSmall]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {' '}
                      Delivery {moment(req.deadline).fromNow()}
                    </Text>
                  </View>
                </Pressable>
              ))}
          </View>
        </View>
        <View>
          <>
            {requests.filter(req => req.status == 'not-started').length > 0 && (
              <Text style={[global.fontBold, global.textSmall]}>
                Not started yet
              </Text>
            )}
            <View style={{gap: 20, marginVertical: 10}}>
              {requests
                .filter(req => req.status == 'not-started')
                .map(req => (
                  <Pressable
                    style={{
                      padding: 10,
                      marginHorizontal: 2,
                      borderRadius: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: 'white',
                      elevation: 5,
                    }}
                    onPress={() => {
                      navigation.navigate('Requests', {
                        screen: 'RequestDetails',
                        params: {id: req._id},
                      });
                      //  navigation.navigate('PostCreator')}
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 8,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={{
                          uri:
                            user.userType == 'influencer'
                              ? req.userID.profileImage
                              : req.influencerID.profileImage,
                        }}
                        style={{height: 45, width: 45, borderRadius: 100}}
                      />
                      <View style={{maxWidth: 130}}>
                        <Text
                          style={[global.textSmall, global.fontMedium]}
                          numberOfLines={1}>
                          {user.userType == 'influencer'
                            ? req.userID.username
                            : req.influencerID.username}
                        </Text>
                        <Text style={[global.grayColor, global.textExtraSmall]}>
                          {req.category}
                        </Text>
                      </View>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Text style={[global.fontBold, global.textSmall]}>
                        ${req.transactionID.amount}
                      </Text>
                      <Text
                        style={[global.grayColor, global.textExtraSmall]}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {' '}
                        Delivery {moment(req.deadline).fromNow()}
                      </Text>
                    </View>
                  </Pressable>
                ))}
            </View>
          </>
        </View>
      </View>
    </ScrollView>
  );
};

export default ActiveRequests;

const styles = StyleSheet.create({});

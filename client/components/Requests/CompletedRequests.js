import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import moment from 'moment';
import global from '../../assets/styles/global';
import Stars from '../Dashboard/Stars';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/userContext';

const CompletedRequests = ({requests}) => {
  const navigation = useNavigation();

  const {user} = useContext(AuthContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: '80%'}}>
      {requests.filter(req => req.status == 'completed').length == 0 && (
        <Text style={[{textAlign: 'center'}, global.fontMedium]}>
          No completed promotions
        </Text>
      )}
      <View style={{gap: 20, marginVertical: 10}}>
        {requests.map(req => (
          <Pressable
            onPress={() =>
              navigation.navigate('Requests', {
                screen: 'RequestDetails',
                params: {status: 'completed'},
              })
            }
            style={{
              padding: 10,
              marginHorizontal: 2,
              borderRadius: 10,
              backgroundColor: 'white',
              elevation: 5,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <Image
                  source={{
                    uri:
                      user == 'influencer'
                        ? req.userID.profileImage
                        : req.influencerID.profileImage,
                  }}
                  style={{height: 45, width: 45, borderRadius: 100}}
                />
                <View>
                  <Text style={[global.textSmall, global.fontMedium]}>
                    {user == 'influencer'
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
                <Stars value={req.reviewID?.rating} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View style={{flexDirection: 'row', gap: 15}}>
                <View style={{gap: 2}}>
                  <Text
                    style={[
                      global.fontMedium,
                      global.blackColor,
                      global.textExtraSmall,
                    ]}>
                    {moment(req.endDate).format('DD MMM YYYY')}
                  </Text>
                  <Text style={[global.grayColor, {fontSize: 12}]}>
                    Due Date
                  </Text>
                </View>
                <View style={{gap: 2}}>
                  <Text
                    style={[
                      global.fontMedium,
                      global.blackColor,
                      global.textExtraSmall,
                    ]}>
                    {moment(req.completedOn).format('DD MMM YYYY')}
                  </Text>
                  <Text style={[global.grayColor, {fontSize: 12}]}>
                    Delivery
                  </Text>
                </View>
              </View>
              <View
                style={[
                  global.greenBtnSm,
                  {
                    width: '35%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text style={{color: 'white'}}>Completed</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default CompletedRequests;

const styles = StyleSheet.create({});

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import global from '../../assets/styles/global';
import Stars from '../Dashboard/Stars';
import {useNavigation} from '@react-navigation/native';

const CompletedRequests = ({requests}) => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: '80%'}}>
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
                  source={req.influencerID.image}
                  style={{height: 45, width: 45, borderRadius: 100}}
                />
                <View>
                  <Text style={[global.textSmall, global.fontMedium]}>
                    {req.influencerID.name}
                  </Text>
                  <Text style={[global.grayColor, global.textExtraSmall]}>
                    {req.title}
                  </Text>
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={[global.fontBold, global.textSmall]}>
                  ${req.transactionID.amount}
                </Text>
                <Stars value={4} />
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

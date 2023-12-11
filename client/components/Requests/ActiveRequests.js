import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import global from '../../assets/styles/global';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const ActiveRequests = ({requests}) => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: '80%'}}>
      <View style={{gap: 25}}>
        <View>
          <Text style={[global.fontBold, global.textSmall]}>
            Due in next few days
          </Text>
          <View style={{gap: 20, marginVertical: 10}}>
            {requests.map(req => (
              <Pressable
                onPress={() =>
                  navigation.navigate('RequestDetails', {status: 'active'})
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
                  <Text
                    style={[global.grayColor, global.textExtraSmall]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {' '}
                    Delivery {moment(req.endDate).fromNow()}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
        <View>
          <Text style={[global.fontBold, global.textSmall]}>
            Due this month
          </Text>
          <View style={{gap: 20, marginVertical: 10}}>
            {requests.map(req => (
              <Pressable
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
                  <Text
                    style={[global.grayColor, global.textExtraSmall]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {' '}
                    Delivery {moment(req.endDate).fromNow()}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ActiveRequests;

const styles = StyleSheet.create({});

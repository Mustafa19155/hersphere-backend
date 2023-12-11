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
import MessageIcon from '../../assets/icons/message.png';
import global from '../../assets/styles/global';
import {useNavigation} from '@react-navigation/native';

const NewRequests = ({requests}) => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: '80%'}}>
      <View style={{gap: 20, marginVertical: 10}}>
        {requests.map(req => (
          <Pressable
            onPress={() =>
              navigation.navigate('RequestDetails', {status: 'new'})
            }
            style={{
              padding: 10,
              marginHorizontal: 2,
              borderRadius: 10,
              backgroundColor: 'white',
              elevation: 5,
            }}>
            <View style={{flexDirection: 'row', gap: 8}}>
              <Image
                source={req.influencerID.image}
                style={{height: 45, width: 45, borderRadius: 100}}
              />
              <View>
                <View
                  style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
                  <Text style={[global.textSmall, global.fontMedium]}>
                    {req.influencerID.name}
                  </Text>
                  <Pressable
                    onPress={e => {
                      e.stopPropagation();
                      navigation.navigate('Chats', {screen: 'Chat'});
                    }}>
                    <Image source={MessageIcon} />
                  </Pressable>
                </View>
                <Text style={[global.gray3Color, {fontSize: 12}]}>
                  {req.title}
                </Text>
              </View>
            </View>
            <Text style={[global.gray3Color, {fontSize: 16, marginTop: 10}]}>
              {req.description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                gap: 10,
                marginTop: 20,
              }}>
              <Pressable
                onPress={e => {
                  e.stopPropagation();
                }}
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
                onPress={e => {
                  e.stopPropagation();
                }}
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
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default NewRequests;

const styles = StyleSheet.create({});

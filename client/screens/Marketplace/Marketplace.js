import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import global from '../../assets/styles/global';
import {getAllWorkplaces} from '../../api/workplace';
import {getChatroomsOfUser} from '../../api/chatroom';
import {AuthContext} from '../../contexts/userContext';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const Marketplace = () => {
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [workplaces, setworkplaces] = useState([]);

  const {user} = useContext(AuthContext);

  const handleGetWorkplaces = () => {
    setloading(true);
    getChatroomsOfUser(user._id)
      .then(res => {
        setloading(false);
        setworkplaces(res);
      })
      .catch(err => {
        setloading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGetWorkplaces();
    }, []),
  );

  return (
    <ScrollView>
      <View style={{gap: 10}}>
        <Text style={[global.textMedium, global.fontBold]}>Teams</Text>
        <View
          style={[
            {
              gap: 10,
              paddingVertical: 20,
              marginVertical: 10,
              borderTopColor: 'lightgray',
              borderTopWidth: 1,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 1,
            },
          ]}>
          {workplaces.map(place => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chatroom', {
                  screen: 'Workplace',
                  params: {id: place.workplaceID._id},
                })
              }>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                  {place.workplaceID.image ? (
                    <Image
                      source={{uri: place.workplaceID.image}}
                      style={{height: 40, width: 40, borderRadius: 5}}
                    />
                  ) : (
                    <Image style={{height: 40, width: 40}} />
                  )}
                  <View>
                    <Text style={[global.fontMedium, global.textNormal]}>
                      {place.workplaceID.name}
                    </Text>
                    <Text>{place.membersID.length} members</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', gap: 8}}>
                  {place.unreadMessages > 0 && (
                    <View
                      style={[
                        global.greenBack,
                        {borderRadius: 50, padding: 5},
                      ]}>
                      <Text style={{color: 'white'}}>
                        {place.unreadMessages} new messages
                      </Text>
                    </View>
                  )}
                  <AntDesignIcons name="right" size={20} color="black" />
                </View>
              </View>
              {/* <Text>{place.name}</Text> */}
            </TouchableOpacity>
          ))}
        </View>
        <View style={{gap: 10}}>
          <TouchableOpacity
            style={[
              global.greenBtnSm,
              {
                height: 50,
                flex: 1,
                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
            onPress={() =>
              navigation.navigate('Marketplace', {screen: 'CreateWorkplace'})
            }>
            <Text style={[global.greenBtnTextMd, global.fontMedium]}>
              Create New Workplace
            </Text>
            <AntDesignIcons name="right" color="white" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              global.greenBtnSm,
              {
                height: 50,
                flex: 1,
                flexDirection: 'row',
                padding: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
            onPress={() =>
              navigation.navigate('Marketplace', {screen: 'CreateJob'})
            }>
            <Text style={[global.greenBtnTextMd, global.fontMedium]}>
              Create a job
            </Text>
            <AntDesignIcons name="right" color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Marketplace;

const styles = StyleSheet.create({});

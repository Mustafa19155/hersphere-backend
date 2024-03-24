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
import MessageIcon from '../../assets/icons/message.png';
import global from '../../assets/styles/global';
import {useNavigation} from '@react-navigation/native';
import ConfirmModal from '../modals/ConfirmModal';
import {AuthContext} from '../../contexts/userContext';
import {acceptPromotion, rejectPromotion} from '../../api/promotion';

const NewRequests = ({requests, setrequests, mainRequests}) => {
  const navigation = useNavigation();
  const [showConfirmModal, setshowConfirmModal] = useState(false);
  const [activeReq, setactiveReq] = useState(null);
  const [currentAction, setcurrentAction] = useState('accept');

  const handleReject = () => {
    setshowConfirmModal(false);
    rejectPromotion({id: activeReq._id})
      .then(res => {
        const foundIndex = mainRequests.findIndex(r => r._id == activeReq._id);
        const newRequests = [...mainRequests];
        newRequests[foundIndex].status = 'rejected';
        setrequests(newRequests);
      })
      .catch(err => {});

    setactiveReq(null);
  };

  const handleAccept = () => {
    setshowConfirmModal(false);
    acceptPromotion({id: activeReq._id})
      .then(res => {
        const foundIndex = mainRequests.findIndex(r => r._id == activeReq._id);
        const newRequests = [...mainRequests];
        newRequests[foundIndex].status = 'not-started';
        setrequests(newRequests);

        // navigation.navigate('PostCreator');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const {user} = useContext(AuthContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: '80%'}}>
      <ConfirmModal
        text={`Are you sure you want to ${currentAction} this request?`}
        onconfirm={currentAction == 'accept' ? handleAccept : handleReject}
        open={showConfirmModal}
        setopen={setshowConfirmModal}
      />
      {requests.filter(req => req.status == 'new').length == 0 && (
        <Text style={[{textAlign: 'center'}, global.fontMedium]}>
          No new requests
        </Text>
      )}
      <View style={{gap: 20, marginVertical: 10}}>
        {requests.map((req, index) => (
          <Pressable
            onPress={() =>
              // navigation.navigate('RequestDetails', {status: 'new'})

              navigation.navigate('Requests', {
                screen: 'RequestDetails',
                params: {id: req._id},
              })
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
                source={{
                  uri:
                    user.userType == 'influencer'
                      ? req.userID?.profileImage
                      : req.influencerID.profileImage,
                }}
                style={{height: 45, width: 45, borderRadius: 100}}
              />
              <View style={{width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text style={[global.textSmall, global.fontMedium]}>
                    {user.userType == 'influencer'
                      ? req.userID.username
                      : req.influencerID.username}
                  </Text>
                  <Pressable
                    onPress={e => {
                      e.stopPropagation();
                      navigation.navigate('Chats', {
                        screen: 'Chat',
                        params: {
                          id:
                            user.userType == 'influencer'
                              ? req.userID._id
                              : req.influencerID._id,
                        },
                      });
                    }}>
                    <Image source={MessageIcon} />
                  </Pressable>
                </View>
                <Text style={[global.gray3Color, {fontSize: 12}]}>
                  {req.category}
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
                  setcurrentAction('accept');
                  setshowConfirmModal(true);
                  setactiveReq(req);
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
                  setcurrentAction('reject');
                  e.stopPropagation();
                  setactiveReq(req);
                  setshowConfirmModal(true);
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

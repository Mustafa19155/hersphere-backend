import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  acceptRequest,
  getJobRequestsForUser,
  rejectRequest,
} from '../../api/jobRequests';
import {Button} from 'react-native-paper';
import global from '../../assets/styles/global';
import MessageIcon from '../../assets/icons/message.png';
import AntDesigns from 'react-native-vector-icons/AntDesign';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const TeamRequests = () => {
  const navigation = useNavigation();

  const [requests, setrequests] = useState([]);
  const [loading, setloading] = useState(false);

  const handleGetRequests = () => {
    setloading(true);
    getJobRequestsForUser({status: 'pending'})
      .then(res => {
        setrequests(res);
      })
      .catch(err => {
        setloading(false);
      });
  };

  const handleAccept = data => {
    acceptRequest({id: data._id})
      .then(res => {
        handleGetRequests();
      })
      .catch(err => {});
  };
  const handleReject = data => {
    rejectRequest({id: data._id})
      .then(res => {
        handleGetRequests();
      })
      .catch(err => {});
  };

  useFocusEffect(useCallback(() => handleGetRequests(), []));

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{height: Dimensions.get('screen').height - 250}}>
      <View style={{gap: 10}}>
        {requests.map(req => (
          <>
            {req.workplace.jobRequests.length > 0 && (
              <>
                <View>
                  <View>
                    {req.workplace.jobRequests.map(jobReq => (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          navigation.navigate('Requests', {
                            screen: 'Profile',
                            params: {
                              jobRequestId: jobReq._id,
                              userId: jobReq.userID._id,
                            },
                          })
                        }>
                        <View
                          style={{
                            elevation: 5,
                            backgroundColor: 'white',
                            gap: 15,
                            margin: 5,
                            padding: 10,
                            borderRadius: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingHorizontal: 10,
                            }}>
                            <View style={{flexDirection: 'row', gap: 5}}>
                              <Image
                                source={{uri: jobReq.userID.profileImage}}
                                style={{
                                  height: 36,
                                  width: 36,
                                  borderRadius: 36,
                                }}
                              />
                              <View>
                                <Text
                                  style={[global.textSmall, global.fontMedium]}>
                                  {jobReq.userID.username}
                                </Text>
                                <Text
                                  style={[
                                    global.grayColor,
                                    global.textExtraSmall,
                                  ]}>
                                  {/* {jobReq.userID.skills?.slice(0, 2).join(' | ')} */}
                                  Freelancer | Influencer
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    gap: 5,
                                    alignItems: 'center',
                                  }}>
                                  <AntDesigns name="star" color={'#FFB33E'} />
                                  <Text
                                    style={[
                                      global.fontBold,
                                      global.textExtraSmall,
                                    ]}>
                                    5.0
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <TouchableWithoutFeedback
                              onPress={e => {
                                e.preventDefault();
                                navigation.navigate('Chats', {
                                  screen: 'Chat',
                                  params: {id: jobReq.userID._id},
                                });
                              }}>
                              <Image source={MessageIcon} />
                            </TouchableWithoutFeedback>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{gap: 5}}>
                              <Text
                                style={[
                                  global.textExtraSmall,
                                  global.fontMedium,
                                ]}>
                                Applied For
                              </Text>
                              <View style={{flexDirection: 'row', gap: 10}}>
                                <Image
                                  source={{
                                    uri: req.workplace.image,
                                  }}
                                  style={{
                                    height: 22,
                                    width: 22,
                                    borderRadius: 5,
                                  }}
                                />
                                <Text>{req.workplace.name}</Text>
                              </View>
                            </View>
                            <View style={{gap: 5}}>
                              <Text
                                style={[
                                  global.textExtraSmall,
                                  global.fontMedium,
                                ]}>
                                Position
                              </Text>
                              <Text>{jobReq.jobID.workplaceCategoryID}</Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 15,
                              justifyContent: 'flex-end',
                            }}>
                            <TouchableOpacity
                              style={[
                                global.greenBtnSm,
                                {
                                  width: 79,
                                  height: 25,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 4,
                                },
                              ]}
                              onPress={() => handleAccept(jobReq)}>
                              <Text style={[global.greenBtnTextSm]}>
                                Accept
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                global.redBtnSm,
                                {
                                  width: 79,
                                  height: 25,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 4,
                                },
                              ]}
                              onPress={() => handleReject(jobReq)}>
                              <Text style={[global.redBtnTextSm]}>Reject</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </View>
                </View>
              </>
            )}
          </>
        ))}
      </View>
    </ScrollView>
  );
};

export default TeamRequests;

const styles = StyleSheet.create({});

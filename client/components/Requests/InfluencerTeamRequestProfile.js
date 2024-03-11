import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getUserJobRequestDetails} from '../../api/user';
import AntDesigns from 'react-native-vector-icons/AntDesign';
import global from '../../assets/styles/global';
import {acceptRequest, rejectRequest} from '../../api/jobRequests';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';

const InfluencerTeamRequestProfile = ({route}) => {
  const {jobRequestId, userId} = route.params;

  const [userDetails, setuserDetails] = useState(null);
  const [activeTab, setactiveTab] = useState('about');

  const navigation = useNavigation();

  const toast = useToast();

  const handleGetUserDetails = () => {
    getUserJobRequestDetails({userId})
      .then(res => {
        setuserDetails(res);
      })
      .catch(err => {});
  };

  const handleAccept = () => {
    acceptRequest({id: jobRequestId})
      .then(res => {
        toast.show('Request accepted', {type: 'success'});
        navigation.goBack();
      })
      .catch(err => {});
  };
  const handleReject = () => {
    rejectRequest({id: jobRequestId})
      .then(res => {
        toast.show('Request rejected', {type: 'rejected'});
        navigation.goBack();
      })
      .catch(err => {});
  };

  useEffect(() => {
    handleGetUserDetails();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {userDetails && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                borderBottomColor: 'rgba(0,0,0,0.2)',
                borderBottomWidth: 1,
                padding: 20,
              }}>
              <Image
                source={{uri: userDetails.profileImage}}
                style={{width: 83, height: 83, borderRadius: 83}}
              />
              <View style={{gap: 5}}>
                <View style={{flexDirection: 'row', gap: 5}}>
                  <Text style={[global.textNormal, global.fontBold]}>
                    {userDetails.username}
                  </Text>
                  <AntDesigns name="mail" size={24} />
                </View>
                <Text style={[global.grayColor]}>
                  {/* {userDetails.skills?.slice(0, 2).join(' | ')} */}
                  Freelancer | Influencer
                </Text>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <View style={{flexDirection: 'row'}}>
                    {Array.from({
                      length: Math.round(userDetails.averageRating),
                    }).map((_, i) => {
                      return (
                        <AntDesigns name="star" size={14} color={'#FFB33E'} />
                      );
                    })}
                  </View>
                  <Text style={[global.fontBold]}>
                    {userDetails.averageRating}
                  </Text>
                  <Text style={[global.grayColor]}>
                    ({userDetails.jobs.length} Reviews)
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                    marginTop: 5,
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
                    onPress={handleAccept}>
                    <Text style={[global.greenBtnTextSm]}>Accept</Text>
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
                    onPress={handleReject}>
                    <Text style={[global.redBtnTextSm]}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}>
              <TouchableWithoutFeedback onPress={() => setactiveTab('about')}>
                <View
                  style={{
                    borderBottomColor:
                      activeTab != 'about' ? 'white' : 'rgba(0,0,0,0.2)',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    alignItems: 'center',
                  }}>
                  <AntDesigns name="user" size={23} />
                  <Text>About</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setactiveTab('reviews')}>
                <View
                  style={{
                    borderBottomColor:
                      activeTab != 'reviews' ? 'white' : 'rgba(0,0,0,0.2)',
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    alignItems: 'center',
                  }}>
                  <AntDesigns name="staro" size={23} />
                  <Text>Reviews</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{padding: 20}}>
              {activeTab == 'about' ? (
                <View style={{gap: 20}}>
                  <View style={{gap: 10}}>
                    <Text style={[global.textSmall, global.fontBold]}>
                      Description
                    </Text>
                    <View
                      style={{
                        elevation: 5,
                        backgroundColor: 'white',
                        padding: 10,
                        borderRadius: 5,
                      }}>
                      <Text>{userDetails.businessDetails.description}</Text>
                    </View>
                  </View>
                  <View style={{gap: 10}}>
                    <Text style={[global.textSmall, global.fontBold]}>
                      Skills
                    </Text>
                    {userDetails.skills?.length > 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          elevation: 5,
                          backgroundColor: 'white',
                          padding: 10,
                          borderRadius: 5,
                        }}>
                        {userDetails.businessDetails.skills?.map(skill => (
                          <View
                            style={[
                              global.grayBack,
                              {
                                paddingVertical: 5,
                                paddingHorizontal: 12,
                                borderRadius: 5,
                                margin: 5,
                              },
                            ]}>
                            <Text style={{color: 'white'}}>{skill}</Text>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <Text style={[global.fontBold, {alignSelf: 'center'}]}>
                        No skills to show
                      </Text>
                    )}
                  </View>
                </View>
              ) : (
                <View style={{gap: 20}}>
                  {userDetails.jobs.map(job => (
                    <>
                      <View
                        style={{
                          gap: 10,
                          elevation: 5,
                          backgroundColor: 'white',
                          padding: 10,
                          borderRadius: 5,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 5,
                              alignItems: 'center',
                            }}>
                            <Image
                              source={{
                                uri: job.workplace.createdBy.profileImage,
                              }}
                              style={{height: 32, width: 32, borderRadius: 32}}
                            />
                            <View>
                              <View>
                                <Text
                                  style={[global.textSmall, global.fontBold]}>
                                  {job.workplace.createdBy.username}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                  }}>
                                  <View style={{flexDirection: 'row'}}>
                                    {Array.from({
                                      length: 5,
                                    }).map((_, i) => {
                                      return (
                                        <AntDesigns
                                          name={
                                            job.review.rating > i
                                              ? 'star'
                                              : 'staro'
                                          }
                                          size={14}
                                          color={
                                            job.review.rating > i
                                              ? '#FFB33E'
                                              : 'black'
                                          }
                                        />
                                      );
                                    })}
                                  </View>
                                  <Text
                                    style={[
                                      global.fontBold,
                                      global.textExtraSmall,
                                    ]}>
                                    {job.review.rating.toFixed(1)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View>
                            <Text style={[global.grayColor, global.fontMedium]}>
                              {moment(job.review.date).fromNow()}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text>{job.review.description}</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          gap: 10,
                          elevation: 5,
                          backgroundColor: 'white',
                          padding: 10,
                          borderRadius: 5,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 5,
                              alignItems: 'center',
                            }}>
                            <Image
                              source={{
                                uri: job.workplace.createdBy.profileImage,
                              }}
                              style={{height: 32, width: 32, borderRadius: 32}}
                            />
                            <View>
                              <View>
                                <Text
                                  style={[global.textSmall, global.fontBold]}>
                                  {job.workplace.createdBy.username}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                  }}>
                                  <View style={{flexDirection: 'row'}}>
                                    {Array.from({
                                      length: 5,
                                    }).map((_, i) => {
                                      return (
                                        <AntDesigns
                                          name={
                                            job.review.rating > i
                                              ? 'star'
                                              : 'staro'
                                          }
                                          size={14}
                                          color={
                                            job.review.rating > i
                                              ? '#FFB33E'
                                              : 'black'
                                          }
                                        />
                                      );
                                    })}
                                  </View>
                                  <Text
                                    style={[
                                      global.fontBold,
                                      global.textExtraSmall,
                                    ]}>
                                    {job.review.rating.toFixed(1)}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                          <View>
                            <Text style={[global.grayColor, global.fontMedium]}>
                              {moment(job.review.date).fromNow()}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text>{job.review.description}</Text>
                        </View>
                      </View>
                    </>
                  ))}
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default InfluencerTeamRequestProfile;

const styles = StyleSheet.create({});

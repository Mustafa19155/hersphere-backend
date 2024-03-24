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
import React, {useEffect, useState} from 'react';
import TeamIcon from '../../assets/icons/team.png';
import MemberIcon from '../../assets/icons/member.png';
import EditIcon from '../../assets/icons/edit.png';
import PlusIcon from '../../assets/icons/plus.png';
import global from '../../assets/styles/global';
import {deleteChatroom, getChatroomById} from '../../api/chatroom';
import moment from 'moment';
import {Button, Modal, Portal, TextInput} from 'react-native-paper';
import SuccessModal from '../../components/SuccessModal';
import ConfirmModal from '../../components/modals/ConfirmModal';

const ChatroomSetting = ({route}) => {
  const navigation = useNavigation();
  const [chatroom, setchatroom] = useState(null);
  const [loading, setloading] = useState(true);
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [editTitle, seteditTitle] = useState(false);
  const [editDescription, seteditDescription] = useState(false);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);
  const [showReviewModal, setshowReviewModal] = useState(false);
  const [activeReviewUser, setactiveReviewUser] = useState(null);
  const [apiCalled, setapiCalled] = useState(false);
  const [jobs, setjobs] = useState([]);
  const [showConfirmDeleteModal, setshowConfirmDeleteModal] = useState(false);
  const [activeDeleteId, setactiveDeleteId] = useState(null);

  const toast = useToast();

  const handleGetChatroom = async () => {
    setloading(true);
    try {
      const chatroom = await getChatroomById(route.params.workplaceID);
      setjobs(await getOpenJobsOfWorkplace(chatroom.workplaceID._id));

      setname(chatroom.workplaceID.name);
      setdescription(chatroom.workplaceID.description);
      setchatroom(chatroom);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const handleSaveChanges = () => {
    setapiCalled(true);
    updateWorkplaceById({
      id: chatroom.workplaceID._id,
      data: {review: {name, description}},
    })
      .then(res => {
        setapiCalled(false);
        setshowSuccessMessage(true);
      })
      .catch(err => {
        setapiCalled(false);
      });
  };

  const handleDeletJob = () => {
    deleteJobById(activeDeleteId)
      .then(res => {
        toast.show('Job Deleted Successfully', {
          type: 'success',
        });
        setshowConfirmDeleteModal(false);
        setactiveDeleteId(null);
        handleGetChatroom();
      })
      .catch(err => {
        setshowConfirmDeleteModal(false);
      });
  };

  const handleDeleteWorkplace = () => {
    deleteChatroom(chatroom.workplaceID._id)
      .then(res => {
        navigation.navigate('Main');
        toast.show('Workplace Deleted Successfully', {
          type: 'success',
        });
      })
      .catch(err => {
        console.log(err);
        setshowConfirmDeleteModal(false);
      });
  };

  useEffect(() => {
    handleGetChatroom();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SuccessModal
        open={showSuccessMessage}
        setopen={setshowSuccessMessage}
        text={'Settings has been changed Successfully'}
      />
      <AddReviewModal
        handleGetChatroom={handleGetChatroom}
        open={showReviewModal}
        setopen={setshowReviewModal}
        user={activeReviewUser}
      />
      {showConfirmDeleteModal && (
        <ConfirmModal
          open={showConfirmDeleteModal}
          setopen={setshowConfirmDeleteModal}
          onconfirm={activeDeleteId ? handleDeletJob : handleDeleteWorkplace}
          text={`Are you sure you want to delete this ${
            activeDeleteId ? 'Job' : 'Workplace'
          }?`}
        />
      )}
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height - 100,
          }}>
          <Loader color={'black'} size={20} />
        </View>
      ) : (
        <View style={{padding: 20}}>
          {chatroom && (
            <View style={{gap: 30}}>
              <View
                style={{
                  borderBottomColor: 'rgba(0,0,0,0.1)',
                  borderBottomWidth: 1,
                  paddingBottom: 30,
                  gap: 20,
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image source={TeamIcon} />
                  <Text style={[global.fontBold]}>Team Settings</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={[global.fontBold]}>Team Name</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                    }}>
                    <TextInput
                      disabled={!editTitle}
                      placeholder="Team Name"
                      value={name}
                      onChangeText={setname}
                      outlineColor="transparent"
                      activeOutlineColor="transparent"
                      style={[global.gray2Back, {borderRadius: 5, height: 40}]}
                      underlineColor="transparent"
                      mode="outlined"
                    />
                    <TouchableWithoutFeedback
                      onPress={() => seteditTitle(true)}>
                      <Image source={EditIcon} />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={[global.fontBold]}>Description</Text>
                    <TouchableWithoutFeedback
                      onPress={() => seteditDescription(true)}>
                      <Image source={EditIcon} />
                    </TouchableWithoutFeedback>
                  </View>
                  <TextInput
                    disabled={!editDescription}
                    placeholder="Description"
                    value={description}
                    onChangeText={setdescription}
                    multiline={true}
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    style={[global.gray2Back, {borderRadius: 5}]}
                    numberOfLines={5}
                    underlineColor="transparent"
                    mode="outlined"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                  }}>
                  <Text style={[global.fontBold]}>Start Date</Text>
                  <TextInput
                    value={moment(chatroom.workplaceID.createdAt).format(
                      'DD/MM/YYYY',
                    )}
                    disabled
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    style={[global.gray2Back, {borderRadius: 5, height: 40}]}
                    underlineColor="transparent"
                    mode="outlined"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                  }}>
                  <Text style={[global.fontBold]}>End Date</Text>
                  <TextInput
                    value={moment(chatroom.workplaceID.endDate).format(
                      'DD/MM/YYYY',
                    )}
                    disabled
                    outlineColor="transparent"
                    activeOutlineColor="transparent"
                    style={[global.gray2Back, {borderRadius: 5, height: 40}]}
                    underlineColor="transparent"
                    mode="outlined"
                  />
                </View>
              </View>
              <View style={{gap: 10}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image source={MemberIcon} />
                  <Text style={[global.fontBold]}>Team Members</Text>
                </View>
                <View>
                  <View style={{gap: 15, margin: 2}}>
                    {chatroom.membersID.map(member => (
                      <>
                        {member.job && (
                          <View
                            key={member._id}
                            style={{
                              position: 'relative',
                              overflow: 'hidden',
                              padding: 10,
                              gap: 5,
                              elevation: 3,
                              backgroundColor: 'white',
                              borderRadius: 5,
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                gap: 10,
                                flex: 1,
                              }}>
                              <Image
                                source={{uri: member.profileImage}}
                                style={{
                                  height: 50,
                                  width: 50,
                                  borderRadius: 100,
                                }}
                              />
                              <View
                                style={{
                                  flex: 1,
                                }}>
                                <View
                                  style={{
                                    gap: 3,
                                  }}>
                                  <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={[
                                      global.textSmall,
                                      global.fontMedium,
                                    ]}>
                                    {member.username}
                                  </Text>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                      width:
                                        Dimensions.get('window').width - 120,
                                    }}>
                                    <Text
                                      style={[
                                        global.textExtraSmall,
                                        global.grayColor,
                                        global.fontBold,
                                      ]}>
                                      {member.job
                                        ? member.job?.workplaceCategoryID
                                        : 'Admin'}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <View>
                              <TouchableOpacity
                                style={[
                                  global.greenBtnSm,
                                  {
                                    paddingVertical: 10,
                                    paddingHorizontal: 8,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 5,
                                  },
                                ]}
                                onPress={() => {
                                  setactiveReviewUser(member);
                                  setshowReviewModal(true);
                                }}>
                                {member.job && member.job?.review?.rating ? (
                                  <>
                                    <Text style={[global.greenBtnTextSm]}>
                                      View Review
                                    </Text>
                                  </>
                                ) : (
                                  <>
                                    <Image source={PlusIcon} />
                                    <Text style={[global.greenBtnTextSm]}>
                                      Add Review
                                    </Text>
                                  </>
                                )}
                              </TouchableOpacity>
                            </View>
                          </View>
                        )}
                      </>
                    ))}
                  </View>
                </View>
              </View>
              <View style={{gap: 10}}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Image source={MemberIcon} />
                  <Text style={[global.fontBold]}>Open Jobs</Text>
                </View>
                {jobs.length === 0 && (
                  <Text
                    style={[
                      global.textExtraSmall,
                      global.grayColor,
                      {textAlign: 'center'},
                    ]}>
                    No Jobs Available
                  </Text>
                )}
                {jobs.map(job => (
                  // option to delete job
                  <View
                    key={job._id}
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      padding: 10,
                      gap: 5,
                      elevation: 3,
                      backgroundColor: 'white',
                      borderRadius: 5,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        flex: 1,
                      }}>
                      <View
                        style={{
                          flex: 1,
                        }}>
                        <View
                          style={{
                            gap: 3,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[global.textSmall, global.fontMedium]}>
                            {job.title}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: Dimensions.get('window').width - 120,
                            }}>
                            <Text
                              style={[
                                global.textExtraSmall,
                                global.grayColor,
                                global.fontBold,
                              ]}>
                              {job.description}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={[
                          global.redBtnSm,
                          {
                            paddingVertical: 10,
                            paddingHorizontal: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                          },
                        ]}
                        onPress={() => {
                          setactiveDeleteId(job._id);
                          setshowConfirmDeleteModal(true);
                          // navigation.navigate('Marketplace', {
                          //   screen: 'JobDetails',
                          //   params: {id: job._id},
                          // });
                        }}>
                        <Text style={[global.greenBtnTextSm]}>Delete Job</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                  justifyContent: 'flex-end',
                }}>
                {chatroom.canDelete && (
                  <Button
                    style={[
                      global.redBtnSm,
                      {width: 150, alignSelf: 'flex-end'},
                    ]}
                    onPress={() => setshowConfirmDeleteModal(true)}
                    disabled={apiCalled}>
                    <Text style={[global.redBtnTextSm]}>Delete Workplace</Text>
                  </Button>
                )}
                <Button
                  style={[
                    global.greenBtnSm,
                    {width: 110, alignSelf: 'flex-end'},
                  ]}
                  onPress={handleSaveChanges}
                  disabled={apiCalled}>
                  <Text style={[global.greenBtnTextSm]}>Save Changes</Text>
                </Button>
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default ChatroomSetting;

import ReviewNoteIcon from '../../assets/icons/review-note.png';
import ReviewPenIcon from '../../assets/icons/review-pen.png';
import ReviewHandIcon from '../../assets/icons/review-hand.png';
import AntDesigns from 'react-native-vector-icons/AntDesign';
import {updateWorkplaceById} from '../../api/workplace';
import {
  addReview,
  deleteJobById,
  getAllJobsOfWorkplace,
  getOpenJobsOfWorkplace,
} from '../../api/job';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../components/Loader';

const AddReviewModal = ({open, setopen, user, handleGetChatroom}) => {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    height: '60%',
    minHeight: 520,
  };

  const toast = useToast();

  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');
  const [isViewOnly, setisViewOnly] = useState(false);
  const [apiCalled, setapiCalled] = useState(false);

  const handleAddReview = () => {
    setapiCalled(true);
    addReview({id: user.job._id, data: {rating, description: review}})
      .then(res => {
        toast.show('Review Added Successfully', {
          type: 'success',
        });
        handleGetChatroom();
        setapiCalled(false);
        setopen(false);
      })
      .catch(err => {
        setapiCalled(false);
      });
  };

  useEffect(() => {
    if (user) {
      if (user.job && user.job?.review?.rating) {
        setrating(user.job?.review?.rating);
        setreview(user.job?.review?.description);
        setisViewOnly(true);
      } else {
        setisViewOnly(false);
        setrating(0);
        setreview('');
      }
    }
  }, [user]);

  return (
    <Portal>
      <Modal
        style={styles.modal}
        visible={open}
        onDismiss={() => setopen(false)}
        contentContainerStyle={containerStyle}>
        <ScrollView>
          <View style={{alignItems: 'center', gap: 30}}>
            <View style={{gap: 10}}>
              <View
                style={{
                  gap: 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Image source={ReviewNoteIcon} />
                <Image source={ReviewPenIcon} />
              </View>
              <View style={{alignItems: 'center', gap: 5}}>
                <View style={{flexDirection: 'row', gap: 3}}>
                  {Array.from({length: 5}).map((_, index) => (
                    <AntDesigns
                      key={index}
                      name={rating > index ? 'star' : 'staro'}
                      size={48}
                      color={'#FFB33E'}
                      disabled={isViewOnly}
                      onPress={() => setrating(index + 1)}
                    />
                  ))}
                </View>
                {!isViewOnly && (
                  <Text
                    style={[
                      global.textExtraSmall,
                      global.grayColor,
                      global.fontMedium,
                    ]}>
                    Tap a Star to Rate
                  </Text>
                )}
              </View>
            </View>
            <View style={{gap: 10}}>
              <View
                style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                <Image source={ReviewHandIcon} />
                <Text style={[global.fontMedium]}>
                  {isViewOnly ? 'Your Comment' : 'Write a comment, if any'}
                </Text>
              </View>
              <TextInput
                disabled={isViewOnly}
                placeholder="Your review will help someone make better decision."
                value={review}
                placeholderTextColor={'gray'}
                onChangeText={setreview}
                multiline={true}
                outlineColor="transparent"
                activeOutlineColor="transparent"
                style={[global.gray2Back, {borderRadius: 5}]}
                numberOfLines={8}
                underlineColor="transparent"
                mode="outlined"
              />
            </View>
            {!isViewOnly && (
              <Button
                style={[global.greenBtn, {width: '100%'}]}
                disabled={apiCalled}
                onPress={handleAddReview}>
                <Text style={[global.greenBtnText]}>
                  {apiCalled ? 'Loading...' : 'Submit'}
                </Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    bottom: -8,
    justifyContent: 'flex-end',
  },
});

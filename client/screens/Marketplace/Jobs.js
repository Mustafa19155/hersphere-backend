import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {getAllJobs} from '../../api/job';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import global from '../../assets/styles/global';
import {useToast} from 'react-native-toast-notifications';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import SkillsetIcon from '../../assets/icons/skillset.png';
import MoreIcon from '../../assets/icons/more.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

const Jobs = () => {
  const toast = useToast();

  const navigation = useNavigation();
  const [jobs, setjobs] = useState([
    {
      __v: 0,
      _id: '65e0e3a9bc5eea3730c10f72',
      applications: [],
      createdAt: '2024-02-29T20:06:01.394Z',
      description: 'dessss',
      hasApplied: false,
      price: 30,
      skillset: ['kkll'],
      title: 'jobbb',
      updatedAt: '2024-02-29T20:06:01.394Z',
      workplaceCategoryID: 'hiikk',
      workplaceID: {
        __v: 0,
        _id: '65e0e35754ee381b60474753',
        categories: [Array],
        createdAt: '2024-02-29T20:04:39.316Z',
        createdBy: '65d1aee7e382c64da82d4768',
        description: 'wrrtg',
        endDate: '2024-03-20T20:04:38.829Z',
        image:
          'https://firebasestorage.googleapis.com/v0/b/hersphere-d67c8.appspot.com/o/workplace-images%2Frn_image_picker_lib_temp_70837971-dde8-411a-b7ad-89c5dd0d34fd.jpg?alt=media&token=3c45401c-c7f1-4627-bd5d-2da0522bd8ca',
        name: 'dggy',
        totalMembers: 3,
        updatedAt: '2024-02-29T20:04:39.316Z',
      },
    },
  ]);
  const [loadingJobs, setloadingJobs] = useState(false);
  const [apiCalled, setapiCalled] = useState(false);

  const handleGetAllJobs = () => {
    setloadingJobs(true);
    getAllJobs()
      .then(res => {
        setjobs(res);
        setloadingJobs(false);
      })
      .catch(err => {
        setloadingJobs(false);
      });
  };

  const handleCreateReqeuest = job => {
    // setapiCalled(true);
    // createJobRequest({jobID: job._id}).then(res => {
    //   setapiCalled(false);
    //   toast.show('Applied successfully', {type: 'success'});
    //   handleGetAllJobs();
    // });
    // getAllJobs().catch(err => {
    //   setapiCalled(false);
    // });
    navigation.navigate('Marketplace', {
      screen: 'CreateJobRequest',
      params: {jobID: job._id},
    });
  };

  useEffect(() => {
    // handleGetAllJobs();
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     handleGetAllJobs();
  //   }, []),
  // );

  return (
    <ScrollView>
      <View style={{gap: 10}}>
        <Text style={[global.textLarge]}>Jobs</Text>
        {loadingJobs ? (
          <View></View>
        ) : (
          <View style={{gap: 10}}>
            {jobs.map(job => (
              <TouchableWithoutFeedback
                onPress={() => handleCreateReqeuest(job)}>
                <View
                  style={{
                    borderColor: 'black',
                    borderRadius: 10,
                    borderWidth: 1,
                  }}>
                  <View
                    style={{
                      borderBottomColor: 'lightgray',
                      borderBottomWidth: 1,
                    }}>
                    <View
                      style={{
                        padding: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', gap: 12}}>
                        {job.workplaceID.image ? (
                          <Image
                            source={{
                              uri: job.workplaceID.image,
                            }}
                            style={{width: 60, height: 60, borderRadius: 50}}
                          />
                        ) : (
                          <Image
                            style={{width: 60, height: 60, borderRadius: 50}}
                          />
                        )}
                        <View>
                          <Text style={[global.textMedium]}>{job.title}</Text>
                          <Text>{job.workplaceID.name}</Text>
                        </View>
                      </View>
                      <View>
                        <TouchableOpacity
                          style={[
                            global.greenBtn,
                            {
                              width: 40,
                              justifyContent: 'center',
                              alignItems: 'center',
                            },
                          ]}>
                          <AntDesignIcons
                            name="right"
                            size={12}
                            color="white"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      <MaterialIcons name="dashboard" size={24} />

                      <Text style={[global.textSmall, global.grayColor]}>
                        {job.workplaceCategoryID}
                      </Text>
                    </View>
                    {job.skillset.length > 0 && (
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 5,
                          alignItems: 'center',
                        }}>
                        <FontAwesomeIcons name="tasks" size={24} />
                        <Text style={[global.textSmall, global.grayColor]}>
                          {job.skillset[0]}
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      <AntDesignIcons name="wallet" size={24} />
                      <Text style={[global.textSmall, global.grayColor]}>
                        ${job.price}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Jobs;

const styles = StyleSheet.create({});

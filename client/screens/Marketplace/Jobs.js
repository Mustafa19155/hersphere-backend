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
  const [jobs, setjobs] = useState([]);
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

  useFocusEffect(
    useCallback(() => {
      handleGetAllJobs();
    }, []),
  );

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

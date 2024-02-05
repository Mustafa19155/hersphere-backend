import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {getAllJobs} from '../../api/job';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import global from '../../assets/styles/global';
import {Button} from 'react-native-paper';
import {createJobRequest} from '../../api/jobRequests';
import {useToast} from 'react-native-toast-notifications';

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
              <View>
                <Text>{job.title}</Text>
                <Button
                  style={[
                    !job.hasApplied ? global.greenBtnSm : global.disabledBtnSm,
                  ]}
                  onPress={() => {
                    setapiCalled(true);
                    createJobRequest({jobID: job._id}).then(res => {
                      setapiCalled(false);
                      toast.show('Applied successfully', {type: 'success'});
                      handleGetAllJobs();
                    });
                    getAllJobs().catch(err => {
                      setapiCalled(false);
                    });
                    //   navigation.navigate('CreateJobRe+quest');
                  }}
                  disabled={apiCalled || job.hasApplied}>
                  <Text style={[global.greenBtnTextSm]}>
                    {job.hasApplied ? 'Applied' : 'Apply Now'}
                  </Text>
                </Button>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Jobs;

const styles = StyleSheet.create({});

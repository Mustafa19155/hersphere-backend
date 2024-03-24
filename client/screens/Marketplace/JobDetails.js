import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getJobById} from '../../api/job';

const JobDetails = ({route}) => {
  const [loading, setloading] = useState(false);
  const [job, setjob] = useState(null);

  const handleGetJob = () => {
    setloading(true);
    getJobById(route.params.id)
      .then(res => {
        setjob(res);
        setloading(false);
      })
      .catch(err => {
        setloading(false);
      });
  };

  useEffect(() => {
    handleGetJob();
  }, []);

  return (
    <ScrollView>
      {job && (
        <View style={{padding: 20}}>
          <Text>{job.title}</Text>
          <Text>{job.description}</Text>
          <Text>{job.workplaceID.name}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default JobDetails;

const styles = StyleSheet.create({});

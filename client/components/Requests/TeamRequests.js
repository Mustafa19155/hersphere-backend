import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getJobRequestsForUser} from '../../api/jobRequests';

const TeamRequests = () => {
  const [requests, setrequests] = useState([]);
  const [loading, setloading] = useState(false);

  const handleGetRequests = () => {
    setloading(true);
    getJobRequestsForUser()
      .then(res => {
        setrequests(res);
      })
      .catch(err => {
        setloading(false);
      });
  };

  useEffect(() => {
    handleGetRequests();
  }, []);

  return (
    <View>
      {requests.map(req => (
        <View>
          <Text>Workplace</Text>
          <Text>{req.workplace.name}</Text>
          <View>
            {req.workplace.jobRequests.map(jobReq => (
              <View>
                <View>
                  <Text>Job</Text>
                  <Text>{jobReq.jobID.title}</Text>
                </View>
                <View>
                  <Text>User</Text>
                  <Text>{jobReq.userID.username}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default TeamRequests;

const styles = StyleSheet.create({});

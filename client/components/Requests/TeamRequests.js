import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  acceptRequest,
  getJobRequestsForUser,
  rejectRequest,
} from '../../api/jobRequests';
import {Button} from 'react-native-paper';
import global from '../../assets/styles/global';

const TeamRequests = () => {
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

  useEffect(() => {
    handleGetRequests();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{height: Dimensions.get('screen').height - 250}}>
      <View>
        {requests.map(req => (
          <>
            {req.workplace.jobRequests.length > 0 && (
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
                      <Button
                        style={[global.greenBtnSm]}
                        onPress={() => handleAccept(jobReq)}>
                        <Text style={[global.greenBtnTextSm]}>
                          Accept Request
                        </Text>
                      </Button>
                      <Button
                        style={[global.redBtnSm]}
                        onPress={() => handleReject(jobReq)}>
                        <Text style={[global.redBtnTextSm]}>
                          Reject Request
                        </Text>
                      </Button>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </>
        ))}
      </View>
    </ScrollView>
  );
};

export default TeamRequests;

const styles = StyleSheet.create({});

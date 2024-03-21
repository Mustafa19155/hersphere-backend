import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import global from '../../assets/styles/global';
import Avatar from '../../assets/images/avatar.png';
import ActiveRequests from '../../components/Requests/ActiveRequests';
import NewRequests from '../../components/Requests/NewRequests';
import CompletedRequests from '../../components/Requests/CompletedRequests';
import TeamRequests from '../../components/Requests/TeamRequests';
import {AuthContext} from '../../contexts/userContext';
import {getPromotions} from '../../api/promotion';
import {useFocusEffect} from '@react-navigation/native';

const Requests = () => {
  const [currentTab, setcurrentTab] = useState('Active');

  const {user} = useContext(AuthContext);

  const [requests, setrequests] = useState([]);

  const handleGet = () => {
    getPromotions()
      .then(res => {
        setrequests(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      handleGet();
    }, []),
  );

  return (
    <View>
      <Text style={[global.fontBold, global.textMedium]}>
        {currentTab} Requests
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <TouchableWithoutFeedback onPress={() => setcurrentTab('Active')}>
          <View
            style={[
              currentTab == 'Active' ? styles.active : {},
              styles.wrapper,
            ]}>
            <Text
              style={[
                currentTab == 'Active'
                  ? styles.activeText
                  : {
                      color: 'black',
                    },
                {fontWeight: 'bold'},
              ]}>
              Active
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {user.userType != 'startup' ? (
          <TouchableWithoutFeedback onPress={() => setcurrentTab('New')}>
            <View
              style={[
                currentTab == 'New' ? styles.active : {},
                styles.wrapper,
              ]}>
              <Text
                style={[
                  currentTab == 'New'
                    ? styles.activeText
                    : {
                        color: 'black',
                      },
                  {fontWeight: 'bold'},
                ]}>
                New
                {currentTab == 'New'
                  ? requests.filter(req => req.status == 'pending').length > 0
                    ? '   ' +
                      requests.filter(req => req.status == 'pending').length
                    : ''
                  : ''}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={() => setcurrentTab('Jobs')}>
            <View
              style={[
                currentTab == 'Jobs' ? styles.active : {},
                styles.wrapper,
              ]}>
              <Text
                style={[
                  currentTab == 'Jobs'
                    ? styles.activeText
                    : {
                        color: 'black',
                      },
                  {fontWeight: 'bold'},
                ]}>
                Jobs
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback onPress={() => setcurrentTab('Completed')}>
          <View
            style={[
              currentTab == 'Completed' ? styles.active : {},
              styles.wrapper,
            ]}>
            <Text
              style={[
                currentTab == 'Completed'
                  ? styles.activeText
                  : {
                      color: 'black',
                    },
                {fontWeight: 'bold'},
              ]}>
              Completed
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{marginTop: 20}}>
        {currentTab == 'Active' ? (
          <ActiveRequests
            requests={requests.filter(
              req => req.status == 'not-started' || req.status == 'started',
            )}
          />
        ) : currentTab == 'New' ? (
          <NewRequests
            requests={requests.filter(req => req.status == 'pending')}
            mainRequests={requests}
            setrequests={setrequests}
          />
        ) : currentTab == 'Completed' ? (
          <CompletedRequests
            requests={requests.filter(req => req.status == 'completed')}
          />
        ) : (
          <TeamRequests />
        )}
      </View>
    </View>
  );
};

export default Requests;

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('screen').height / 17,
    justifyContent: 'center',
    borderRadius: 100,
    width: '33%',
    alignItems: 'center',
  },
  active: [global.greenBack],
  activeText: {color: 'white'},
});

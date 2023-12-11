import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import global from '../../assets/styles/global';
import Avatar from '../../assets/images/avatar.png';
import ActiveRequests from '../../components/Requests/ActiveRequests';
import NewRequests from '../../components/Requests/NewRequests';
import CompletedRequests from '../../components/Requests/CompletedRequests';
import TeamRequests from '../../components/Requests/TeamRequests';

const Requests = () => {
  const [currentTab, setcurrentTab] = useState('Active');

  const [requests, setrequests] = useState([
    {
      id: 1,
      startDate: new Date(),
      endDate: new Date().setDate(12),
      status: 'active',
      title: 'New Launch Promotion',
      startupID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      influencerID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      platforms: ['facebook', 'youtube', 'instagram'],
      transactionID: {
        amount: 25,
      },
    },
    {
      id: 2,
      startDate: new Date(),
      endDate: new Date(),
      status: 'active',
      startupID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      title: 'New Launch Promotion',
      influencerID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      platforms: ['facebook', 'youtube', 'instagram'],
      transactionID: {
        amount: 25,
      },
    },
    {
      id: 3,
      startDate: new Date(),
      endDate: new Date(),
      completedOn: new Date(),
      status: 'completed',
      startupID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      title: 'New Launch Promotion',
      influencerID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      platforms: ['facebook', 'youtube', 'instagram'],
      transactionID: {
        amount: 25,
      },
    },
    {
      id: 4,
      startDate: new Date(),
      endDate: new Date(),
      completedOn: new Date(),
      status: 'completed',
      startupID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      title: 'New Launch Promotion',
      influencerID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      platforms: ['facebook', 'youtube', 'instagram'],
      transactionID: {
        amount: 25,
      },
    },
    {
      id: 5,
      startDate: new Date(),
      endDate: new Date(),
      status: 'new',
      startupID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      title: 'New Launch Promotion',
      influencerID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      description:
        'Lorem ipsum dolor sit amet, consectetur ipiscingelit. Etiam venenatis sit',
      platforms: ['facebook', 'youtube', 'instagram'],
      transactionID: {
        amount: 25,
      },
    },
    {
      id: 6,
      startDate: new Date(),
      endDate: new Date(),
      status: 'new',
      startupID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      title: 'New Launch Promotion',
      description:
        'Lorem ipsum dolor sit amet, consectetur ipiscingelit. Etiam venenatis sit',
      influencerID: {
        name: 'ClosetDoor',
        image: Avatar,
      },
      platforms: ['facebook', 'youtube', 'instagram'],
      transactionID: {
        amount: 25,
      },
    },
  ]);

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
        <TouchableWithoutFeedback onPress={() => setcurrentTab('New')}>
          <View
            style={[currentTab == 'New' ? styles.active : {}, styles.wrapper]}>
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
                ? requests.filter(req => req.status == 'new').length > 0
                  ? '   ' + requests.filter(req => req.status == 'new').length
                  : ''
                : ''}
            </Text>
          </View>
        </TouchableWithoutFeedback>
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
            requests={requests.filter(req => req.status == 'active')}
          />
        ) : currentTab == 'New' ? (
          <NewRequests
            requests={requests.filter(req => req.status == 'new')}
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

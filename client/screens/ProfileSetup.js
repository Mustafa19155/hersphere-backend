import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import {ScrollView} from 'react-native';
import AddPhoto from '../components/profileSetup/AddPhoto';
import UserType from '../components/profileSetup/UserType';
import BusinessDetails from '../components/profileSetup/BusinessDetails';
import SocialConnect from '../components/profileSetup/SocialConnect';
import {StackActions, useNavigation} from '@react-navigation/native';
import ContinueButton from '../components/profileSetup/ContinueButton';

export default function ProfileSetup() {
  const navigation = useNavigation();

  const maxSteps = 4;
  const [currentStep, setcurrentStep] = useState(1);
  const [isValidStep, setisValidStep] = useState(false);
  const [userType, setuserType] = useState('');

  const handleNextStep = () => {
    if (currentStep < maxSteps) {
      setcurrentStep(currentStep + 1);
    } else {
      navigation.dispatch(StackActions.replace('Main'));
    }
  };

  const handlePrevioustep = () => {
    if (currentStep > 1) setcurrentStep(currentStep - 1);
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          minHeight: Dimensions.get('screen').height - 30,
        }}>
        {currentStep > 1 && (
          <View style={styles.topWrapper}>
            <Icon
              onPress={handlePrevioustep}
              name="arrow-back"
              size={30}
              color="#000"
            />
          </View>
        )}
        <View>
          {currentStep == 1 ? (
            <AddPhoto
              setcurrentStep={setcurrentStep}
              isValidStep={isValidStep}
              setisValidStep={setisValidStep}
            />
          ) : currentStep == 2 ? (
            <UserType
              setcurrentStep={setcurrentStep}
              isValidStep={isValidStep}
              setisValidStep={setisValidStep}
              setuserType={setuserType}
            />
          ) : currentStep == 3 ? (
            <SocialConnect
              setcurrentStep={setcurrentStep}
              isValidStep={isValidStep}
              setisValidStep={setisValidStep}
            />
          ) : (
            <BusinessDetails
              setcurrentStep={setcurrentStep}
              isValidStep={isValidStep}
              setisValidStep={setisValidStep}
              userType={userType}
            />
          )}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginBottom: 10,
          }}></View>
        {currentStep != 4 && (
          <ContinueButton
            isValidStep={isValidStep}
            clickHandler={handleNextStep}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  topWrapper: {
    paddingVertical: 10,
  },
});

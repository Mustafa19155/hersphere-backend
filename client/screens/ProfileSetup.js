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
import global from '../assets/styles/global';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
    <KeyboardAwareScrollView>
      <ScrollView style={{height: Dimensions.get('window').height - 30}}>
        <View
          style={[
            styles.container,
            {
              justifyContent: 'space-between',
            },
            currentStep != 3
              ? {height: Dimensions.get('window').height - 50}
              : {minHeight: Dimensions.get('window').height - 50},
          ]}>
          <View>
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

            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                alignSelf: 'center',
                marginBottom: 50,
              }}>
              <View>
                <View style={styles.stepWrapper}>
                  <Text
                    style={[
                      currentStep >= 1
                        ? styles.completedStep
                        : styles.incompleteStep,
                      global.textSmall,
                    ]}>
                    1
                  </Text>
                  <Text style={{position: 'absolute', top: 24, left: -5}}>
                    Step 1
                  </Text>
                </View>
              </View>
              <View style={styles.stepLine} />
              <View style={styles.stepWrapper}>
                <Text
                  style={[
                    currentStep >= 2
                      ? styles.completedStep
                      : styles.incompleteStep,
                    global.textSmall,
                  ]}>
                  2
                </Text>
                <Text style={{position: 'absolute', top: 24, left: -5}}>
                  Step 2
                </Text>
              </View>
              <View style={styles.stepLine} />
              <View style={styles.stepWrapper}>
                <Text
                  style={[
                    currentStep >= 3
                      ? styles.completedStep
                      : styles.incompleteStep,
                    global.textSmall,
                  ]}>
                  3
                </Text>
                <Text style={{position: 'absolute', top: 24, left: -5}}>
                  Step 3
                </Text>
              </View>
              <View style={styles.stepLine} />
              <View style={styles.stepWrapper}>
                <Text
                  style={[
                    currentStep >= 4
                      ? styles.completedStep
                      : styles.incompleteStep,
                    global.textSmall,
                  ]}>
                  4
                </Text>
                <Text style={{position: 'absolute', top: 24, left: -5}}>
                  Step 4
                </Text>
              </View>
            </View>
            <View>
              <View>
                {currentStep == 1 ? (
                  <>
                    <AddPhoto
                      setcurrentStep={setcurrentStep}
                      isValidStep={isValidStep}
                      setisValidStep={setisValidStep}
                    />
                  </>
                ) : currentStep == 2 ? (
                  <UserType
                    setcurrentStep={setcurrentStep}
                    isValidStep={isValidStep}
                    setisValidStep={setisValidStep}
                    setuserType={setuserType}
                  />
                ) : currentStep == 3 ? (
                  <BusinessDetails
                    setcurrentStep={setcurrentStep}
                    isValidStep={isValidStep}
                    setisValidStep={setisValidStep}
                    userType={userType}
                    currentStep={currentStep}
                  />
                ) : (
                  <SocialConnect
                    setcurrentStep={setcurrentStep}
                    isValidStep={isValidStep}
                    setisValidStep={setisValidStep}
                  />
                )}
              </View>
            </View>
          </View>
          {currentStep != 3 && (
            <ContinueButton
              text={'Continue'}
              isValidStep={isValidStep}
              clickHandler={handleNextStep}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  stepLine: {
    height: 2,
    width: '20%',
    backgroundColor: '#13B887',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedStep: {
    padding: 2,
    borderRadius: 99,
    width: 25,
    height: 25,
    textAlign: 'center',
    backgroundColor: '#13B887',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incompleteStep: {
    padding: 2,
    borderRadius: 99,
    width: 25,
    height: 25,
    textAlign: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedStepText: {
    color: 'white',
  },
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  topWrapper: {
    paddingVertical: 10,
  },
});

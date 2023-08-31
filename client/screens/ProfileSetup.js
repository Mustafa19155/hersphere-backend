import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import AddPhoto from '../components/profileSetup/AddPhoto';
import UserType from '../components/profileSetup/UserType';
import BusinessDetails from '../components/profileSetup/BusinessDetails';
import SocialConnect from '../components/profileSetup/SocialConnect';
import {StackActions, useNavigation} from '@react-navigation/native';

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

  useEffect(() => {
    setisValidStep(false);
  }, [currentStep]);

  return (
    <View style={styles.container}>
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
          <AddPhoto isValidStep={isValidStep} setisValidStep={setisValidStep} />
        ) : currentStep == 2 ? (
          <UserType
            isValidStep={isValidStep}
            setisValidStep={setisValidStep}
            setuserType={setuserType}
          />
        ) : currentStep == 3 ? (
          <BusinessDetails
            isValidStep={isValidStep}
            setisValidStep={setisValidStep}
          />
        ) : (
          <SocialConnect
            isValidStep={isValidStep}
            setisValidStep={setisValidStep}
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: 10,
        }}>
        <Button
          disabled={!isValidStep}
          style={isValidStep ? styles.continueButton : styles.disabledBtn}
          onPress={handleNextStep}>
          <Text style={styles.btnText}>Continue</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  disabledBtn: {
    opacity: 0.7,
    backgroundColor: 'gray',
    width: '100%',
  },
  btnText: {
    color: 'white',
  },
  continueButton: {
    backgroundColor: '#2A52C1',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
  },
  topWrapper: {
    paddingVertical: 10,
  },
});

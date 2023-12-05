import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import global from '../../assets/styles/global';
import Step1 from '../../components/SendRequest/Step1';
import Step2 from '../../components/SendRequest/Step2';
import Step3 from '../../components/SendRequest/Step3';
import {Button, Modal, Portal} from 'react-native-paper';
import TickIcon from '../../assets/icons/tick-green.png';
import {useNavigation} from '@react-navigation/native';

const SendRequest = () => {
  const maxSteps = 3;
  const [currentStep, setcurrentStep] = useState(1);
  const [isValidStep, setisValidStep] = useState(false);
  const [confirmModalOpen, setconfirmModalOpen] = useState(false);

  const handleSubmit = () => {
    setconfirmModalOpen(true);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 10}}>
      <ConfirmModal open={confirmModalOpen} setopen={setconfirmModalOpen} />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View style={{minHeight: Dimensions.get('window').height - 160}}>
          <Text
            style={[global.textNormal, global.fontBold, {alignSelf: 'center'}]}>
            Send Request
          </Text>
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
                <TouchableOpacity onPress={() => setcurrentStep(1)}>
                  <Text
                    style={[
                      currentStep >= 1
                        ? styles.completedStep
                        : styles.incompleteStep,
                    ]}>
                    1
                  </Text>
                </TouchableOpacity>
                <Text style={{position: 'absolute', top: 24, left: -5}}>
                  Step 1
                </Text>
              </View>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepWrapper}>
              <TouchableOpacity
                onPress={() => (isValidStep ? setcurrentStep(2) : null)}>
                <Text
                  style={[
                    currentStep >= 2
                      ? styles.completedStep
                      : styles.incompleteStep,
                  ]}>
                  2
                </Text>
              </TouchableOpacity>
              <Text style={{position: 'absolute', top: 24, left: -5}}>
                Step 2
              </Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepWrapper}>
              <TouchableOpacity>
                <Text
                  style={[
                    currentStep >= 3
                      ? styles.completedStep
                      : styles.incompleteStep,
                  ]}>
                  3
                </Text>
              </TouchableOpacity>
              <Text style={{position: 'absolute', top: 24, left: -5}}>
                Step 3
              </Text>
            </View>
          </View>
          {currentStep == 1 ? (
            <Step1 isValidStep={isValidStep} setisValidStep={setisValidStep} />
          ) : currentStep == 2 ? (
            <Step2 isValidStep={isValidStep} setisValidStep={setisValidStep} />
          ) : (
            <Step3 isValidStep={isValidStep} setisValidStep={setisValidStep} />
          )}
        </View>
        <Button
          style={[global.greenBtn]}
          onPress={() =>
            currentStep < maxSteps && isValidStep
              ? setcurrentStep(currentStep + 1)
              : handleSubmit()
          }>
          <Text style={global.greenBtnText}>Continue</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default SendRequest;

const ConfirmModal = ({open, setopen}) => {
  const navigation = useNavigation();

  const containerStyle = {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  };

  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={() => {
          setopen(false);
          navigation.goBack();
        }}
        contentContainerStyle={containerStyle}>
        <View style={{gap: 25, alignItems: 'center'}}>
          <Text
            style={[
              global.blackColor,
              global.textNormal,
              {textAlign: 'center'},
            ]}>
            Request has been created Successfully
          </Text>
          <Image source={TickIcon} />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  stepLine: {
    height: 2,
    width: '35%',
    backgroundColor: '#13B887',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedStep: {
    fontSize: 16,
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
    fontSize: 16,
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
});

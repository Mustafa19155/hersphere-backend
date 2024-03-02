import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import global from '../../assets/styles/global';
import Step1 from '../../components/SendRequest/Step1';
import Step2 from '../../components/SendRequest/Step2';
import Step3 from '../../components/SendRequest/Step3';
import {Button, Modal, Portal} from 'react-native-paper';
import TickIcon from '../../assets/icons/tick-green.png';
import {useNavigation} from '@react-navigation/native';
import ConfirmModal from '../../components/modals/ConfirmModal';
import {RequestContext} from '../../contexts/requestContext';
import Step4 from '../../components/SendRequest/Step4';
import SuccessModal from '../../components/SuccessModal';

const SendRequest = () => {
  const maxSteps = 4;
  const [currentStep, setcurrentStep] = useState(1);
  const [isValidStep, setisValidStep] = useState(false);
  const [requestSentModalOpen, setrequestSentModalOpen] = useState(false);
  const [confirmModalOpen, setconfirmModalOpen] = useState(false);

  const {paymentMethod} = useContext(RequestContext);

  const handleSubmit = () => {
    // if (paymentMethod == 'wallet') {
    setconfirmModalOpen(true);
    // }
    // setrequestSentModalOpen(true);
  };

  const handlePay = () => {
    setconfirmModalOpen(false);
    setrequestSentModalOpen(true);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 10}}>
      <SuccessModal
        open={requestSentModalOpen}
        setopen={setrequestSentModalOpen}
        text={'Your request has been sent successfully!'}
      />
      <ConfirmModal
        open={confirmModalOpen}
        setopen={setconfirmModalOpen}
        onconfirm={handlePay}
        text={'Are you sure you want to continue'}
      />
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
                onPress={() =>
                  isValidStep || currentStep > 2 ? setcurrentStep(2) : null
                }>
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
              <TouchableOpacity
                onPress={() =>
                  (isValidStep && currentStep == 2) || currentStep > 3
                    ? setcurrentStep(3)
                    : null
                }>
                <Text
                  style={[
                    currentStep >= 3
                      ? styles.completedStep
                      : styles.incompleteStep,
                  ]}>
                  3
                </Text>
              </TouchableOpacity>
              <Text style={{position: 'absolute', top: 24, left: -10}}>
                Step 3
              </Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepWrapper}>
              <TouchableOpacity>
                <Text
                  style={[
                    currentStep >= 4
                      ? styles.completedStep
                      : styles.incompleteStep,
                  ]}>
                  4
                </Text>
              </TouchableOpacity>
              <Text style={{position: 'absolute', top: 24, left: -10}}>
                Step 4
              </Text>
            </View>
          </View>
          {currentStep == 1 ? (
            <Step1 isValidStep={isValidStep} setisValidStep={setisValidStep} />
          ) : currentStep == 2 ? (
            <Step2 isValidStep={isValidStep} setisValidStep={setisValidStep} />
          ) : currentStep == 3 ? (
            <Step3 isValidStep={isValidStep} setisValidStep={setisValidStep} />
          ) : (
            <Step4 />
          )}
        </View>
        <Button
          style={[global.greenBtn]}
          onPress={() =>
            currentStep < maxSteps
              ? isValidStep
                ? setcurrentStep(currentStep + 1)
                : null
              : handleSubmit()
          }>
          <Text style={global.greenBtnText}>Continue</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default SendRequest;

const confirmPaymentModal = ({open, setopen}) => {};

const styles = StyleSheet.create({
  stepLine: {
    height: 2,
    width: '18%',
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

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
import {getInfluencerProfileForRequest} from '../../api/user';
import {createPromotion} from '../../api/promotion';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {storage} from '../../firebase';

const SendRequest = ({route}) => {
  const maxSteps = 4;
  const [isValidStep, setisValidStep] = useState(false);
  const [requestSentModalOpen, setrequestSentModalOpen] = useState(false);
  const [confirmModalOpen, setconfirmModalOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [apiCalled, setapiCalled] = useState(false);

  const {
    influencerData,
    setinfluencerData,
    currentStep,
    setcurrentStep,
    data,
    platforms,
    likes,
    comments,
    days,
    category,
    description,
    paymentMethod,
    payment,
    allowInfluencerToAddData,
  } = useContext(RequestContext);

  const handleSubmit = async () => {
    setconfirmModalOpen(true);
  };

  const handlePay = async () => {
    setconfirmModalOpen(false);
    setapiCalled(true);
    const finalData = {
      platforms,
      description,
      category,
      requirements: {
        likes,
        comments,
        days,
      },
      allowInfluencerToAddData,
      amount: payment,
      paymentMethod,
      influencerID: influencerData._id,
      content: allowInfluencerToAddData
        ? null
        : {
            facebook:
              platforms.includes('facebook') || platforms.includes('instagram')
                ? data.facebook
                : undefined,
            youtube: platforms.includes('youtube') ? data.youtube : undefined,
          },
    };
    try {
      if (!allowInfluencerToAddData) {
        if (platforms.includes('facebook') || platforms.includes('instagram')) {
          const res = await fetch(data.facebook.content);
          const blob = await res.blob();

          const filename = data.facebook.content.substring(
            data.facebook.content.lastIndexOf('/') + 1,
          );

          const mainRef = ref(storage, `requests/${filename}`);

          await uploadBytes(mainRef, blob);
          console.log(await getDownloadURL(mainRef));
          finalData.content.facebook.content = await getDownloadURL(mainRef);
        }

        if (platforms.includes('youtube')) {
          const res = await fetch(data.youtube.content);
          const blob = await res.blob();

          const filename = data.youtube.content.substring(
            data.youtube.content.lastIndexOf('/') + 1,
          );

          const mainRef = ref(storage, `requests/${filename}`);

          await uploadBytes(mainRef, blob);
          finalData.content.youtube.content = await getDownloadURL(mainRef);
        }
      }
      const res = await createPromotion({
        data: finalData,
      });
      setrequestSentModalOpen(true);
      setapiCalled(false);
    } catch (err) {
      console.log(err);
      setapiCalled(false);
    }
  };

  const handleGetData = () => {
    setloading(true);
    getInfluencerProfileForRequest({id: route.params.id})
      .then(res => {
        setinfluencerData(res);
        setloading(false);
      })
      .catch(err => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: 10}}>
      {influencerData ? (
        <>
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
            <View style={{minHeight: Dimensions.get('window').height - 100}}>
              <Text
                style={[
                  global.textNormal,
                  global.fontBold,
                  {alignSelf: 'center'},
                ]}>
                {/* Send Request */}
              </Text>
              <View
                style={{
                  // marginTop: 10,
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
                <Step1 />
              ) : currentStep == 2 ? (
                <Step2 />
              ) : currentStep == 3 ? (
                <Step3 />
              ) : (
                <Step4 handleSubmit={handleSubmit} apiCalled={apiCalled} />
              )}
            </View>
            {/* <Button
              style={[global.greenBtn]}
              onPress={() =>
                currentStep < maxSteps
                  ? isValidStep
                    ? setcurrentStep(currentStep + 1)
                    : null
                  : handleSubmit()
              }>
              <Text style={global.greenBtnText}>Continue</Text>
            </Button> */}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

export default SendRequest;

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

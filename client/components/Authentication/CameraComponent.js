import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import global from '../../assets/styles/global';
import {verifyGender} from '../../api/user';
import {launchCamera} from 'react-native-image-picker';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

const CameraComp = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const ref = useRef();
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('front');
  const [image, setimage] = useState(null);
  const [file, setfile] = useState(null);
  const [picInProgress, setpicInProgress] = useState(false);
  const [apiCalled, setapiCalled] = useState(false);
  const [loadingPermission, setloadingPermission] = useState(true);

  const handleTakeImage = async () => {
    if (image) {
      return setimage(null);
    }
    setpicInProgress(true);
    const fileMain = await ref.current.takePhoto({
      enableShutterSound: false,
    });
    const result = await fetch(`file://${fileMain.path}`);
    setfile(`file:///${fileMain.path}`);
    const data = await result.blob();
    // setfile(data);
    const fileReaderInstance = new FileReader();
    fileReaderInstance.readAsDataURL(data);
    fileReaderInstance.onload = () => {
      setimage(fileReaderInstance.result);
      setpicInProgress(false);
    };
  };

  const handleVerifyPhoto = () => {
    setapiCalled(true);
    const formData = new FormData();
    formData.append('image', {
      uri: file,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    verifyGender({data: formData})
      .then(res => {
        navigation.dispatch(StackActions.replace('profileSetup'));
        setapiCalled(false);
      })
      .catch(err => {
        // toast.show('Verification failed. Please try again');
        navigation.dispatch(StackActions.replace('profileSetup'));
        setapiCalled(false);
      });
  };

  useEffect(() => {
    if (!hasPermission) {
      setloadingPermission(true);
      requestPermission()
        .then(res => {
          if (res == false) {
            navigation.navigate('login');
          } else {
            setloadingPermission(false);
          }
        })
        .catch(err => {
          navigation.navigate('login');
        });
    } else {
      setloadingPermission(false);
    }
  }, []);

  if (device == null) return <NoCameraDeviceError />;
  return (
    <>
      {!loadingPermission ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            padding: 20,
          }}>
          <Text
            style={[global.textSmall, global.fontBold, {textAlign: 'center'}]}>
            Take a photo for scanning
          </Text>
          {!image && (
            <Camera
              ref={ref}
              photo={true}
              style={[
                StyleSheet.absoluteFill,
                {
                  height: (73 / 100) * Dimensions.get('screen').height,
                  top: (9 / 100) * Dimensions.get('screen').height,
                  width: '96%',
                  left: '8%',
                },
              ]}
              // zoom={1.5}
              device={device}
              isActive={true}
            />
          )}
          {image && (
            // <View
            // style={
            // {
            // height: (73 / 100) * Dimensions.get('screen').height,
            // top: (9 / 100) * Dimensions.get('screen').height,
            // width: '96%',
            // left: '8%',
            // position: 'absolute',
            // overflow: 'hidden',
            //   }
            // }>
            <Image
              source={{uri: image}}
              style={{
                height: (73 / 100) * Dimensions.get('screen').height,
                top: (9 / 100) * Dimensions.get('screen').height,
                width: '96%',
                left: '8%',
                position: 'absolute',
                overflow: 'hidden',

                // objectFit: 'cover',
                // height: (73 / 100) * Dimensions.get('screen').height,
                // width: (73 / 100) * Dimensions.get('screen').height,
                // transform: 'rotate(90deg)',
              }}
            />
            // </View>
          )}
          {!image ? (
            <TouchableWithoutFeedback onPress={handleTakeImage}>
              <View
                style={[
                  global.greenBtn,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 15,
                  },
                ]}>
                <Text style={[global.textSmall, {color: 'white'}]}>
                  {picInProgress ? 'Loading...' : 'Take a photo'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-between',
              }}>
              <TouchableWithoutFeedback
                onPress={handleVerifyPhoto}
                disabled={apiCalled}>
                <View
                  style={[
                    global.greenBtn,
                    {
                      width: '47%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 15,
                    },
                  ]}>
                  <Text style={[global.textSmall, {color: 'white'}]}>
                    {apiCalled ? 'Loading...' : 'Verify Photo'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={handleTakeImage}
                disabled={apiCalled}>
                <View
                  style={[
                    global.redButton,
                    {
                      width: '47%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 15,
                    },
                  ]}>
                  <Text style={[global.textSmall, {color: 'white'}]}>
                    Retake Photo
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
      ) : (
        ''
      )}
    </>
  );
};

export default CameraComp;

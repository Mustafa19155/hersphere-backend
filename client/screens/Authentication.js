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
import Icon from 'react-native-vector-icons/AntDesign';
import global from '../assets/styles/global';
import CameraComp from '../components/Authentication/CameraComponent';

const Authentication = () => {
  const [showCamera, setshowCamera] = useState(false);
  return (
    <View style={{flex: 1}}>
      {showCamera ? (
        <CameraComp />
      ) : (
        <View style={{padding: 20, gap: 20}}>
          <Text style={[global.textLarge, global.fontBold]}>
            Authentication
          </Text>
          <Text style={[global.textSmall, global.fontBold]}>
            Our system is women oriented and in order to keep the privacy of our
            users, authentication is must.
          </Text>
          <Text style={[global.grayColor, {fontSize: 16}]}>
            Take a photo from the front camera.
          </Text>
          <TouchableOpacity
            onPress={() => setshowCamera(true)}
            style={[
              global.greenBtn,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 7,
                alignItems: 'center',
                paddingVertical: 15,
              },
            ]}>
            <Text style={[global.textSmall, {color: 'white'}]}>
              Open Front camera
            </Text>
            <Icon name="camera" size={30} color="rgba(35, 35, 35, 0.75)" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button, Checkbox, TextInput} from 'react-native-paper';
import {RequestContext} from '../../contexts/requestContext';
import global from '../../assets/styles/global';
import ContentUpload from './ContentUpload';

const Step4 = () => {
  const [isValidStep, setisValidStep] = useState(false);

  const {
    allowInfluencerToAddData,
    setallowInfluencerToAddData,
    data,
    setdata,
    setcurrentStep,
    platforms,
  } = useContext(RequestContext);

  useEffect(() => {
    if (allowInfluencerToAddData) {
      setisValidStep(true);
    } else {
      let isValid = false;
      if (platforms.includes('instagram') || platforms.includes('facebook')) {
        if (data?.facebook.content && data?.facebook.caption) {
          isValid = true;
        } else {
          isValid = false;
        }

        if (platforms.includes('youtube')) {
          if (data?.youtube.content && data?.youtube.caption) {
            isValid = true;
          } else {
            isValid = false;
          }
        }
      }
      setisValidStep(isValid);
    }
  }, [data, allowInfluencerToAddData, platforms]);

  const handleSubmit = () => {
    setcurrentStep(4);
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between', gap: 20}}>
      <View>
        <Text style={[global.fontBold, global.textNormal]}>
          Request Content
        </Text>
        <View style={{marginTop: 20, gap: 10}}>
          <View style={styles.checkboxWrapper}>
            <Checkbox
              onPress={() => {
                setdata({
                  facebook: {content: '', caption: ''},
                  youtube: {content: '', caption: '', type: 'image'},
                });
                setallowInfluencerToAddData(true);
              }}
              status={!allowInfluencerToAddData ? 'unchecked' : 'checked'}
              color="green"
            />
            <Text style={[{fontWeight: '600'}, global.textSmall]}>
              Allow influencer to add material
            </Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <Checkbox
              onPress={() => {
                setdata({
                  facebook: {content: '', caption: ''},
                  youtube: {content: '', caption: '', type: 'image'},
                });
                setallowInfluencerToAddData(false);
              }}
              status={allowInfluencerToAddData ? 'unchecked' : 'checked'}
              color="green"
            />
            <Text style={[{fontWeight: '600'}, global.textSmall]}>
              Provide photos and videos
            </Text>
          </View>
          {!allowInfluencerToAddData && (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                flexWrap: 'wrap',
                marginTop: 10,
              }}>
              <ContentUpload setisValidStep={setisValidStep} />
            </View>
          )}
        </View>
      </View>
      <Button
        disabled={!isValidStep}
        style={[global.greenBtn]}
        onPress={handleSubmit}>
        <Text style={global.greenBtnText}>Continue</Text>
      </Button>
    </View>
  );
};

export default Step4;

const styles = StyleSheet.create({
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Checkbox, TextInput} from 'react-native-paper';
import {RequestContext} from '../../contexts/requestContext';
import global from '../../assets/styles/global';
import ContentUpload from './ContentUpload';

const Step4 = () => {
  const {allowInfluencerToAddData, setallowInfluencerToAddData} =
    useContext(RequestContext);

  return (
    <View>
      <Text style={[global.fontBold, global.textNormal]}>Request Content</Text>
      <View style={{marginTop: 20, gap: 10}}>
        <View style={styles.checkboxWrapper}>
          <Checkbox
            onPress={() => setallowInfluencerToAddData(true)}
            status={!allowInfluencerToAddData ? 'unchecked' : 'checked'}
            color="green"
          />
          <Text style={[{fontWeight: '600'}, global.textSmall]}>
            Allow influencer to add material
          </Text>
        </View>
        <View style={styles.checkboxWrapper}>
          <Checkbox
            onPress={() => setallowInfluencerToAddData(false)}
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
            <ContentUpload />
          </View>
        )}
      </View>
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

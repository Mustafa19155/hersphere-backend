import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import global from '../../assets/styles/global';
import {TextInput} from 'react-native-paper';

const Step3 = ({isValidStep, setisValidStep}) => {
  return (
    <View>
      <Text style={[global.fontBold, global.textNormal]}>Total Payment</Text>
      <View style={styles.optWrapper}>
        <Text style={[global.textSmall]}>Total payment will be</Text>
        <TextInput
          disabled
          value="$25"
          style={{
            height: 45,
            width: 84,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
    </View>
  );
};

export default Step3;

const styles = StyleSheet.create({
  optWrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 2,
    borderRadius: 10,
  },
});

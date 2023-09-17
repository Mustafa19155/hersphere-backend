import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

const ContinueButton = ({isValidStep, clickHandler}) => {
  return (
    <Button
      disabled={!isValidStep}
      style={isValidStep ? styles.continueButton : styles.disabledBtn}
      onPress={clickHandler}>
      <Text style={styles.btnText}>Continue</Text>
    </Button>
  );
};

export default ContinueButton;

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
});

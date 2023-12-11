import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import global from '../../assets/styles/global';

const ContinueButton = ({
  isValidStep,
  clickHandler,
  text,
  disabled,
  apiCalled,
}) => {
  return (
    <Button
      disabled={!isValidStep || disabled}
      style={[
        isValidStep ? global.greenBtn : global.disabledBtn,
        {width: '100%'},
      ]}
      onPress={clickHandler}>
      <Text style={styles.btnText}>{apiCalled ? 'Loading...' : text}</Text>
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
    backgroundColor: '',
    width: '100%',
  },
});

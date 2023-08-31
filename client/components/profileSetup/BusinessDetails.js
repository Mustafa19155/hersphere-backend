import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';

export default function BusinessDetails({isValidStep, setisValidStep}) {
  useEffect(() => {
    setisValidStep(true);
  }, []);

  return (
    <View>
      <Text>BusinessDetails</Text>
    </View>
  );
}

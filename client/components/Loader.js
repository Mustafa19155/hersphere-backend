import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const Loader = ({size, style, color}) => {
  return <ActivityIndicator size={size} style={style} color={color} />;
};

export default Loader;

const styles = StyleSheet.create({});

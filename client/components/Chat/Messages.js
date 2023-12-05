import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import global from '../../assets/styles/global';

const Messages = ({messages}) => {
  return (
    <ScrollView>
      {messages.map(mess => (
        <View>
          <View>
            <Text style={[global.textSmall]}>{mess.message}</Text>
          </View>
          <Text>{}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Messages;

const styles = StyleSheet.create({});

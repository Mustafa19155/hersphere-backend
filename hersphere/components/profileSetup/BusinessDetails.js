import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DynamicTextBoxList from './TextBoxList';

export default function UserType({isValidStep, setisValidStep, userType}) {
  useEffect(() => {
    setisValidStep(true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Business Details</Text>
        <Text style={styles.subheading}>Enter your business details</Text>
      </View>
      <View>
        <TextInput
          label="Business Title"
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
        />
        <View style={styles.desWrapper}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.autoGenText}>Auto generate</Text>
          </TouchableOpacity>
          <TextInput
            multiline={true}
            numberOfLines={5}
            label="Business Description"
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>
        {userType.toLowerCase() == 'startup' ? (
          <View style={styles.desWrapper}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.autoGenText}>Check</Text>
            </TouchableOpacity>
            <TextInput
              disabled
              label="Category"
              mode="outlined"
              value={'Business category here'}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>
        ) : (
          <View>
            <Text style={styles.target}>Target Audience</Text>
            <DynamicTextBoxList />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  target: {
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2A52C1',
    padding: 10,
    width: '30%',
    alignSelf: 'flex-end',
  },
  autoGenText: {
    color: 'white',
    textTransform: 'capitalize',
    fontSize: 12,
    textAlign: 'center',
  },
  desWrapper: {
    gap: 6,
    marginTop: 20,
  },
  headingWrapper: {
    flexDirection: 'column',
    gap: 7,
    marginBottom: 20,
  },
  heading: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 18,
    color: 'gray',
  },
});

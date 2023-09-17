import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DynamicTextBoxList from './TextBoxList';
import {AuthContext} from '../../contexts/userContext';
import ContinueButton from './ContinueButton';
import {udpateUser} from '../../api/firebase/user';
import {StackActions, useNavigation} from '@react-navigation/native';

export default function BusinessDetails({
  isValidStep,
  setisValidStep,
  userType,
}) {
  const navigation = useNavigation();
  const {user, setuser} = useContext(AuthContext);

  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');
  const [targetAudience, settargetAudience] = useState([]);

  const handleDescriptionGen = () => {
    setdescription('This is custom description');
  };

  const handleCategoryGen = () => {
    setcategory('Custom Category');
  };

  const handleAddBusinessDetails = async () => {
    const obj = {
      title,
      description,
    };
    if (user.userType == 'startup') {
      obj['category'] = category;
    } else {
      obj['targetAudience'] = targetAudience;
    }
    navigation.dispatch(StackActions.replace('Main'));
    setuser({
      ...user,
      businessDetails: {
        obj,
      },
      profileCompleted: true,
    });
    await udpateUser(user.id, {businessDetails: obj, profileCompleted: true});
  };

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
          value={title}
          onChangeText={settitle}
          label="Business Title"
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
        />
        <View style={styles.desWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleDescriptionGen}>
            <Text style={styles.autoGenText}>Auto generate</Text>
          </TouchableOpacity>
          <TextInput
            value={description}
            onChangeText={setdescription}
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
            <TouchableOpacity style={styles.button} onPress={handleCategoryGen}>
              <Text style={styles.autoGenText}>Check</Text>
            </TouchableOpacity>
            <TextInput
              disabled
              label="Category"
              mode="outlined"
              value={category}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>
        ) : (
          <View>
            <Text style={styles.target}>Target Audience</Text>
            <DynamicTextBoxList
              tags={targetAudience}
              setTags={settargetAudience}
            />
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: 10,
        }}></View>

      <ContinueButton
        isValidStep={isValidStep}
        clickHandler={handleAddBusinessDetails}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height - 88,
  },
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

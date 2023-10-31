import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useContext, useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import DynamicTextBoxList from './TextBoxList';
import {AuthContext} from '../../contexts/userContext';
import ContinueButton from './ContinueButton';
import {updateProfile} from '../../api/user';
import {StackActions, useNavigation} from '@react-navigation/native';
import global from '../../assets/styles/global';

export default function BusinessDetails({
  isValidStep,
  setisValidStep,
  userType,
  currentStep,
  setcurrentStep,
}) {
  const navigation = useNavigation();
  const {user, setuser} = useContext(AuthContext);

  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [category, setcategory] = useState('');

  const categories = [
    {
      name: 'Category 1',
    },
    {
      name: 'Category 2',
    },
    {
      name: 'Category 3',
    },
    {
      name: 'Category 4',
    },
    {
      name: 'Category 5',
    },
    {
      name: 'Category 6',
    },
    {
      name: 'Category 7',
    },
  ];

  const [targetAudience, settargetAudience] = useState([]);

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

    // navigation.dispatch(StackActions.replace('Main'));
    setuser({
      ...user,
      businessDetails: {
        obj,
      },
      profileCompleted: false,
    });
    await updateProfile({
      data: {...user, businessDetails: obj, profileCompleted: false},
    });
    setcurrentStep(currentStep + 1);
  };

  useEffect(() => {
    setisValidStep(true);
  }, []);

  return (
    <ScrollView style={[styles.container]}>
      <View style={{minHeight: Dimensions.get('window').height - 250}}>
        <>
          {userType.toLowerCase() == 'startup' && (
            <View style={{gap: 4}}>
              <Text
                style={[global.textSmall, global.fontBold, global.blackColor]}>
                Business Title
              </Text>
              <TextInput
                value={title}
                onChangeText={settitle}
                // label="Business Title"
                underlineColor="transparent"
                mode="flat"
                keyboardType="email-address"
              />
            </View>
          )}
          <View style={styles.desWrapper}>
            <Text
              style={[global.textSmall, global.fontBold, global.blackColor]}>
              {userType.toLowerCase() == 'startup' ? 'Business' : 'Add'}{' '}
              Description
            </Text>

            <TextInput
              value={description}
              onChangeText={setdescription}
              multiline={true}
              numberOfLines={5}
              underlineColor="transparent"
              mode="flat"
            />
          </View>
          {userType.toLowerCase() == 'startup' ? (
            <View style={styles.desWrapper}>
              <View>
                <Text
                  style={[
                    global.textSmall,
                    global.fontBold,
                    global.blackColor,
                  ]}>
                  Business Category
                </Text>

                <Picker
                  selectedValue={category}
                  style={{
                    height: 50,
                    width: '100%',
                    backgroundColor: '#EEEEEE',
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    setcategory(itemValue)
                  }>
                  {categories.map(cat => (
                    <Picker.Item label={cat.name} value={cat.name} />
                  ))}
                </Picker>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.target}>Target Audience</Text>
              <Picker
                selectedValue={category}
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: '#EEEEEE',
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setcategory(itemValue);
                  if (!targetAudience.find(ta => ta == itemValue)) {
                    settargetAudience([...targetAudience, itemValue]);
                  }
                }}>
                {categories.map(cat => (
                  <Picker.Item label={cat.name} value={cat.name} />
                ))}
              </Picker>
              <DynamicTextBoxList
                tags={targetAudience}
                setTags={settargetAudience}
              />
            </View>
          )}
        </>
      </View>

      <View
        style={{
          flex: 0.5,
          justifyContent: 'flex-end',
          marginBottom: 10,
          marginTop: 20,
        }}>
        <ContinueButton
          text={'Continue'}
          isValidStep={isValidStep}
          clickHandler={handleAddBusinessDetails}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: Dimensions.get('screen').height - 88,
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

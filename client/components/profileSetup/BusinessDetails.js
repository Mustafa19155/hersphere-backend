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
import {useToast} from 'react-native-toast-notifications';
import TextBoxWithAdd from '../TextBoxWithAdd';

export default function BusinessDetails({
  isValidStep,
  setisValidStep,
  userType,
  currentStep,
  setcurrentStep,
}) {
  const {user, setuser} = useContext(AuthContext);
  const [apiCalled, setapiCalled] = useState(false);

  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');

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

  const [category, setcategory] = useState(categories[0]);
  const [targetAudience, settargetAudience] = useState([]);
  const [skills, setskills] = useState([]);

  const handleAddBusinessDetails = async () => {
    if (description) {
      const obj = {
        description,
      };
      if (userType == 'startup') {
        if (!category || !title) {
          return;
        }
        obj['category'] = category;
        obj['title'] = title;
      } else {
        if (targetAudience.length == 0) {
          return;
        }
        obj['targetAudience'] = targetAudience;
      }
      setapiCalled(true);
      updateProfile({
        data: {
          ...user,
          businessDetails: obj,
          skills: skills.map(skill => skill.toLowerCase()),
          profileCompleted: false,
          userType,
        },
      })
        .then(res => {
          setapiCalled(false);
          setuser({
            ...user,
            businessDetails: obj,
            skills: skills.map(skill => skill.toLowerCase()),
            profileCompleted: false,
            userType,
          });
          setcurrentStep(currentStep + 1);
        })
        .catch(err => {
          setapiCalled(false);
        });
    }
  };

  useEffect(() => {
    if (user?.businessDetails) {
      setcategory(user.businessDetails.category);
      settitle(user.businessDetails.title);
      settargetAudience(
        user.businessDetails.targetAudience
          ? user.businessDetails.targetAudience.map(tar => tar)
          : [],
      );
      setskills(user.skills ? user.skills.map(skill => skill) : []);
      setdescription(user.businessDetails.description);
      setisValidStep(true);
    }
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
                underlineColor="transparent"
                style={[global.gray2Back]}
                mode="outlined"
                outlineColor="transparent"
                activeOutlineColor="transparent"
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
              outlineColor="transparent"
              activeOutlineColor="transparent"
              style={[global.gray2Back]}
              numberOfLines={5}
              underlineColor="transparent"
              mode="outlined"
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
              <TextBoxWithAdd tags={skills} setTags={setskills} />
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
          disabled={apiCalled}
          apiCalled={apiCalled}
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

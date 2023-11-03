import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../contexts/userContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, TextInput} from 'react-native-paper';
import ContinueButton from '../../components/profileSetup/ContinueButton';
import {Picker} from '@react-native-picker/picker';
import DynamicTextBoxList from '../../components/profileSetup/TextBoxList';
import global from '../../assets/styles/global';
import {updateProfile} from '../../api/user';

const BusinessInfo = () => {
  const {user, setuser} = useContext(AuthContext);

  const [title, settitle] = useState(user?.businessDetails.title);
  const [description, setdescription] = useState(
    user?.businessDetails.description,
  );
  const [category, setcategory] = useState(user?.businessDetails.category);
  const [targetAudience, settargetAudience] = useState(
    user?.businessDetails.targetAudience,
  );

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

  const handleInfoUpdate = () => {
    setuser({...user, businessDetails: {title, description, targetAudience}});
    updateProfile({
      data: {businessDetails: {title, description, targetAudience}},
    })
      .then(res => {})
      .catch(err => {});
  };

  return (
    <View style={[global.container, {justifyContent: 'space-between'}]}>
      <View style={{gap: 20}}>
        {user?.userType.toLowerCase() == 'startup' && (
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
          <Text style={[global.textSmall, global.fontBold, global.blackColor]}>
            {user?.userType.toLowerCase() == 'startup' ? 'Business' : ''}{' '}
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
        {user?.userType.toLowerCase() == 'startup' ? (
          <View style={styles.desWrapper}>
            <View>
              <Text
                style={[global.textSmall, global.fontBold, global.blackColor]}>
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
            <Text
              style={[global.textSmall, global.fontBold, global.blackColor]}>
              Target Audience
            </Text>
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
      </View>
      <Button style={[global.greenBtn]} onPress={handleInfoUpdate}>
        <Text style={[global.greenBtnText]}>Update Information</Text>
      </Button>
    </View>
  );
};

export default BusinessInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '90%',
    flex: 1,
    alignSelf: 'center',
    gap: 20,
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

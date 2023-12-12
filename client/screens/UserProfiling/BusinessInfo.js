import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/userContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button, TextInput} from 'react-native-paper';
import ContinueButton from '../../components/profileSetup/ContinueButton';
import {Picker} from '@react-native-picker/picker';
import DynamicTextBoxList from '../../components/profileSetup/TextBoxList';
import global from '../../assets/styles/global';
import {updateProfile} from '../../api/user';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {useToast} from 'react-native-toast-notifications';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BusinessInfo = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [apiCalled, setapiCalled] = useState(false);
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
    let isValid = false;
    if (title && description) {
      if (user.userType == 'startup') {
        if (category) {
          isValid = true;
        }
      } else {
        if (targetAudience.length > 0) {
          isValid = true;
        }
      }
    }

    if (isValid) {
      setapiCalled(true);
      setuser({...user, businessDetails: {title, description, targetAudience}});
      updateProfile({
        data: {businessDetails: {title, description, targetAudience}},
      })
        .then(res => {
          toast.show('Information updated', {type: 'success'});
          setapiCalled(false);
        })
        .catch(err => {
          setapiCalled(false);
        });
    }
  };

  useEffect(() => {
    navigation.getParent().setOptions({headerShown: false});
    return () => {
      navigation.getParent().setOptions({headerShown: true});
    };
  }, []);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={[{justifyContent: 'space-between', marginTop: 20}]}>
        <View style={{gap: 30}}>
          {user?.userType?.toLowerCase() == 'startup' && (
            <View style={{gap: 10}}>
              <Text style={[global.textSmall, global.fontBold]}>
                Business Title
              </Text>
              <View>
                <TextInput
                  value={title}
                  onChangeText={settitle}
                  mode="outlined"
                  outlineColor="black"
                  activeOutlineColor="black"
                  style={styles.input}
                  outlineStyle={{borderRadius: 10}}
                />
                <FontAwesome5Icons
                  name="pen"
                  color="gray"
                  size={16}
                  style={{right: 10, position: 'absolute', top: '40%'}}
                />
              </View>
            </View>
          )}
          <View style={{gap: 10}}>
            <Text style={[global.textSmall, global.fontBold]}>
              {user?.userType?.toLowerCase() == 'startup' ? 'Business' : ''}{' '}
              Description
            </Text>
            <View>
              <TextInput
                value={description}
                onChangeText={setdescription}
                mode="outlined"
                outlineColor="black"
                activeOutlineColor="black"
                style={styles.input}
                outlineStyle={{borderRadius: 10}}
                multiline={true}
                numberOfLines={5}
              />
              <FontAwesome5Icons
                name="pen"
                color="gray"
                size={16}
                style={{right: 10, position: 'absolute', top: '15%'}}
              />
            </View>
          </View>
          {user?.userType?.toLowerCase() == 'startup' ? (
            <View style={{gap: 10}}>
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
          ) : (
            <View>
              <Text style={[global.textSmall, global.fontBold]}>
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
        <Button
          disabled={apiCalled}
          style={[global.greenBtn, {marginTop: 20}]}
          onPress={handleInfoUpdate}>
          <Text style={[global.greenBtnText]}>
            {apiCalled ? 'Loading...' : 'Update'}
          </Text>
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default BusinessInfo;

const styles = StyleSheet.create({
  input: {
    padding: 5,
  },
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

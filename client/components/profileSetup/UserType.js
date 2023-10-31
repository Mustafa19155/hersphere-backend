import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Button} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {udpateUser} from '../../api/firebase/user';
import {AuthContext} from '../../contexts/userContext';
import global from '../../assets/styles/global';

export default function UserType({
  isValidStep,
  setisValidStep,
  setuserType,
  setcurrentStep,
}) {
  const userTypes = [{name: 'startup'}, {name: 'influencer'}];
  const [activeType, setactiveType] = useState('');

  const {user, setuser} = useContext(AuthContext);

  const handleActiveType = async index => {
    setuserType(userTypes[index].name);
    setactiveType(userTypes[index].name);
    setuser({...user, userType: userTypes[index].name});
    // await udpateUser(user.id, {userType: userTypes[index].name});
  };

  useEffect(() => {
    activeType ? setisValidStep(true) : setisValidStep(false);
  }, [activeType]);

  useEffect(() => {
    if (user?.userType) {
      setuserType(user.userType);
      setactiveType(user?.userType);
      setisValidStep(true);
      // setcurrentStep(prev => prev + 1);
    } else {
      setisValidStep(false);
    }
  }, []);

  return (
    <View>
      <View style={styles.headingWrapper}>
        <Text style={[styles.heading, global.textSmall]}>
          How do you want to join our app as?
        </Text>
        <Text style={[styles.subheading, global.textSmall]}>
          We need this information to verify your identity.
        </Text>
      </View>
      <View style={styles.typesWrapper}>
        {userTypes.map((type, index) => (
          <View key={index} style={{width: '80%', alignSelf: 'center'}}>
            <Button
              style={
                activeType == type.name ? global.greenBtn : global.whiteBtn
              }
              onPress={() => handleActiveType(index)}>
              <Text
                style={
                  activeType == type.name
                    ? global.greenBtnText
                    : global.whiteBtnText
                }>
                {type.name}
              </Text>
            </Button>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeText: {
    textTransform: 'capitalize',
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
  },
  inactiveText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
  },
  typesWrapper: {
    gap: 30,
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 20,
    paddingVertical: 10,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  activeButton: {
    textAlign: 'center',
    backgroundColor: '#0C7320',
    borderRadius: 20,
    color: 'white',
    paddingVertical: 10,
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

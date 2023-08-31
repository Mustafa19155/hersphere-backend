import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SocialConnect({
  isValidStep,
  setisValidStep,
  setuserType,
}) {
  const [accountTypes, setaccountTypes] = useState([
    {
      name: 'youtube',
      icon: 'logo-youtube',
      color: '#FF0000',
      connected: false,
    },
    {
      name: 'facebook',
      icon: 'logo-facebook',
      color: '#4267B2',
      connected: false,
    },
    {
      name: 'instagram',
      icon: 'logo-instagram',
      color: '#bc2a8d',
      connected: false,
    },
  ]);

  const handleSoicalConnect = type => {
    setaccountTypes(prevItems => {
      return prevItems.map(item => {
        if (item.name == type.name) {
          return {...item, connected: true};
        }
        return item;
      });
    });
  };

  useEffect(() => {
    accountTypes.map(type => {
      if (type.connected) {
        setisValidStep(true);
      }
    });
  }, [accountTypes]);

  return (
    <View>
      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>Social Accounts Connect</Text>
        <Text style={styles.subheading}>
          Connect your social media accounts with our app.
        </Text>
      </View>
      <View style={styles.typesWrapper}>
        {accountTypes.map((type, index) => (
          <View key={index}>
            <TouchableWithoutFeedback
              style={styles.button}
              onPress={() =>
                type.connected ? null : handleSoicalConnect(type)
              }>
              <View style={{marginTop: 7}}>
                <Icon name={type.icon} size={30} color={type.color} />
              </View>
              {type.connected ? (
                <Text style={styles.activeText}>Connected</Text>
              ) : (
                <Text style={styles.inactiveText}>{type.name}</Text>
              )}
            </TouchableWithoutFeedback>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inactiveText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize: 24,
    color: '#000',
  },
  activeText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize: 24,
    color: 'gray',
  },
  typesWrapper: {
    gap: 30,
    marginTop: 20,
  },
  button: {
    paddingLeft: '30%',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 20,
    paddingVertical: 7,
    borderColor: 'rgba(0,0,0,0.2)',
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

import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import LineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../contexts/userContext';
import PasswordIcon from '../../assets/icons/password.png';
import DeleteIcon from '../../assets/icons/delete.png';
import global from '../../assets/styles/global';

const UserProfiling = () => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  return (
    <View style={{marginTop: 15}}>
      <View>
        <Text style={[global.fontBold, global.textNormal, styles.mainHeading]}>
          Information
        </Text>
        <View style={styles.sectionWrapper}>
          <Pressable
            style={styles.wrapper}
            onPress={() => navigation.navigate('PersonalInfo')}>
            <View style={styles.subWrapper}>
              <View style={styles.iconWrapper}>
                <LineIcons name="lock-open" size={28} />
              </View>
              <Text style={[global.fontMedium, global.textSmall]}>
                Personal Information
              </Text>
            </View>
            <AntIcons name="right" size={20} color="black" />
          </Pressable>
          <Pressable
            style={styles.wrapper}
            onPress={() => navigation.navigate('BusinessInfo')}>
            <View style={styles.subWrapper}>
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons name="handshake-outline" size={28} />
              </View>
              <Text style={[global.fontMedium, global.textSmall]}>
                Business Information
              </Text>
            </View>
            <AntIcons name="right" size={20} color="black" />
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={[global.fontBold, global.textNormal, styles.mainHeading]}>
          Security Details
        </Text>
        <View style={styles.sectionWrapper}>
          <Pressable
            style={styles.wrapper}
            onPress={() => navigation.navigate('Security')}>
            <View style={styles.subWrapper}>
              <View style={styles.iconWrapper}>
                <Image source={PasswordIcon} style={{height: 28, width: 28}} />
              </View>
              <Text style={[global.fontMedium, global.textSmall]}>
                Change Password
              </Text>
            </View>
            <AntIcons name="right" size={20} color="black" />
          </Pressable>
        </View>
      </View>
      <View>
        <Text style={[global.fontBold, global.textNormal, styles.mainHeading]}>
          Account Details
        </Text>
        <View style={styles.sectionWrapper}>
          <Pressable
            style={styles.wrapper}
            onPress={() => navigation.navigate('SocialAccounts')}>
            <View style={styles.subWrapper}>
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons name="web" size={28} />
              </View>
              <Text style={[global.fontMedium, global.textSmall]}>
                Social Accounts
              </Text>
            </View>
            <AntIcons name="right" size={20} color="black" />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: 'rgba(0,0,0,0.1)',
          marginTop: 20,
          paddingTop: 15,
        }}>
        <Pressable
          style={[
            global.redButton,
            {
              paddingVertical: 10,
              width: 180,
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          {/* <AntIcons name="delete" size={24} color="white" /> */}
          <Image source={DeleteIcon} />
          <Text style={[{color: 'white', fontSize: 16}]}>Delete Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserProfiling;

const styles = StyleSheet.create({
  sectionWrapper: {
    gap: 15,
    paddingVertical: 15,
  },
  mainHeading: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  iconWrapper: [
    global.gray2Back,
    {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      height: 45,
      width: 45,
    },
  ],
});

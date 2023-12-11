import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../contexts/userContext';
import SocialPageChooseModal from '../modals/SocialPageChooseModal';
import {
  facebookSignin,
  getUser,
  instagramSignin,
  updateProfile,
  youtubeSignin,
} from '../../api/user';
import global from '../../assets/styles/global';
import ContinueButton from './ContinueButton';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

export default function SocialConnect({setisValidStep}) {
  const toast = useToast();
  const navigation = useNavigation();
  const {user, setuser} = useContext(AuthContext);
  const [socialModalOpen, setsocialModalOpen] = useState(false);
  const [pages, setpages] = useState([]);
  const [activeType, setactiveType] = useState('');

  const handleChoosePage = async (page, type) => {
    const userData = await getUser();
    userData['token'] = user.token;
    try {
      if (type == 'facebook') {
        setuser({...userData, facebookPage: page});
        await updateProfile({data: {...userData, facebookPage: page}});
      } else if (type == 'instagram') {
        setuser({...userData, instagramPage: page});
        await updateProfile({data: {...userData, instagramPage: page}});
      } else {
        setuser({...userData, youtubeChannel: page});
        await updateProfile({data: {...userData, youtubeChannel: page}});
      }
      setsocialModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [accountTypes, setaccountTypes] = useState([
    {
      name: 'youtube',
      icon: 'logo-youtube',
      color: '#FF0000',
      connected: false,
      clickHandler: () => {
        youtubeSignin()
          .then(res => {
            handleChoosePage(res.data, 'youtube');
          })
          .catch(err => {
            toast.show(err.response.data.message, {type: 'danger'});
          });
      },
    },
    {
      name: 'facebook',
      icon: 'logo-facebook',
      color: '#4267B2',
      connected: false,
      clickHandler: () => {
        facebookSignin({userType: user.userType})
          .then(res => {
            setpages(res);
            if (res.length == 0) {
              toast.show('No facebook pages to connect', {type: 'danger'});
            } else if (res.length > 1) {
              setactiveType('facebook');
              setsocialModalOpen(true);
            } else {
              handleChoosePage(res[0], 'facebook');
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
    {
      name: 'instagram',
      icon: 'logo-instagram',
      color: '#bc2a8d',
      connected: false,
      clickHandler: () => {
        instagramSignin({userType: user.userType})
          .then(res => {
            setpages(res);
            if (res.length == 0) {
              toast.show('No Instagram page to connect', {type: 'danger'});
            } else if (res.length > 1) {
              setactiveType('instagram');
              setsocialModalOpen(true);
            } else {
              handleChoosePage(res[0], 'instagram');
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
    },
  ]);
  useEffect(() => {
    let valid = false;
    accountTypes.map(type => {
      if (type.connected) {
        valid = true;
      }
    });
    setisValidStep(valid);
  }, [accountTypes]);

  useEffect(() => {
    setaccountTypes(
      accountTypes.map(type => {
        if (type.name == 'youtube') {
          return {
            ...type,
            connected: user?.youtubeChannel ? true : false,
          };
        } else if (type.name == 'facebook') {
          return {
            ...type,
            connected: user?.facebookPage ? true : false,
          };
        } else {
          return {
            ...type,
            connected: user?.instagramPage ? true : false,
          };
        }
      }),
    );
  }, [user]);

  return (
    <View>
      {socialModalOpen && (
        <SocialPageChooseModal
          open={socialModalOpen}
          onconfirm={handleChoosePage}
          data={pages}
          setopen={setsocialModalOpen}
          type={activeType}
        />
      )}
      <View style={{minHeight: Dimensions.get('window').height - 250}}>
        <View style={styles.headingWrapper}>
          <Text style={[styles.heading, global.textSmall]}>
            Connect Social Accounts
          </Text>
        </View>
        <View style={styles.typesWrapper}>
          {accountTypes.map((type, index) => (
            <View key={index}>
              <TouchableWithoutFeedback
                style={[global.whiteBtn, styles.button]}
                onPress={() =>
                  type.connected ? null : type.clickHandler(index)
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
      {/* <View
        style={{
          flex: 0.5,
          justifyContent: 'flex-end',
          marginBottom: 10,
          marginTop: 20,
        }}> */}
      <ContinueButton
        text={'Continue'}
        isValidStep={true}
        clickHandler={async () => {
          try {
            setuser({...user, profileCompleted: true});
            await updateProfile({data: {...user, profileCompleted: true}});
            navigation.dispatch(StackActions.replace('Main'));
          } catch (err) {
            console.log(err);
          }
        }}
      />
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  inactiveText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize: 20,
    color: '#000',
  },
  activeText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontSize: 20,
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
    textAlign: 'center',
    borderWidth: 0,
    backgroundColor: '#EEEEEE',
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

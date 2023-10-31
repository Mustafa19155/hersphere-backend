import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Button} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {axiosClient} from '../../api/axios';
import {getFacebookPages, getInstagramPages} from '../../api/socialConnect';
import {AuthContext} from '../../contexts/userContext';
import SocialPageChooseModal from '../modals/SocialPageChooseModal';
import {udpateUser} from '../../api/firebase/user';
import {collection, doc, getDoc} from 'firebase/firestore';
import {db} from '../../firebase';
import global from '../../assets/styles/global';

export default function SocialConnect({
  isValidStep,
  setisValidStep,
  setuserType,
}) {
  const {user, setuser} = useContext(AuthContext);
  const [socialModalOpen, setsocialModalOpen] = useState(false);
  const [pages, setpages] = useState([]);
  const [activeType, setactiveType] = useState('');

  const handleGoogleSignin = async index => {
    try {
      await GoogleSignin.hasPlayServices();

      await GoogleSignin.addScopes({
        scopes: [
          'profile',
          'email',
          'https://www.googleapis.com/auth/youtube',
          'https://www.googleapis.com/auth/youtube.upload',
        ],
      });
      const tokens = await GoogleSignin.getTokens();

      axiosClient
        .get(`/user/youtube-details?access_token=${tokens.accessToken}`)
        .then(res => {
          handleChoosePage(res.data, 'youtube');
          // setaccountTypes(
          //   accountTypes.map((type, ind) => {
          //     if (ind == index) {
          //       return {
          //         ...type,
          //         connected: true,
          //       };
          //     }
          //     return type;
          //   }),
          // );
        })
        .catch(err => {
          // console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInstagramLogin = index => {
    LoginManager.logInWithPermissions([
      'instagram_basic',
      'instagram_content_publish',
      'instagram_manage_comments',
      'instagram_manage_insights',
      'pages_show_list',
      'pages_read_engagement',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            getInstagramPages({
              token: data.accessToken,
              userType: user.userType,
            })
              .then(res => {
                setpages(res);
                if (res.length > 1) {
                  setactiveType('instagram');
                  setsocialModalOpen(true);
                } else {
                  handleChoosePage(res[0], 'instagram');
                }
                // setaccountTypes(
                //   accountTypes.map((type, ind) => {
                //     if (ind == index) {
                //       return {
                //         ...type,
                //         connected: true,
                //       };
                //     }
                //     return type;
                //   }),
                // );
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const handleFacebookLogin = index => {
    LoginManager.logInWithPermissions([
      'user_friends',
      'manage_pages',
      'publish_to_groups',
      'pages_manage_posts',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            getFacebookPages({token: data.accessToken, userType: user.userType})
              .then(res => {
                setpages(res);
                if (res.length > 1) {
                  setactiveType('facebook');
                  setsocialModalOpen(true);
                } else {
                  handleChoosePage(res[0], 'facebook');
                }
                // setaccountTypes(
                //   accountTypes.map((type, ind) => {
                //     if (ind == index) {
                //       return {
                //         ...type,
                //         connected: true,
                //       };
                //     }
                //     return type;
                //   }),
                // );
              })
              .catch(err => {
                // console.log(err);
              });
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const handleChoosePage = async (page, type) => {
    const dbUser = (await getDoc(doc(db, 'Users', user.id))).data();

    if (type == 'facebook') {
      setuser({...dbUser, facebookPage: page});
      await udpateUser(user.id, {facebookPage: page});
    } else if (type == 'instagram') {
      setuser({...dbUser, instagramPage: page});
      await udpateUser(user.id, {instagramPage: page});
    } else {
      setuser({...dbUser, youtubeChannel: page});
      await udpateUser(user.id, {youtubeChannel: page});
    }
    setsocialModalOpen(false);
  };

  const [accountTypes, setaccountTypes] = useState([
    {
      name: 'youtube',
      icon: 'logo-youtube',
      color: '#FF0000',
      connected: false,
      clickHandler: handleGoogleSignin,
    },
    {
      name: 'facebook',
      icon: 'logo-facebook',
      color: '#4267B2',
      connected: false,
      clickHandler: handleFacebookLogin,
    },
    {
      name: 'instagram',
      icon: 'logo-instagram',
      color: '#bc2a8d',
      connected: false,
      clickHandler: handleInstagramLogin,
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

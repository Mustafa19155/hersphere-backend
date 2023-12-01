import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {Card, TextInput, Button, Text} from 'react-native-paper';
import {IconButton} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {login} from '../api/user';
import {AuthContext} from '../contexts/userContext';
import global from '../assets/styles/global';
import {loginWithGoogle} from '../api/user';

const LoginScreen = () => {
  const [apiCalled, setapiCalled] = useState(false);
  const [email, setemail] = useState('mustafa@gmail.com');
  const [password, setpassword] = useState('123');

  const navigation = useNavigation();

  const {user, setuser} = useContext(AuthContext);

  const handleRegisterNavigate = () => {
    navigation.navigate('signup');
  };

  const handleLogin = () => {
    if (email && password) {
      login({email, password})
        .then(res => {
          console.log(res);
          setuser(res);
          if (res.profileCompleted) {
            navigation.navigate('Main');
          } else {
            navigation.navigate('profileSetup');
          }
        })
        .catch(err => {});
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(res => {
        setuser(res);
        if (res.profileCompleted) {
          navigation.navigate('Main');
        } else {
          navigation.navigate('profileSetup');
        }
      })
      .catch(err => {});
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          global.fontBold,
          global.textExtraLarge,
          {textAlign: 'center', marginBottom: 60},
        ]}>
        Welcome to {'\n'}HerSphere
      </Text>
      <View style={styles.inputsWrapper}>
        <Text style={[global.fontBold, global.textLarge]}>Sign In</Text>
        <TextInput
          label="Email"
          mode="flat"
          underlineColor="transparent"
          style={[global.input]}
          keyboardType="email-address"
          value={email}
          onChangeText={setemail}
        />
        <TextInput
          label="Password"
          mode="flat"
          underlineColor="transparent"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          value={password}
          onChangeText={setpassword}
        />
        <Button
          // mode="elevated"
          style={[global.greenBtn]}
          disabled={apiCalled}
          onPress={handleLogin}>
          <Text style={[global.greenBtnText]}>Login</Text>
        </Button>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
          }}>
          <View
            style={{
              borderWidth: 1,
              height: 2,
              width: 100,
              borderColor: 'gray',
              opacity: 0.5,
            }}></View>
          <Text style={{fontSize: 20, opacity: 0.5}}>or</Text>
          <View
            style={{
              opacity: 0.5,
              borderWidth: 1,
              height: 2,
              width: 100,
              borderColor: 'gray',
            }}></View>
        </View>
        <TouchableOpacity
          style={[
            global.whiteBtn,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              gap: 10,
              width: '100%',
            },
          ]}
          onPress={handleGoogleLogin}>
          <Image
            source={require('../assets/icons/google.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={[global.whiteBtnText]} disabled={!apiCalled}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View style={styles.registerLink}>
          <Text style={{fontSize: 20}}>Dont have an account? </Text>
          <TouchableOpacity onPress={handleRegisterNavigate}>
            <Text style={[global.greenColor, global.textNormal]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
    alignSelf: 'center',
  },
  inputsWrapper: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'column',
    gap: 20,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 0.9,
    resizeMode: 'contain',
  },
  overlay: {
    paddingLeft: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  logo: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    opacity: 0.8,
  },
  button: {
    marginVertical: '3%',
    backgroundColor: 'lightgreen',
    borderRadius: 8,
    paddingVertical: 8,
  },
  loginWithGoogleText: {
    textAlign: 'center',
    color: 'gray',
  },
});

export default LoginScreen;

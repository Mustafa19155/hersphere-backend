import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Card, TextInput, Button, Text} from 'react-native-paper';
import {login} from '../api/user';
import {AuthContext} from '../contexts/userContext';
import global from '../assets/styles/global';
import {loginWithGoogle} from '../api/user';
import {useToast} from 'react-native-toast-notifications';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

const LoginScreen = () => {
  const toast = useToast();

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
      setapiCalled(true);
      login({email, password})
        .then(res => {
          setapiCalled(false);
          setuser(res);
          if (res.profileCompleted) {
            navigation.replace('Main');
          } else {
            navigation.replace('Authentication');
          }
        })
        .catch(err => {
          toast.show('Invalid username or email', {type: 'danger'});
          setapiCalled(false);
        });
    }
  };

  useEffect(() => {
    const a = async () => {
      try {
        const a = await axios.post('http://192.168.18.55:8000/api/user/login', {
          email: 'mustafa4@gmail.com',
          password: '123',
        });
        console.log(a.headers);
        // const b = await axios.post(
        //   'http://192.168.18.55:8000/api/todo/add-task',
        //   {
        //     text: 'asd',
        //     completed: false,
        //   },
        // );

        // console.log(b.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    // a();
  }, []);

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(res => {
        setuser(res);
        if (res.profileCompleted) {
          navigation.navigate('Main');
        } else {
          navigation.navigate('Authentication');
        }
      })
      .catch(err => {});
  };

  return (
    <KeyboardAwareScrollView>
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
            placeholder="Email"
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            style={[global.gray2Back]}
            keyboardType="email-address"
            value={email}
            onChangeText={setemail}
          />
          <TextInput
            placeholder="Password"
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            secureTextEntry
            // right={<TextInput.Icon icon="eye" color="gray" />}
            style={[global.input, global.gray2Back]}
            value={password}
            onChangeText={setpassword}
          />
          <Button
            style={[global.greenBtn]}
            disabled={apiCalled}
            onPress={handleLogin}>
            <Text style={[global.greenBtnText]}>
              {apiCalled ? 'Loading...' : 'Login'}
            </Text>
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
              <Text style={[global.greenColor, global.textNormal]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    height: Dimensions.get('screen').height,
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

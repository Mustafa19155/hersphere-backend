import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
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
import {IconButton} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAccount} from '../api/firebase/user';
import {auth, db} from '../firebase';
import {setDoc} from 'firebase/firestore';
import {AuthContext} from '../contexts/userContext';
import global from '../assets/styles/global';
import {loginWithGoogle, register} from '../api/user';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';

const SignupScreen = () => {
  const toast = useToast();

  const navigation = useNavigation();

  const {setuser} = useContext(AuthContext);

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [username, setusername] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [apiCalled, setapiCalled] = useState(false);

  const handleLoginNavigate = () => {
    navigation.navigate('login');
  };

  const handleRegister = () => {
    if (
      email &&
      username &&
      password &&
      confirmPassword &&
      password == confirmPassword
    ) {
      setapiCalled(true);
      register({data: {email, password, username}})
        .then(res => {
          setapiCalled(false);
          setuser(res);
          navigation.navigate('Authentication');
        })
        .catch(err => {
          setapiCalled(false);
          toast.show('Email already in use', {type: 'danger'});
        });
    }
  };

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
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    const a = async () => {
      try {
        const b = await axios.post(
          'http://192.168.18.55:8000/api/todo/add-task',
          {
            text: 'asd',
            completed: false,
          },
        );

        console.log(b.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    a();
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text
          style={[
            global.textExtraLarge,
            global.fontBold,
            {textAlign: 'center', marginBottom: 20},
          ]}>
          Create an Account
        </Text>
        <View style={styles.inputsWrapper}>
          <TextInput
            placeholder="Full Name"
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            activeUnderlineColor="transparent"
            underlineColor="transparent"
            style={[global.input, global.gray2Back]}
            value={username}
            onChangeText={setusername}
          />
          <TextInput
            placeholder="Email"
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            style={[global.input, global.gray2Back]}
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
            style={[global.input, global.gray2Back]}
            // right={<TextInput.Icon icon="eye" />}
            value={password}
            onChangeText={setpassword}
          />
          <TextInput
            placeholder="Confirm Password"
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            secureTextEntry
            style={[global.input, global.gray2Back]}
            // right={<TextInput.Icon icon="eye" />}
            value={confirmPassword}
            onChangeText={setconfirmPassword}
          />
          <Button
            style={global.greenBtn}
            onPress={handleRegister}
            disabled={apiCalled}>
            <Text style={[global.greenBtnText]}>
              {!apiCalled ? 'Signup' : 'Loading...'}
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
              }}></View>
            <Text style={{fontSize: 20}}>or</Text>
            <View
              style={{
                borderWidth: 1,
                height: 2,
                width: 100,
                borderColor: 'gray',
              }}></View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              width: '100%',
              borderColor: 'gray',
              alignSelf: 'center',
              borderRadius: 8,
              gap: 10,
              paddingVertical: 10,
            }}
            onPress={handleGoogleLogin}>
            <Image
              source={require('../assets/icons/google.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={{fontSize: 18}}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.registerLink}>
            <Text style={{fontSize: 20}}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLoginNavigate}>
              <Text style={[global.textNormal, global.greenColor]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  registerLinkText: {
    fontSize: 20,
    color: 'green',
  },
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
    alignSelf: 'center',
  },
  inputsWrapper: {
    width: '90%',
    alignSelf: 'center',
    gap: 20,
  },
  container: {
    height: Dimensions.get('screen').height,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 0.9,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginVertical: '5%',
    backgroundColor: 'lightgreen',
    borderRadius: 8,
    paddingVertical: 8,
  },
  loginWithGoogleText: {
    textAlign: 'center',
    color: 'gray',
  },
});

export default SignupScreen;

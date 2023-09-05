import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import {login, loginWithGoogle} from '../api/firebase/user';

const LoginScreen = () => {
  const [apiCalled, setapiCalled] = useState(false);
  const [email, setemail] = useState('asd@a.com');
  const [password, setpassword] = useState('123456');

  const navigation = useNavigation();

  const handleRegisterNavigate = () => {
    navigation.navigate('signup');
  };

  const handleLogin = () => {
    if (email && password)
      login({email, password})
        .then(res => {
          if (res.profileCompleted) {
            navigation.navigate('dashboard');
          } else {
            navigation.navigate('profileSetup');
          }
        })
        .catch(err => {});
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(res => {
        if (res.profileCompleted) {
          navigation.navigate('dashboard');
        } else {
          navigation.navigate('profileSetup');
        }
      })
      .catch(err => {});
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/login-page.png')}
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.logo}>Signin to your Account</Text>
          <Text style={styles.headerText}>Login to your Account</Text>
        </View>
      </ImageBackground>

      <View style={styles.inputsWrapper}>
        <TextInput
          label="Email"
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setemail}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry
          style={styles.input}
          right={<TextInput.Icon icon="eye" />}
          value={password}
          onChangeText={setpassword}
        />
        <Button
          mode="elevated"
          style={styles.button}
          disabled={apiCalled}
          onPress={handleLogin}>
          <Text style={{color: 'black', fontSize: 20}}>Login</Text>
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
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              width: '80%',
              borderColor: 'gray',
              alignSelf: 'center',
              borderRadius: 8,
              marginTop: 20,
              gap: 10,
              paddingVertical: 10,
            }}
            onPress={handleGoogleLogin}>
            <Image
              source={require('../assets/icons/google.png')}
              style={{width: 30, height: 30}}
            />
            <Text style={{fontSize: 18}} disabled={!apiCalled}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.registerLink}>
        <Text style={{fontSize: 20}}>Dont have an account? </Text>
        <TouchableOpacity onPress={handleRegisterNavigate}>
          <Text style={styles.registerLinkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginTop: '5%',
    fontSize: 20,
    alignSelf: 'center',
  },
  inputsWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
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
  input: {
    marginTop: '3%',
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

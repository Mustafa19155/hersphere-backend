import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {axiosClient} from './axios';

export const register = async ({data}) => {
  try {
    const res = await axiosClient.post('/user/register', data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const login = async ({email, password}) => {
  try {
    const res = await axiosClient.post('/user/login', {email, password});
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const loginWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    await GoogleSignin.addScopes({
      scopes: ['profile', 'email'],
    });

    const userInfo = await GoogleSignin.signIn();

    const res = await axiosClient.post('/user/google-login', {
      source: 'google',
      username: userInfo.user.name,
      email: userInfo.user.email,
      profileCompleted: false,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateProfile = async ({data}) => {
  try {
    const res = await axiosClient.put('/user/update', data);

    return res.data;
  } catch (err) {
    throw err;
  }
};

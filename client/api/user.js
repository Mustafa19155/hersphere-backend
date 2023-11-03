import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {axiosClient} from './axios';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {getFacebookPages, getInstagramPages} from './socialConnect';

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

export const getUser = async () => {
  try {
    const res = await axiosClient.get('/user/');
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
    console.log(res.data);
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

export const youtubeSignin = async () => {
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
    const res = await axiosClient.get(
      `/user/youtube-details?access_token=${tokens.accessToken}`,
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const facebookSignin = async ({userType}) => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'user_friends',
      'manage_pages',
      'publish_to_groups',
      'pages_manage_posts',
    ]);
    if (result.isCancelled) {
      throw Error('Login cancelled');
    } else {
      const data = await AccessToken.getCurrentAccessToken();

      const res = await getFacebookPages({
        token: data.accessToken,
        userType,
      });

      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const instagramSignin = async ({userType}) => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'instagram_basic',
      'instagram_content_publish',
      'instagram_manage_comments',
      'instagram_manage_insights',
      'pages_show_list',
      'pages_read_engagement',
    ]);

    if (result.isCancelled) {
      throw Error('Login cancelled');
    } else {
      const data = await AccessToken.getCurrentAccessToken();

      const res = await getInstagramPages({
        token: data.accessToken,
        userType,
      });

      return res;
    }
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async ({currentPassword, newPassword}) => {
  try {
    const res = await axiosClient.put('/user/password', {
      currentPassword,
      newPassword,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

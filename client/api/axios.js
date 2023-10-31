import axios from 'axios';
import {baseURL} from '../variables';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = baseURL + '/api';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  common: {},
};

axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.request.use(
  async config => {
    try {
      const user = await AsyncStorage.getItem('user');
      const token = JSON.parse(user).token;
      axiosClient.defaults.headers.common['Cookie'] = `jwt=${token.value}`;
    } catch (err) {}
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    //Dispatch any action on success
    return response;
  },

  function (error) {
    if (error.response.status === 401) {
      if (error.response.config.url != '/user/login') {
        window.location.href = '/user';
      }
    }
    return Promise.reject(error);
  },
);

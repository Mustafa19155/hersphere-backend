import {axiosClient} from './axios';

export const getFacebookPages = async ({token, userType}) => {
  console.log(axiosClient.defaults);
  try {
    const res = await axiosClient.get(
      `/user/facebook-pages?token=${token}&&userType=${userType}`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getInstagramPages = async ({token, userType}) => {
  try {
    const res = await axiosClient.get(
      `/user/instagram-pages?token=${token}&&userType=${userType}`,
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

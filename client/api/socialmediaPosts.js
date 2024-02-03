import {axiosClient} from './axios';

export const postOnFacebook = async ({pageId, accessToken, url, message}) => {
  try {
    const res = await axiosClient.post('/socialmediaposts/facebook', {
      pageId,
      accessToken,
      url,
      message,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
export const postOnInstagram = async ({
  facebookAccessToken,
  instagramAccountId,
  imageUrl,
  caption,
}) => {
  try {
    const res = await axiosClient.post('/socialmediaposts/instagram', {
      facebookAccessToken,
      instagramAccountId,
      imageUrl,
      caption,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

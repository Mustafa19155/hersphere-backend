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

export const getPostDetails = async postID => {
  try {
    const res = await axiosClient.post(`/socialmediaposts/details/${postID}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const postOnYoutube = async ({
  file,
  title,
  description,
  accessToken,
}) => {
  try {
    const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    formData.append('title', title);
    formData.append('description', description);
    formData.append('accessToken', accessToken);

    const res = await axiosClient.post('/socialmediaposts/youtube', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

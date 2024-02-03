import {axiosClient} from './axios';

export const createJobRequest = async data => {
  try {
    const res = await axiosClient.post('/job-request', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

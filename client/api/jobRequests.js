import {axiosClient} from './axios';

export const createJobRequest = async data => {
  try {
    const res = await axiosClient.post('/job-request', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getJobRequestsForUser = async ({status}) => {
  try {
    const res = await axiosClient.get(`/job-request/${status}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const rejectRequest = async ({id}) => {
  try {
    const res = await axiosClient.put(`/job-request/${id}/update-status`, {
      status: 'rejected',
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const acceptRequest = async ({id}) => {
  try {
    const res = await axiosClient.put(`/job-request/${id}/accept`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

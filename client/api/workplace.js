import {axiosClient} from './axios';

export const createWorkplace = async data => {
  try {
    const res = await axiosClient.post('/workplace', data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllWorkplaces = async () => {
  try {
    const res = await axiosClient.get('/workplace');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getWorkplaceById = async id => {
  try {
    const res = await axiosClient.get(`/workplace/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateWorkplaceById = async ({id, data}) => {
  try {
    const res = await axiosClient.put(`/workplace/${id}`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteWorkplaceById = async id => {
  try {
    const res = await axiosClient.delete(`/workplace/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

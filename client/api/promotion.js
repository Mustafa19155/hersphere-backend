import {axiosClient} from './axios';

export const createPromotion = async ({data}) => {
  try {
    const res = await axiosClient.post('/promotion', data);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const acceptPromotion = async ({id}) => {
  try {
    const res = await axiosClient.put(`/promotion/${id}/accept`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const rejectPromotion = async ({id}) => {
  try {
    const res = await axiosClient.put(`/promotion/${id}/reject`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const startPromotion = async ({id}) => {
  try {
    const res = await axiosClient.put(`/promotion/${id}/start`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deletePromotion = async ({id}) => {
  try {
    const res = await axiosClient.delete(`/promotion/${id}`);

    return res.data;
  } catch (err) {
    throw err;
  }
};
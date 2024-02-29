import {axiosClient} from './axios';

// get chatroom by id
export const getChatroomById = async id => {
  try {
    const res = await axiosClient.get(`/chatroom/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// get chatrooms of user
export const getChatroomsOfUser = async userId => {
  try {
    const res = await axiosClient.get(`/chatroom/user/${userId}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

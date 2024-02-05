import {axiosClient} from './axios';

// Create a new job
export const createJob = async data => {
  try {
    const res = await axiosClient.post('/job', data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get all jobs
export const getAllJobs = async () => {
  try {
    const res = await axiosClient.get(`/job`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get jobs of workplace
export const getAllJobsOfWorkplace = async id => {
  try {
    const res = await axiosClient.get(`/job/workplace/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get a specific job by ID
export const getJobById = async id => {
  try {
    const res = await axiosClient.get(`/job/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Update a job by ID
export const updateJobById = async ({id, data}) => {
  try {
    const res = await axiosClient.put(`/job/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Delete a job by ID
export const deleteJobById = async id => {
  try {
    const res = await axiosClient.delete(`/job/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
// src/hooks/useJobApi.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobsApi } from '../api/jobsApi';

export const useJobApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const getJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser?.token) {
        throw new Error('Authentication required');
      }
      
      const jobs = await jobsApi.getJobs(currentUser.token);
      return jobs;
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitJob = async (jobData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser?.token) {
        throw new Error('Authentication required');
      }
      
      const result = await jobsApi.submitJob(jobData, currentUser.token);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to submit job');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getJobs,
    submitJob
  };
};
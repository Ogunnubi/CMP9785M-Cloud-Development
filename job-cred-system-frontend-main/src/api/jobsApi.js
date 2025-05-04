import { createAxiosInstance } from './api';
 

export const getJobs = async (token) => {
    const api = createAxiosInstance(token);
    try {
        const response = await api.get('/jobs');
        console.log('Jobs fetched successfully:', response.data); // Log the fetched jobs
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

export const submitJob = async (jobData, token) => { 
    const api = createAxiosInstance(token);
    try {
        const response = await api.post('/jobs', jobData);
        return response.data;
        } catch (error) {
        console.error('Error submitting job:', error);
        throw error;
    }
};

export const applyForJob = async (jobId, token) => {
    const api = createAxiosInstance(token);  
    try {
        const response = await api.post(`/jobs/${jobId}/apply`);
        return response.data;
    } catch (error) {
        console.error('Error applying for job:', error);
        throw error;
    }
};

export const updateUserCredits = async (userId, newCredits, token) => {
    const api = createAxiosInstance(token)
    try {
        const response = await api.patch(`/users/${userId}`, { credits: newCredits });
        return response.data;
    } catch (error) {
        console.error('Error updating user credits:', error);
        throw error;
    }
}
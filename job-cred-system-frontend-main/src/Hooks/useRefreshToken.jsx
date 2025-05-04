import { useAuth } from '../context/AuthContext';


const useRefreshToken = () => {
    
    const { setCurrentUser } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });

        
        setCurrentUser(prev => {
            if (!prev) return { accessToken: response?.data?.access_token };
            
            return {
                ...prev,
                accessToken: response?.data?.access_token
            };
        });
        
        
        return response?.data?.access_token;
    };
    return refresh;
};

export default useRefreshToken;
import api from "../api/api"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import { useAuth } from "../context/AuthContext"
import { axiosPrivate } from "../api/axios";

const useAxiosPrivate = () => {

    const {currentUser} = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                const token = localStorage.getItem("authToken");

                if (!config.headers['Authorization'] && token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );


        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;

                if (!prevRequest.retryCount) {
                    prevRequest.retryCount = 0;
                }

                if (error?.response?.status === 403 && !prevRequest?.sent && prevRequest.retryCount < 2) {
                    prevRequest.retryCount += 1;
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [currentUser, refresh]);


  return axiosPrivate;
}

export default useAxiosPrivate
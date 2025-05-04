import { Outlet, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import useRefreshToken from "../Hooks/useRefreshToken";


const PersistLogin = ({children}) => {

    const {currentUser, persist} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();


    useEffect(() => {

        const persistLogin = async () => {
            try {
                const result = await refresh();
                if(!result) {
                    localStorage.setItem("persist", JSON.stringify(false));
                }
            } catch (err) {
                console.error("User is not logged in or token refresh failed", err);
            } finally {
                setIsLoading(false);
            }
        }

        

        if(!currentUser?.accessToken && persist) {
            persistLogin() 
        } else {
            setIsLoading(false);
        }
         
        

    }, [currentUser, persist, refresh])



    if (isLoading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }


  return (
    <>{children}</>
  )
}

export default PersistLogin
import React, { createContext, useContext, useState, useEffect } from 'react';
import { updateCredits } from '../api/api.js';
import { getUserCreditsStorage, removeUserFromStorage, saveUserToStorage, setUserCreditsStorage } from '../utils/handleLocalStorage.js';
import { genStorageKey } from '../utils/handleLocalStorage.js';


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  


  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);



  useEffect(() => {
    if (persist && currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser, persist]);



  // save user to localStorage
  useEffect(() => {
    if (currentUser?.accessToken) {
      const key = genStorageKey(currentUser);
      saveUserToStorage(key, currentUser);
      localStorage.setItem('currentUserStorageKey', key);
    } else {
      const userStorageKey = localStorage.getItem('currentUserStorageKey');
      if (userStorageKey) {
        removeUserFromStorage(userStorageKey);
      }
      localStorage.removeItem('currentUserStorageKey');
    }
  }, [currentUser]);



  



  


  useEffect(() => {
    const fetchUserCredits = async () => {

      if (!currentUser) return;
      
      const { userStorageKey, storedCredits } = getUserCreditsStorage(currentUser)


      if(storedCredits !== null) {
        setUserCredits(storedCredits);
      } else if (currentUser.credits) {
        setUserCredits(currentUser.credits);
        setUserCreditsStorage(userStorageKey, currentUser.credits);
      }
    }

    fetchUserCredits();
    setLoading(false)

  }, [currentUser])



  const updateUserCredits = async (userId, newCreditAmount) => {
    try {

      // Call the API to update credits in the backend
      const response = await updateCredits(userId, newCreditAmount);

      
      if (response.data && response.data.credits === newCreditAmount) {
        
        setUserCredits(newCreditAmount);
      
        if (currentUser) {
          const userStorageKey = `userCredits-${currentUser.displayName}-${currentUser.uid}`;
          // Also update in localStorage for persistence
          setUserCreditsStorage(userStorageKey, newCreditAmount);
        }
        
        return true;

      } else {
        setError("Failed to update credits on the server");
        return false;
      }
    } catch (error) {
      console.error("Error updating credits:", error);
      setError(error.response?.data?.message || "Error updating credits");
      return false;
    }
  };




  const value = {
    currentUser,
    loading,
    error,
    userCredits,
    jobs,
    persist,
    setError,
    setLoading,
    setCurrentUser,
    updateUserCredits,
    setUserCredits,
    setJobs,
    setPersist
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
export const getUserCreditsStorage = (user) => {
    
    // firebase
    // const userStorageKey = `userCredits-${user.displayName}-${user.uid}`;


    const userStorageKey = `userCredits-${user.username}`;

    const storedCredits = localStorage.getItem(userStorageKey);
    
    const parsedCredits = parseInt(storedCredits, 10)

    return {
      userStorageKey,
      storedCredits: parsedCredits
    };
}


export const setUserCreditsStorage = (userStorageKey, credits) => {
    if (userStorageKey && typeof credits === 'number') {
        localStorage.setItem(userStorageKey, credits.toString());
    }
}

export const saveUserToStorage = (userStorageKey, user) => {
    localStorage.setItem(userStorageKey, JSON.stringify(user));
}

export const getUserFromStorage = (userStorageKey) => {
    const user = localStorage.getItem(userStorageKey);
    return user ? JSON.parse(user) : null;
}
export const removeUserFromStorage = (userStorageKey) => {
    localStorage.removeItem(userStorageKey);
}   

export const genStorageKey = (currentUser) => {
    // firebase
    // const userStorageKey = `user-${user.displayName}-${user.uid}`;
    const username = currentUser?.email && currentUser?.email?.split('@')[0];

    const userStorageKey = `user-${username}-${currentUser.id}`;
    
    return userStorageKey;
}
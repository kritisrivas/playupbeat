import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState();
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    const [userRole, setUserRole] = useState();
  
    const login = useCallback((uid, userRole, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      setUserRole(userRole);
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate)
      localStorage.setItem('userData', JSON.stringify({
        userId:uid, userRole: userRole, token: token, expiration: tokenExpirationDate.toISOString() }));
    }, []);
  
    const logout = useCallback(() => {
      setToken(null);
      setTokenExpirationDate(null);
      setUserId(null);
      setUserRole(null);
      localStorage.removeItem('userData')
    }, []);
  
    useEffect(()=> {
      if(token && tokenExpirationDate){
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      }
      else{
        clearTimeout(logoutTimer)
      }
    },[token, logout, tokenExpirationDate]);

    useEffect(()=> {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if(storedData !== null && storedData.token && new Date(storedData.expiration) > new Date()){
        login(storedData.userId, storedData.userRole, storedData.token, new Date(storedData.expiration))
      }
    }, [login]);
  
    return {token, userId, userRole, login, logout};
}
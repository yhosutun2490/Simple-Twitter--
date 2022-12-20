import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { login, register, checkPermission } from '../Api/AuthAPI'

// 設定一開始context 預設值
const defaultValue = {
  isAuthenticated: false, //是否通過後端驗證
  currentUser: null,  //現在使用者資料
  setCurrentUser: null, //更新使用者資料
  register: null, //註冊function
  login: null, //登入function
  logout: null, // 登出function
}

const AuthContext = createContext(defaultValue)
// useContext hook 讓子層可以調用
const useAuth = () => useContext(AuthContext)

function AuthProvider(props) {
  // 先放兩個狀態，一個是登入驗證是否還有效，一個拿來裝api回傳的使用者資料
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState("")

  const { pathname } = useLocation(); //current page

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        setUserData(null);
        return;
      }
      // if ( token && role=== user) {}
    
      const result = await checkPermission(token);
   

      if (result.status === '200') {
        setIsAuthenticated(true);
        //api回傳個人資料更新
        setUserData(result.user)

      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    };
    // admin related pages not applied  
    if (!pathname.includes("/admin")) { checkTokenIsValid() };
  }, [pathname]);

  return (
    <AuthContext.Provider value={
      {
        isAuthenticated,
        currentUser: userData,
        setCurrentUser: setUserData, //傳給編輯使用者資料相關頁面使用
        register: async (data) => {
          const { success, token, user } = await register({
            account: data.account,
            name: data.nameTrimmed,
            email: data.email,
            password: data.password,
            checkPassword: data.checkPassword
          });
          if (token) {
            setIsAuthenticated(true);
            setUserData(user)
            localStorage.setItem('authToken', token);
          }
          return success
        },
        login: async (data) => {
          const { success, token, user } = await login({
            account: data.accountTrimmed,
            password: data.passwordTrimmed,
          });
          if (token) {
            setIsAuthenticated(true);
            setUserData(user)
            localStorage.setItem('authToken', token);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setUserData(null);
          setIsAuthenticated(false);
        }
      }
    }>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }
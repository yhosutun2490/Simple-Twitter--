import { createContext } from "react";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { login } from '../Api/AuthAPI'

// 設定一開始context 預設值
const defaultValue = {
  isAuthenticated: false, //是否通過後端驗證
  currentMember: null,  //現在使用者是誰
  register: null, //註冊function
  login: null, //登入function
  logout: null, // 登出function
}

const AuthContext = createContext(defaultValue)
// useContext hook 讓子層可以調用
const useAuth = () => useContext(AuthContext)

function AuthProvider(props) {
  // 先放兩個狀態，一個是登入驗證是否還有效，一個拿來裝payload使用者資料
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const [payload, setPayload] = useState(false)
  return (
    <AuthContext.Provider value={
      {
        login: async (data) => {
          const { success, token } = await login({
            account: data.accountTrimmed,
            password: data.passwordTrimmed,
          });
          if (token) {
            localStorage.setItem('authToken', token);
          }
          return success;
        },
      }
    }>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }
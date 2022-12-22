import axios from "axios";

const baseUrl = "https://floating-forest-88499.herokuapp.com/api/users";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

export const setUserData = async (payload) => {
  const { id, account, name, email, password, checkPassword } = payload
  try {
    const { data } = await axiosInstance.put(`${baseUrl}/${id}`, {
      id, account, name, email, password, checkPassword
    });

    if (data) {
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error("[Set User Failed]:", error);
    const errCode = error.response.data.status
    let errMsg = ''

    switch(errCode) {
      case '422':
        errMsg = '密碼長度不符或是確認密碼不相符'
        break
      case '403':
        errMsg = '名稱字數超過上限'
        break
      case '401':
        errMsg = 'email格式不符'
        break
      case '408':
        errMsg = 'Email已重複註冊'
        break
      case '423':
        errMsg = '帳號已重複註冊'
        break
      // 錯誤code重複待後端修正
      // case '401':
      //   return '您尚未登入'
      case '500':
        errMsg = '伺服器發生錯誤'
        break
      default:
        errMsg = '發生未預期錯誤...'
    }
    return { success: false, errMsg: errMsg}
  }
};

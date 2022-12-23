import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSideBar from "../../Components/UserSideBar";
import AuthInput from "../../Components/AuthInput";
import Button from "../../Components/Button";
import styles from "./SettingPage.module.scss";
import { useAuth } from "../../Context/AuthContext";
import { setUserData } from "../../Api/UserSettingAPI";
import { ToastSuccess, ToastFail } from "../../assets/sweetalert"; //引入Toast樣式

function SettingPage() {
  //透過useAuth獲取現在登入使用者的資料，顯示default帳號、名稱、信箱
  const { currentUser, isAuthenticated } = useAuth();

  // State Variable
  const [account, setAccount] = useState(currentUser?.account);
  const [name, setName] = useState(currentUser?.name);
  const [email, setEmail] = useState(currentUser?.email);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errCode, setErrCode] = useState("");
  const navigate = useNavigate();

  // Alert message variant
  let accountAlertMsg = "";
  let nameAlertMsg = "";
  let emailAlertMsg = "";
  let passwordAlertMsg = "";
  let checkPasswordAlertMsg = "";

  // Word length related constant
  const accountLength = account?.length;
  const nameLength = name?.trim().length;
  const passwordLength = password?.length;
  const emailLength = email?.length;
  const accountLengthLimit = 50;
  const nameLengthLimit = 50;

  //Email rule check
  const emailRule =
    /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

  //Check if there is space in the input value
  const isSpaceCheck = /\s/;

  const handleClick = async () => {
    setSubmitting(true);

    if (accountLength === 0 || accountAlertMsg.length > 0) {
      return;
    }

    if (nameLength === 0 || nameAlertMsg.length > 0) {
      return;
    }

    if (emailLength === 0 || emailAlertMsg.length > 0) {
      return;
    }

    if (passwordAlertMsg.length > 0) {
      return;
    }

    if (checkPasswordAlertMsg.length > 0) {
      return;
    }
    // If all input value is valid
    const nameTrimmed = name.trim();
    const id = currentUser.id;
    //打包資料成formData
    let formData = new FormData();
    formData.append("account", account);
    formData.append("name", nameTrimmed);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("checkPassword", checkPassword);

    for (let [name, value] of formData.entries()) {
      console.log(name + ": " + value);
    }
    if (!formData) {
      return;
    }

    const { success, errCode } = await setUserData(id, formData);
    if (success) {
      ToastSuccess.fire({
        title: "更新成功！",
      });
      setPassword("");
      setCheckPassword("");
      return;
    }
    // token驗證失敗
    if (errCode === 401) {
      ToastFail.fire({
        title: "帳號不存在！",
      });
      navigate("/login");
      // errCode為412（請求使用者id不存在）500（其他錯誤）或是沒有catch到errCode的錯誤
    } else if (errCode === 411 || errCode === 500 || !errCode) {
      ToastFail.fire({
        title: "發生未預期錯誤...",
      });
    } else {
      // input欄顯示錯誤在click function外處理，所以需將errCode存起來
      setErrCode(errCode);
    }
  };

  // When user focus on the input clear the alert message
  const handleFocus = () => {
    setSubmitting(false);
    setErrCode("");
  };

  //if user is authenticated, navigate to home page
  useEffect(() => {
    if (!isAuthenticated) {
      ToastFail.fire({
        title: "帳號不存在！",
      });
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  // 以下為錯誤驗證------------------------------
  // Input blank check
  if (submitting && accountLength === 0) {
    accountAlertMsg = "此欄為必填欄位";
  }

  if (submitting && nameLength === 0) {
    nameAlertMsg = "此欄為必填欄位";
  }

  if (submitting && emailLength === 0) {
    emailAlertMsg = "此欄為必填欄位";
  }

  //space including check
  if (isSpaceCheck.test(account)) {
    accountAlertMsg = "不可有空白";
  }

  if (isSpaceCheck.test(password)) {
    passwordAlertMsg = "不可有空白";
  }

  // Word length limit alert
  if (accountLength > accountLengthLimit || errCode === 403) {
    accountAlertMsg = "帳號字數超出上限";
  }

  if (nameLength > nameLengthLimit || errCode === 413) {
    nameAlertMsg = "名稱字數超出上限";
  }

  // 使用者有輸入密碼且不是空值的時候判斷字數
  if (
    (passwordLength > 0 &&
      passwordLength < 4 &&
      !isSpaceCheck.test(password)) ||
    (passwordLength > 0 && passwordLength > 12 && !isSpaceCheck.test(password))
    // 待後端修正
    // errCode ===
  ) {
    passwordAlertMsg = "密碼長度不符";
  }

  //wrong email format alert
  if ((emailLength > 0 && !emailRule.test(email)) || errCode === 411) {
    emailAlertMsg = "Email格式錯誤";
  }

  //passwordCheck unmatched alert
  if (checkPassword >= 0 && checkPassword !== password) {
    // 待後端修正
    // errCode ===
    checkPasswordAlertMsg = "密碼不相符";
  }

  //後端驗證帳號重複
  if (errCode === 423) {
    accountAlertMsg = "帳號已重複註冊";
  }

  //後端驗證email重複
  if (errCode === 408) {
    emailAlertMsg = "Email已重複註冊";
  }
  // 以上為錯誤驗證------------------------------

  return (
    <div className={styles["container"]}>
      <div className={styles["column-1"]}>
        <UserSideBar />
      </div>
      <div className={styles["column-2"]}>
        <div className={styles["column-2-container"]}>
          <h4 className={styles["title"]}>帳號設定</h4>
          {/* Auth Form */}
          <div className={styles["auth-form"]}>
            <div className={styles["authinput-group"]} onFocus={handleFocus}>
              <AuthInput
                label="帳號"
                type="text"
                value={account}
                placeholder="請輸入帳號"
                onChange={setAccount}
                isAlert={accountAlertMsg.length > 0 ? true : false}
                alertMsg={accountAlertMsg}
                isWordCount={true}
                wordLength={accountLength}
                wordLengthLimit={accountLengthLimit}
              />

              <AuthInput
                label="名稱"
                type="text"
                value={name}
                placeholder="請輸入使用者名稱"
                onChange={setName}
                isAlert={nameAlertMsg.length > 0 ? true : false}
                alertMsg={nameAlertMsg}
                isWordCount={true}
                wordLength={nameLength}
                wordLengthLimit={nameLengthLimit}
              />

              <AuthInput
                label="Email"
                type="text"
                value={email}
                placeholder="請輸入Email"
                onChange={setEmail}
                isAlert={emailAlertMsg.length > 0 ? true : false}
                alertMsg={emailAlertMsg}
                isWordCount={false}
              />

              <AuthInput
                label="密碼（需介於4到～12字元）"
                type="password"
                value={password}
                placeholder="請設定密碼"
                onChange={setPassword}
                isAlert={passwordAlertMsg.length > 0 ? true : false}
                alertMsg={passwordAlertMsg}
                isWordCount={false}
              />

              <AuthInput
                label="密碼再確認"
                type="password"
                value={checkPassword}
                placeholder="請再次輸入密碼"
                onChange={setCheckPassword}
                isAlert={checkPasswordAlertMsg.length > 0 ? true : false}
                alertMsg={checkPasswordAlertMsg}
                isWordCount={false}
              />
            </div>
            {/* Save Button */}
            <div className={styles["save-button"]} onClick={handleClick}>
              <Button styleName="bg-logo">儲存</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["column-3"]}></div>
    </div>
  );
}

export default SettingPage;

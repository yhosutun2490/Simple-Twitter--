import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as AcLogo } from "../../assets/icons/AcLogo.svg";
import AuthInput from "../../Components/AuthInput";
import { useAuth } from "../../Context/AuthContext";
import Button from "../../Components/Button";
import styles from "./RegisterPage.module.scss";
import { ToastSuccess, ToastFail } from "../../assets/sweetalert"; //引入Toast樣式

function RegisterPage() {
  // State Variable
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errCode, setErrCode] = useState("");
  const navigate = useNavigate();

  const { register, isAuthenticated } = useAuth();

  // Alert message variant
  let accountAlertMsg = "";
  let nameAlertMsg = "";
  let emailAlertMsg = "";
  let passwordAlertMsg = "";
  let checkPasswordAlertMsg = "";

  // Word length related constant
  const accountLength = account.length;
  const nameLength = name.trim().length;
  const passwordLength = password.length;
  const emailLength = email.length;
  const checkPasswordLength = checkPassword.length;
  const accountLengthLimit = 50;
  const nameLengthLimit = 50;

  //Email rule check
  const emailRule =
    /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

  //Check if there is space in the input value
  const isSpaceCheck = /\s/;

  // 注意現在state裡面存的value頭尾沒有消空白傳入header需要trim()，消除頭尾的空白
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

    if (passwordLength === 0 || passwordAlertMsg.length > 0) {
      return;
    }

    if (checkPasswordLength === 0 || checkPasswordAlertMsg.length > 0) {
      return;
    }
    // If all input value is valid
    // refactor the value of account and password
    const nameTrimmed = name.trim();
    const { success, errCode } = await register({
      account,
      nameTrimmed,
      email,
      password,
      checkPassword,
    });

    // 註冊成功
    if (success) {
      ToastSuccess.fire({
        title: "註冊成功",
      });
      navigate("/home");
      return;
    }
    //註冊失敗
    //如果是非input欄顯示的錯誤，跳出訊息
    if (errCode === 402) {
      ToastFail.fire({
        title: "有空白欄位！",
      });
    // errCode為500（其他錯誤）或是沒有catch到errCode的錯誤
    } else if (errCode === 500 || !errCode) {
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
    if (isAuthenticated) {
      navigate("/home");
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

  if (submitting && passwordLength === 0) {
    passwordAlertMsg = "此欄為必填欄位";
  }

  if (submitting && checkPasswordLength === 0) {
    checkPasswordAlertMsg = "此欄為必填欄位";
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
    (passwordLength > 0 &&
      passwordLength > 12 &&
      !isSpaceCheck.test(password)) ||
    errCode === 412
  ) {
    passwordAlertMsg = "密碼長度不符";
  }

  //wrong email format alert
  if ((emailLength > 0 && !emailRule.test(email)) || errCode === 401) {
    emailAlertMsg = "Email格式錯誤";
  }

  //passwordCheck unmatched alert
  if ((checkPassword > 0 && checkPassword !== password) || errCode === 422) {
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
      <div>
        <AcLogo />
      </div>
      <h3 className={styles["title"]}>建立你的帳號</h3>
      {/* AuthInput group */}
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
          label="密碼確認"
          type="password"
          value={checkPassword}
          placeholder="請再次輸入密碼"
          onChange={setCheckPassword}
          isAlert={checkPasswordAlertMsg.length > 0 ? true : false}
          alertMsg={checkPasswordAlertMsg}
          isWordCount={false}
        />
      </div>
      {/* Register Button */}
      <div className={styles["auth-button"]} onClick={handleClick}>
        <Button styleName="lg-bg-logo">註冊</Button>
      </div>
      {/* Auth Link */}
      <Link to="/login" className={styles["auth-link"]}>
        <div className={styles["auth-link-text"]}>取消</div>
      </Link>
    </div>
  );
}

export default RegisterPage;

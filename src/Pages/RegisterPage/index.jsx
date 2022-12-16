import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AcLogo } from "../../assets/icons/AcLogo.svg";
import AuthInput from "../../Components/AuthInput";
import Button from "../../Components/Button";
import styles from "./RegisterPage.module.scss";

function RegisterPage() {
  // State Variable
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
  const isSpaceCheck = /\s/

  // 注意現在state裡面存的value頭尾沒有消空白傳入header需要trim()，消除頭尾的空白
  const handleClick = () => {
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
    alert("success");
  };

  // When user focus on the input clear the alert message
  const handleFocus = () => {
    setSubmitting(false);
  };

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
  if(isSpaceCheck.test(account)) {
    accountAlertMsg="不可有空白"
  }

  if (isSpaceCheck.test(password)) {
    passwordAlertMsg = "不可有空白";
  }

  // Word length limit alert
  if (accountLength > accountLengthLimit) {
    accountAlertMsg = "帳號字數超出上限";
  }

  if (nameLength > nameLengthLimit) {
    nameAlertMsg = "密碼字數超出上限";
  }

  if (passwordLength > 0 && passwordLength < 4) {
    passwordAlertMsg = "密碼不可小於4字元";
  }

  if (passwordLength > 12) {
    passwordAlertMsg = "密碼不可多於12字元";
  }

  //wrong email format alert
  if (emailLength > 0 && !emailRule.test(email)) {
    emailAlertMsg = "Email格式錯誤";
  }

  //passwordCheck unmatched alert
  if (checkPassword > 0 && checkPassword !== password) {
    checkPasswordAlertMsg = "密碼不相符";
  }

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

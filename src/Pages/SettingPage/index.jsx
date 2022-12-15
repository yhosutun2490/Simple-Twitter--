import { useState } from "react";
import UserSideBar from "../../Components/UserSideBar";
import AuthInput from "../../Components/AuthInput";
import Button from "../../Components/Button";
import styles from "./SettingPage.module.scss";

function SettingPage() {
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
  const accountLength = account.trim().length;
  const nameLength = name.trim().length;
  const passwordLength = password.trim().length;
  const emailLength = email.trim().length;
  const checkPasswordLength = checkPassword.trim().length;
  const accountLengthLimit = 50;
  const nameLengthLimit = 50;

  //Email rule check 待確認是否有漏洞的可能
  const emailRule =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

  const handleClick = () => {
    setSubmitting(true);

    if (accountLength === 0 || accountLength > accountLengthLimit) {
      return;
    }

    if (nameLength === 0 || nameLength > nameLengthLimit) {
      return;
    }

    if (emailLength === 0 || !emailRule.test(email)) {
      return;
    }

    if (passwordLength === 0 || passwordLength < 4 || passwordLength > 12) {
      return;
    }

    if (checkPasswordLength === 0 || checkPassword !== password) {
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
  if (submitting && emailLength > 0 && !emailRule.test(email)) {
    emailAlertMsg = "Email格式錯誤";
  }

  //passwordCheck unmatched alert
  if (submitting && checkPassword > 0 && checkPassword !== password) {
    checkPasswordAlertMsg = "密碼不相符";
  }

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

import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AcLogo } from "../../assets/icons/AcLogo.svg";
import Button from "../../Components/Button";
import styles from "./RegisterPage.module.scss";

function AuthInputAlert(prop) {
  const { alertMsg } = prop;
  return <div className={styles["authinput-alertmsg"]}>{alertMsg}</div>;
}

function AuthInputWordCount(props) {
  const { wordLength, wordLengthLimit } = props;
  return (
    <div>
      {wordLength}/{wordLengthLimit}
    </div>
  );
}

function AuthInput(props) {
  const { label, type, value, placeholder, onChange, isAlert } = props;
  return (
    <div className={[
              `${styles["authinput-box"]}`,
              isAlert ? `${styles["error"]}` : ``,
            ].join(" ")}>
      <label className={styles["authinput-label"]}>{label}</label>
      <input
        className={styles["authinput"]}
        type={type || "text"}
        value={value || ""}
        placeholder={placeholder || ""}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}

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
  if (submitting && email.length > 0 && !emailRule.test(email)) {
    emailAlertMsg = "Email格式錯誤";
  }

  //passwordCheck unmatched alert
  if (submitting && checkPassword > 0 && checkPassword !== password) {
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
        <div className={styles["authinput-container"]}>
          <AuthInput
            label="帳號"
            type="text"
            value={account}
            placeholder="請輸入帳號"
            onChange={setAccount}
            isAlert={accountAlertMsg.length > 0 ? true : false}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert
              alertMsg={
                submitting && accountLength === 0
                  ? "此欄為必填欄位"
                  : accountAlertMsg
              }
            />
            <AuthInputWordCount
              wordLength={accountLength}
              wordLengthLimit={accountLengthLimit}
            />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput
            label="名稱"
            type="text"
            value={name}
            placeholder="請輸入使用者名稱"
            onChange={setName}
            isAlert={nameAlertMsg.length > 0 ? true : false}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert
              alertMsg={
                submitting && nameLength === 0 ? "此欄為必填欄位" : nameAlertMsg
              }
            />
            <AuthInputWordCount
              wordLength={nameLength}
              wordLengthLimit={nameLengthLimit}
            />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput
            label="Email"
            type="text"
            value={email}
            placeholder="請輸入Email"
            onChange={setEmail}
            isAlert={emailAlertMsg.length > 0 ? true : false}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert
              alertMsg={
                submitting && emailLength === 0
                  ? "此欄為必填欄位"
                  : emailAlertMsg
              }
            />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput
            label="密碼（需介於4到～12字元）"
            type="password"
            value={password}
            placeholder="請設定密碼"
            onChange={setPassword}
            isAlert={passwordAlertMsg.length > 0 ? true : false}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert
              alertMsg={
                submitting && passwordLength === 0
                  ? "此欄為必填欄位"
                  : passwordAlertMsg
              }
            />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput
            label="密碼確認"
            type="password"
            value={checkPassword}
            placeholder="請再次輸入密碼"
            onChange={setCheckPassword}
            isAlert={checkPasswordAlertMsg.length > 0 ? true : false}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert
              alertMsg={
                submitting && checkPasswordLength === 0
                  ? "此欄為必填欄位"
                  : checkPasswordAlertMsg
              }
            />
          </div>
        </div>
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

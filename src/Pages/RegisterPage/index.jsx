import { useState } from "react";
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
  const { label, type, value, placeholder, onChange } = props;
  return (
    <div className={styles["authinput-box"]}>
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
  const [passwordCheck, setPasswordCheck] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Alert message variant
  let accountAlertMsg = "";
  let nameAlertMsg = "";
  let emailAlertMsg = "";
  let passwordAlertMsg = "";
  let passwordCheckAlertMsg = "";

  // Word length related constant
  const accountLength = account.trim().length;
  const nameLength = name.trim().length;
  const passwordLength = password.trim().length;
  const emailLength = email.trim().length;
  const passwordCheckLength = passwordCheck.trim().length;
  const accountLengthLimit = 50;
  const nameLengthLimit = 50;

  const handleClick = () => {
    setSubmitting(true);
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
            value={passwordCheck}
            placeholder="請再次輸入密碼"
            onChange={setPasswordCheck}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert
              alertMsg={
                submitting && passwordCheckLength === 0
                  ? "此欄為必填欄位"
                  : passwordCheckAlertMsg
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
      <div className={styles["auth-link"]}>取消</div>
    </div>
  );
}

export default RegisterPage;

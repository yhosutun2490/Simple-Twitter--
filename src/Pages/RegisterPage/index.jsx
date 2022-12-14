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

  return (
    <div className={styles["container"]}>
      <div>
        <AcLogo />
      </div>
      <h3 className={styles["title"]}>建立你的帳號</h3>
      {/* AuthInput group */}
      <div className={styles["authinput-group"]}>
        <div className={styles["authinput-container"]}>
          <AuthInput
            label="帳號"
            type="text"
            value={account}
            placeholder="請輸入帳號"
            onChange={(accountInputValue) => setAccount(accountInputValue)}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert alertMsg="字數超出上限！" />
            <AuthInputWordCount wordLength={10} wordLengthLimit={50} />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput
            label="名稱"
            type="text"
            value={name}
            placeholder="請輸入使用者名稱"
            onChange={(nameInputValue) => setName(nameInputValue)}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert alertMsg="字數超出上限！" />
            <AuthInputWordCount wordLength={10} wordLengthLimit={50} />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput
            label="Email"
            type="text"
            value={email}
            placeholder="請輸入Email"
            onChange={(emailInputValue) => setEmail(emailInputValue)}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert alertMsg="Email格式錯誤" />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput
            label="密碼"
            type="text"
            value={password}
            placeholder="請設定密碼"
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert alertMsg="密碼長度不夠！" />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput
            label="密碼確認"
            type="text"
            value={passwordCheck}
            placeholder="請再次輸入密碼"
            onChange={(passwordCheckInputValue) =>
              setPasswordCheck(passwordCheckInputValue)
            }
          />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert alertMsg="密碼不正確" />
          </div>
        </div>
      </div>
      {/* Register Button */}
      <div className={styles["auth-button"]}>
        <Button styleName="lg-bg-logo">註冊</Button>
      </div>
      {/* Auth Link */}
      <div className={styles["auth-link"]}>取消</div>
    </div>
  );
}

export default RegisterPage;

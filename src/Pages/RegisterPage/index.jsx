import { ReactComponent as AcLogo } from "../../assets/icons/AcLogo.svg";
import Button from "../../Components/Button";
import styles from "./RegisterPage.module.scss"

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
  const { label, type, placeholder } = props;
  return (
    <div className={styles["authinput-box"]}>
      <label className={styles["authinput-label"]}>{label}</label>
      <input
        className={styles["authinput"]}
        type={type || "text"}
        placeholder={placeholder || ""}
      />
    </div>
  );
}

function RegisterPage() {
  return (
    <div className={styles["container"]}>
      <div>
        <AcLogo />
      </div>
      <h3 className={styles["title"]}>建立你的帳號</h3>
      {/* AuthInput group */}
      <div className={styles["authinput-group"]}>
        <div className={styles["authinput-container"]}>
          <AuthInput label="帳號" type="text" placeholder="請輸入帳號" />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert alertMsg="字數超出上限！" />
            <AuthInputWordCount wordLength={10} wordLengthLimit={50} />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput label="名稱" type="text" placeholder="請輸入使用者名稱" />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert alertMsg="字數超出上限！" />
            <AuthInputWordCount wordLength={10} wordLengthLimit={50} />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput label="Email" type="text" placeholder="請輸入Email" />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert alertMsg="Email格式錯誤" />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput label="密碼" type="text" placeholder="請設定密碼" />
          <div className={styles["authinput-msg-box"]}>
            <AuthInputAlert alertMsg="密碼長度不夠！" />
          </div>
        </div>

        <div className={styles["authinput-container"]}>
          <AuthInput
            label="密碼確認"
            type="text"
            placeholder="請再次輸入密碼"
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

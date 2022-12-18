import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as AcLogo } from "../../assets/icons/AcLogo.svg";
import { AuthInput, AuthInputAlert } from "../../Components/AuthInput/index";
import { useAuth } from "../../Context/AuthContext";

import Button from "../../Components/Button";
import styles from "./LoginPage.module.scss";
import Swal from "sweetalert2";

function LoginPage() {
  // State Variable
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  // Alert message variant
  let accountAlertMsg = "";
  let passwordAlertMsg = "";

  // Word length related constant
  const accountLength = account.trim().length;
  const passwordLength = password.trim().length;

  const handleClick = async () => {
    setSubmitting(true);

    if (accountLength === 0 || passwordLength === 0) {
      return;
    }
    // If all input value is valid
    // refactor the value of account and password
    const accountTrimmed = account.trim();
    const passwordTrimmed = password.trim();
    const success = await login({ accountTrimmed, passwordTrimmed });

    // 待後端把錯誤訊息補上補上實作錯誤訊息
    if (success) {
      Swal.fire({
        title: "Success!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
      navigate("/home");
      return;
    } else {
      Swal.fire({
        title: "Failed...",
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
    }
  };

  // When user focus on the input clear the alert message
  const handleFocus = () => {
    setSubmitting(false);
  };

  // Input blank check
  if (submitting && accountLength === 0) {
    accountAlertMsg = "此欄為必填欄位";
  }

  if (submitting && passwordLength === 0) {
    passwordAlertMsg = "此欄為必填欄位";
  }

  return (
    <div className={styles["container"]}>
      <div>
        <AcLogo />
      </div>
      <h3 className={styles["title"]}>登入Alphitter</h3>
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
          isWordCount={false}
        />

        <AuthInput
          label="密碼"
          type="password"
          value={password}
          placeholder="請輸入密碼"
          onChange={setPassword}
          isAlert={passwordAlertMsg.length > 0 ? true : false}
          alertMsg={passwordAlertMsg}
          isWordCount={false}
        />
      </div>
      <div className={styles["auth-button"]} onClick={handleClick}>
        <Button styleName="lg-bg-logo">登入</Button>
      </div>
      {/* Auth Link */}
      <div className={styles["auth-link-box"]}>
        <Link to="/register" className={styles["auth-link"]}>
          <div className={styles["auth-link-text"]}>註冊</div>
        </Link>
        <div className={styles["auth-link-dot"]}>·</div>
        <Link to="/admin" className={styles["auth-link"]}>
          <div className={styles["auth-link-text"]}>後台登入</div>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;

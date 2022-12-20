import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as AcLogo } from "../../assets/icons/AcLogo.svg";
import AuthInput from "../../Components/AuthInput/index";
import Button from "../../Components/Button";
import { adminLogin } from "../../Api/AdminAPI";
import styles from "./AdminLoginPage.module.scss";
import Swal from "sweetalert2";

function AdminLoginPage() {
  // State Variable
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

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
    const { success, token } = await adminLogin({
      account,
      password,
    });

    // 待後端把錯誤訊息補上補上實作錯誤訊息
    if (success) {
      localStorage.setItem("authToken", token);
      Swal.fire({
        title: "Success!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });
      navigate("/admin/tweetlist");
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
      <h3 className={styles["title"]}>後台登入</h3>
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
      {/* Login Button */}
      <div className={styles["auth-button"]} onClick={handleClick}>
        <Button styleName="lg-bg-logo">登入</Button>
      </div>
      {/* Auth Link */}
      <div className={styles["auth-link-box"]}>
        <Link to="/login" className={styles["auth-link"]}>
          <div className={styles["auth-link-text"]}>前台登入</div>
        </Link>
      </div>
    </div>
  );
}

export default AdminLoginPage;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as AcLogo } from "../../assets/icons/AcLogo.svg";
import AuthInput from "../../Components/AuthInput/index";
import Button from "../../Components/Button";
// import { adminLogin } from "../../Api/AdminAPI";
import { useAuth } from "../../Context/AuthContext";
import styles from "./AdminLoginPage.module.scss";
import { ToastSuccess, ToastFail } from "../../assets/sweetalert"; //引入Toast樣式

function AdminLoginPage() {
  // State Variable
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errCode, setErrCode] = useState("");
  const navigate = useNavigate();

  const { adminLogin, isAuthenticated } = useAuth();

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
    const { success, errCode } = await adminLogin({
      account,
      password,
    });

    if (success) {
      ToastSuccess.fire({
        title: "登入成功！",
      });
      navigate("/admin/tweetlist");
      return;
    }
    //登入失敗
    //如果是非input欄顯示的錯誤，跳出訊息
    if (errCode === 400) {
      ToastFail.fire({
        title: "有空白欄位！",
      });
    } else if (!errCode) {
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

  //if user is authenticated, navigate to tweetlist page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/tweetlist");
    }
  }, [navigate, isAuthenticated]);

  // 以下為錯誤驗證------------------------------
  // Input blank check
  if (submitting && accountLength === 0) {
    accountAlertMsg = "此欄為必填欄位";
  }

  if (submitting && passwordLength === 0) {
    passwordAlertMsg = "此欄為必填欄位";
  }

  //後端驗證錯誤（input欄位顯示）
  //when the account does not exist
  if (errCode === 423) {
    accountAlertMsg = "帳號不存在";
  }

  //when invalid password
  if (errCode === 402) {
    passwordAlertMsg = "密碼錯誤";
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

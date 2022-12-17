import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./NotFoundPage.module.scss";
function NotFoundPage() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 6000);
  }, [navigate]);
  return (
    <div className={styles["container"]}>
      <h1>Not Found in your search (404)</h1>
      <div className={styles["error-info"]}>
        <div className={styles["error-robot"]}>
          <img
            src="https://cdn3.iconfinder.com/data/icons/web-development-41/512/17-1024.png"
            alt="robot"
            className={styles["robot-img"]}
          />
        </div>
        <ol className={styles["error-list"]}>
          <li className={styles["error-title"]}>路由輸入錯誤</li>
          <li className={styles["error-title"]}>使用者帳戶id不存在</li>
        </ol>
      </div>
    </div>
  );
}

export default NotFoundPage;

import styles from "./HomePage.module.scss";
function HomePage() {
  return (
    <div className={styles["container"]}>
      <div className={styles["page-title"]}>首頁</div>
      <div className={styles["tweet-input"]}></div>
      <div className={styles["tweet-list"]}></div>
    </div>
  );
}

export default HomePage;

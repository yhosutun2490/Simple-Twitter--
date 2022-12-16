import styles from "./FollowButton.module.scss";
function FollowButton(props) {
  // 設定本人id，傳入的使用者id，跟隨狀態，如果是使用者本人不顯示跟隨按鈕
  const { currentUserID, id, isFollow } = props;
  return Number(currentUserID) === Number(id) ? (
    <div>是本人~!</div>
  ) : isFollow ? (
    <button className={styles["follow-btn"]}>跟隨</button>
  ) : (
    <button className={styles["following-btn"]}>正在跟隨</button>
  );
}
export default FollowButton;

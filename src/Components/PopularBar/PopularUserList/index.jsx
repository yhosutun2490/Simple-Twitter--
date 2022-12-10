import styles from "./PopularUserList.module.scss";
import PopularUserCard from "./PopularUserCard";
function PopularUserList() {
  // 之後設定PopularUserCard以map渲染
  return (
    <div className={styles["container"]}>
      <h4 className={styles["popular__title"]}>推薦跟隨</h4>
      <div className={styles["popular__user-list"]}>
        <PopularUserCard isFollowed={false} id={5} />
        <PopularUserCard isFollowed={true} id={7} />
        <PopularUserCard isFollowed={false} id={4} />
        <PopularUserCard isFollowed={false} id={1} />
        <PopularUserCard isFollowed={true} id={2} />
        <PopularUserCard isFollowed={true} id={6} />
      </div>
    </div>
  );
}
export default PopularUserList;

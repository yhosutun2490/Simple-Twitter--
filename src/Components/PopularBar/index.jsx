import styles from "./PopularBar.module.scss";
import PopularUserList from "./PopularUserList";
function PopularBar() {
  return (
    <div className={styles["container"]}>
      <PopularUserList />
    </div>
  );
}

export default PopularBar;

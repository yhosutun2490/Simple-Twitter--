import styles from "./ProfilePage.module.scss";
import ProfileUserNavBar from "../../Components/ProfileUserNavBar";

function ProfilePage(props) {
  return (
    <div className={styles["container"]}>
      <ProfileUserNavBar />
    </div>
  );
}
export default ProfilePage;

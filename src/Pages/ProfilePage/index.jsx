import styles from "./ProfilePage.module.scss";
import ProfilePageTitle from "../../Components/ProfilePageTitle";
import fakeBackgroundImg from "../../assets/icons/background.svg";

function ProfilePage(props) {
  return (
    <div className={styles["container"]}>
      <ProfilePageTitle name={"Natsu"} tweetCount={25} />
      <div className={styles["background-avatar"]}>
        <img
          src={fakeBackgroundImg}
          alt="background"
          className={styles["avatar-img"]}
        />
      </div>
    </div>
  );
}
export default ProfilePage;

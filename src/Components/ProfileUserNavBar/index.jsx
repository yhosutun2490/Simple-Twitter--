import styles from "./ProfileUserNavBar.module.scss";
import ProfileInfo from "../ProfileInfo";
import ProfilePageTitle from "../ProfilePageTitle";
import ProfileNavLink from "../ProfileNavLink";
import fakeBackgroundImg from "../../assets/icons/background.svg";
function ProfileUserNavBar() {
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
      <div className={styles["user-profile-info"]}>
        <ProfileInfo
          name={"Natsu"}
          account={"NatsuTW"}
          content={
            "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour"
          }
          Avatar={"https://picsum.photos/50/50"}
          followingCount={25}
          followerCount={30}
          userID={1}
          currentUserID={1}
        />
      </div>
      <div className={styles["profile-nav-link"]}>
        <ProfileNavLink />
      </div>
    </div>
  );
}
export default ProfileUserNavBar;

import styles from "./ProfileUserNavBar.module.scss";
import ProfileInfo from "../ProfileInfo";
import ProfilePageTitle from "../ProfilePageTitle";
import ProfileNavLink from "../ProfileNavLink";
import fakeBackgroundImg from "../../assets/icons/background.svg";
function ProfileUserNavBar(props) {
  const { currentUserID, viewID, scrollTop, userProfile } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["profile-title"]}>
        <ProfilePageTitle
          name={userProfile?.name}
          tweetCount={userProfile?.tweetsCount}
          scrollTop={scrollTop}
        />
      </div>
      <div className={styles["background-avatar"]}>
        <img
          src={userProfile?.cover ? userProfile.cover : fakeBackgroundImg}
          alt="background"
          className={styles["avatar-img"]}
        />
      </div>
      <div className={styles["user-profile-info"]}>
        <ProfileInfo
          name={userProfile?.name}
          account={userProfile?.account}
          content={userProfile?.introduction}
          Avatar={userProfile?.avatar}
          followingCount={userProfile?.followingCount}
          followerCount={userProfile?.followerCount}
          viewID={viewID}
          currentUserID={currentUserID}
        />
      </div>
      <div className={styles["profile-nav-link"]}>
        <ProfileNavLink viewID={viewID} />
      </div>
    </div>
  );
}
export default ProfileUserNavBar;

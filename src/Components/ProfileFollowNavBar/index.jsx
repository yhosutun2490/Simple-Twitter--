import styles from "./ProfileFollowNavBar.module.scss";
import ProfilePageTitle from "../ProfilePageTitle";
import FollowNavLink from "./FollowNavLink";

function ProfileFollowNavBar(props) {
  const { viewID, scrollTop, userData } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["follow-page-title"]}>
        <ProfilePageTitle
          name={userData?.name}
          tweetCount={userData?.tweetsCount}
          scrollTop={scrollTop}
        />
      </div>
      <div className={styles["follow-nav-link"]}>
        <FollowNavLink viewID={viewID} />
      </div>
    </div>
  );
}

export default ProfileFollowNavBar;

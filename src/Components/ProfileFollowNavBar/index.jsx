import styles from "./ProfileFollowNavBar.module.scss";
import ProfilePageTitle from "../ProfilePageTitle";
import FollowNavLink from "./FollowNavLink";

function ProfileFollowNavBar(props) {
  const { viewID, scrollTop, tweetCount, name } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["follow-page-title"]}>
        <ProfilePageTitle
          name={name}
          tweetCount={tweetCount}
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

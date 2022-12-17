import styles from "./ProfileFollowNavBar.module.scss";
import ProfilePageTitle from "../ProfilePageTitle";
import FollowNavLink from "./FollowNavLink";

function ProfileFollowNavBar(props) {
  const { viewID, scrollTop } = props;
  return (
    <div className={styles["container"]}>
      <div className={styles["follow-page-title"]}>
        <ProfilePageTitle
          name={"Natsu"}
          tweetCount={25}
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
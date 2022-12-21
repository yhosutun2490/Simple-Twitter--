import styles from "./ProfileFollowList.module.scss";
import FollowUserCard from "./FollowUserCard";

function ProfileFollowList(props) {
  const { followedData, followingData } = props;
  return (
    <div className={styles["container"]}>
      {followedData && followedData.length === 0 && (
        <div className={styles["no-followed"]}>目前沒有使用者追隨</div>
      )}
      {followingData && followingData.length === 0 && (
        <div className={styles["no-following"]}>目前沒有追隨的使用者</div>
      )}
      {followedData &&
        followedData?.map((data) => (
          <FollowUserCard
            key={data?.id}
            userName={data?.name}
            avatar={data?.avatar}
            description={data?.introduction}
            isFollow={data?.Following}
            userID={data.id}
          />
        ))}
      {followingData &&
        followingData?.map((data) => (
          <FollowUserCard
            key={data?.id}
            userName={data?.name}
            avatar={data?.avatar}
            description={data?.introduction}
            isFollow={data?.Following}
            userID={data.id}
          />
        ))}
    </div>
  );
}

export default ProfileFollowList;

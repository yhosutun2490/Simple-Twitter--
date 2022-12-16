import styles from "./ProfileFollowList.module.scss";
import FollowUserCard from "./FollowUserCard";

function ProfileFollowList(props) {
  const { followedData, followingData } = props;
  return (
    <div className={styles["container"]}>
      {followedData &&
        followedData?.map((data) => (
          <FollowUserCard
            key={data?.id}
            userName={data?.name}
            avatar={data?.avatar}
            description={data?.introduction}
            isFollow={data?.following}
            userID={data.id}
          />
        ))}
      {followingData &&
        followingData?.map((data) => (
          <FollowUserCard
            key={data.id}
            userName={data.name}
            avatar={data.avatar}
            description={data.introduction}
            userID={data.id}
            isFollow={true}
          />
        ))}
    </div>
  );
}

export default ProfileFollowList;
